import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import ButtonGroup from './button-group.js';
import AddNoteModal from './add-note-modal.js';
import DeleteModal from './delete-modal.js';

const DATE_FORMAT = "MMMM Do YYYY, h:mm:ss a";
const SHORT_DATE_FORMAT = "MMMM D YYYY";
const TRANSFER_DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss";

const source = {
   campus: { api: '/api/campus' },
   project: { api: '/api/project/bycampus/' },
   note: { api: '/api/note/' },
   checkpoint: { 
      api_completed: '/api/project/markcheckpoint',
      api_duedate: '/api/checkpoint/duedate'
   },
};


class Dashboard extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         campuses: [],
         projects: [],
         loading: true,
         message: null
      };
   }

   componentDidMount() { this.loadItems(); }

   loadItems = () => {
      axios.get(source.campus.api)
         .then(res => {
            this.setState({ campuses: res.data });
         });
   }

   addNote = (p, e) => { this.project = p; $('.ui.modal.add').modal('show'); }
   onSaveNote = (note) => {
      note.timestamp = moment().format(TRANSFER_DATE_FORMAT);
      note.projectId = this.project.id;
      axios.post(source.note.api, note)
         .then(res => this.reloadNotes(res.data));
   }
   reloadNotes(data) {
      this.project.totalTime = data.totalTime;
      this.project.notes = data.notes;
      this.setState({ projects: this.state.projects });
   }
   deleteNote = (n, p, e) => { 
      this.project = p;
      this.note = n; 
      $('.ui.modal.delete').modal('show'); 

   }
   onConfirmDelete = () => {
      axios.delete(source.note.api + this.note.id)
         .then(res => this.reloadNotes(res.data));
   }
   onClickCheckpoint = (cp, e) => {
      let checkpoint = Object.assign(cp, {});
      checkpoint.completed = !checkpoint.completed;
      checkpoint.checkpoint = null;
      axios.put(source.checkpoint.api_completed, checkpoint)
         .then(res => {
            //TODO: update UI, total time, last notes
            // this.setState({ campuses: res.data });
            console.log('replied updated');
         });
   }

   changeCampus = (e) => {
      this.setState({loading: true});
      axios.get(source.project.api + e.id)
         .then(res => {
            const projects = res.data;
            projects.forEach(p => this.calc_progress(p));
            this.setState({ projects, loading: false });
         });
   }

   calc_progress(project) {
      const total = project.checkpoints.length;
      if(total>0) {
         const completedCP = project.checkpoints.filter(c => c.completed).length;
         project.percentage = Math.ceil(completedCP * 100 / total);
      } else {
         project.percentage = 100;
      }
   }

   render() {
      return (<React.Fragment>
         <div className="ui middle center aligned grid">
            <ButtonGroup id="dashboardButtons" 
               items={this.state.campuses} 
               onChange={this.changeCampus}/>
         </div>
         <div className="ui middle center aligned grid">
            <div className={this.state.loading?"ui active centered inline loader":""}></div>
            {this.state.projects.length == 0 && !this.state.loading &&
               <div className="ui info compact message"> No active projects were found for this campus </div>
            }
         </div>
         <div className="ui middle center aligned grid">
            <div className="content">
               {this.state.projects.map(project => (
                  <React.Fragment key={project.id}>
                  <article className="project ui two column doubling stackable grid">
                     <div className="column">
                        <span className="title">{project.partner}</span>
                        <span className="grayed">{project.category.name}</span>
                        <span className="time">Total time: {formatTime(project.totalTime)}</span>
                        <div className="status">Status: {project.status.name}</div>
                        <div className="ui green progress">
                           <div className="bar" style={{width: project.percentage + '%'}}>
                           {project.percentage > 0 &&
                                 <div className="progress">{project.percentage + '%'}</div>
                           }
                           </div>
                        </div>
                        <div className="section">Current checkpoint:</div>
                        <div className="checkpoints"> 
                           {project.checkpoints.map(checkpoint => (
                           <div key={checkpoint.projectId + ':' + checkpoint.checkpointId}
                              className="checkpoint">
                              <label className="check" onClick={this.onClickCheckpoint.bind(this, checkpoint)}>
                                 <i className={"icon circle outline " + (checkpoint.completed?"check":"")}></i>
                                 {checkpoint.checkpoint.description}
                              </label>
                              <span className="due-date">
                                 <span>Due: </span>
                                 {checkpoint.dueDate && 
                                    <span>{moment(checkpoint.dueDate).format(SHORT_DATE_FORMAT)}</span>
                                 }
                                 <i className="icon calendar alternate outline"></i>
                              </span>
                           </div>
                           ))}
                        </div>
                     </div>
                     <div className="column">
                        <div className="section">
                           Latest Notes
                           <button className="ui basic mini button" onClick={this.addNote.bind(this, project)}><i className="plus icon"></i> Add note</button>
                        </div>
                        {project.notes.slice(0, 4).map(note => (<div key={note.id} className="note">
                           <div>
                              <i className="icon calendar alternate outline"></i>
                              <span className="grayed">{moment(note.timestamp).format(DATE_FORMAT)} </span>
                              <i className="icon clock outline"></i>
                              <span className="grayed">
                                 Time spent: {note.minutes} minutes.
                              </span>
                           </div>
                           <div>
                              {note.content}
                              <i className="grayed icon trash alternate"
                                 onClick={this.deleteNote.bind(this, note, project)}
                                 title="Delete this note"></i>
                           </div>
                        </div>
                        ))}
                     </div>
                  </article>
                  <div className="ui divider"></div>
               </React.Fragment>
               ))}
            </div>
         </div>
         <AddNoteModal onSave={this.onSaveNote}/>
         <DeleteModal onYes={this.onConfirmDelete} title="note" />
      </React.Fragment>);
   }
}

let formatTime = function(minutes) {
   let hours = Math.floor(minutes/60);
   let remainder = minutes % 60;
   if (hours>0 && remainder>0) {
         return hours + 'H ' + remainder + 'M';
   } else if(hours > 0) {
      return hours + 'H';
   }
   return remainder + 'M';
}


export default Dashboard;

const domContainer = document.querySelector('#dashboard');
ReactDOM.render(
    React.createElement(Dashboard, {}),
    domContainer
);
