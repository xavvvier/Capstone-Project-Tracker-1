import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import ButtonGroup from './button-group.js';
import AddNoteModal from './add-note-modal.js';
import DeleteModal from './delete-modal.js';

const DATE_FORMAT = "MMMM Do YYYY, h:mm:ss a";

const source = {
   campus: { api: '/api/campus' },
   project: { api: '/api/project/bycampus/' },
   note: { api: '/api/note/' },
};


class Dashboard extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         campuses: [],
         projects: [],
         loading: true
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
      note.timestamp = moment().format();
      note.projectId = this.project.id;
      axios.post(source.note.api, note)
         .then(res => {
            //TODO: update UI, total time, last notes
            // this.setState({ campuses: res.data });
            console.log('replied');
         });
   }
   deleteNote = (p, e) => { this.project = p; $('.ui.modal.delete').modal('show'); }
   onConfirmDelete = () => {
      axios.delete(source.note.api + this.project.id)
         .then(res => {
            //TODO: update UI, total time, last notes
            // this.setState({ campuses: res.data });
            console.log('replied deleted');
         });
   }

   changeCampus = (e) => {
      this.setState({loading: true});
      axios.get(source.project.api + e.id)
         .then(res => {
            this.setState({ projects: res.data, loading: false });
         });
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
                           <div className="bar" style={{width: '33%'}}>
                              <div className="progress">33%</div>
                           </div>
                        </div>
                        <div className="section">Current checkpoint:</div>
                        <span>Stage 2 - Scoping</span>
                        <div>
                           <label className="check">
                              <input type="checkbox" value=""/>
                              Dean Approval
                           </label>
                           <span className="due-date">
                              <i className="icon calendar alternate outline"></i>
                              <span>Due: 2020-03-12</span>
                           </span>
                        </div>
                     </div>
                     <div className="column">
                        <div className="section">
                           Latest Notes
                           <button className="ui basic mini button" onClick={this.addNote.bind(this, project)}><i className="plus icon"></i> Add note</button>
                        </div>
                        {project.notes.map(note => (<div key={note.id} className="note">
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
                                 onClick={this.deleteNote.bind(this, project)}
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
