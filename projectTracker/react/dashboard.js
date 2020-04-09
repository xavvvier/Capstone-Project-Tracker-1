import React from 'react';
import ReactDOM from 'react-dom';
import ButtonGroup from './button-group.js';
import AddNoteModal from './add-note-modal.js';
import DeleteModal from './delete-modal.js';
import DueDateModal from './due-date-modal.js';

const DATE_FORMAT = "MMMM D YYYY, h:mm:ss a";
const SHORT_DATE_FORMAT = "MMMM D YYYY";
const TRANSFER_DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss";

const source = {
   campus: { api: '/api/campus' },
   project: { api: '/api/project/bycampus/' },
   note: { api: '/api/note/' },
   checkpoint: { 
      api_completed: '/api/project/markcheckpoint',
      api_duedate: '/api/project/markduedate'
   },
};


class Dashboard extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         campuses: [],
         projects: [],
         loading: true,
         message: null,
         dueDate: '',
         checkpointsDue: []
      };
      this.busy = false;
   }

   componentDidMount() { this.loadItems(); }

   loadItems = () => {
      axios.get(source.campus.api)
         .then(res => {
            this.setState({ campuses: res.data });
         });
   }

   dueText = (checkpoint) => {
      if(checkpoint.dueDate == null) return null;
      let today = moment().startOf('day');
      let due = moment(checkpoint.dueDate);
      let duration = moment.duration(due.diff(today));
      let times = {
         y: Math.floor(Math.abs(duration.as('y'))),
         m: Math.floor(Math.abs(duration.as('M'))),
         w: Math.floor(Math.abs(duration.as('w'))),
         d: Math.floor(Math.abs(duration.as('d'))),
         isOverdue: duration.asDays() < 0
      };
      let pluralize = (n, t) => {
         let asInt = Math.floor(n);
         if(asInt == 1) {
            return asInt + ' ' + t;
         }
         return asInt + ' ' + t + 's';
      };
      let timeAsText = '';
      if(times.y > 0) {
         timeAsText = pluralize(times.y, 'year');
      } else if(times.m > 0) {
         timeAsText = pluralize(times.m, 'month');
      } else if(times.w > 0) {
         timeAsText = pluralize(times.w, 'week');
      } else {
         timeAsText = pluralize(times.d, 'day');
      }
      if(times.isOverdue) {
         return timeAsText + ' overdue';
      } else if(timeAsText == '0 days') {
         return 'Due today';
      }
      return 'Due in ' + timeAsText;
   };

   loadCheckpointsDue = () => {
      let mapDueCheckpoints = (project) => {
         let checkpoint = project.checkpoints
            .find(c => !c.completed && c.dueDate);
         if (checkpoint) {
            let dueDays = this.dueText(checkpoint);
            return {project, checkpoint, dueDays};
         }
         return null;
      };
      let {projects} = this.state;
      let projectChks = projects.map(mapDueCheckpoints)
         .filter(nc => nc != null);
      this.setState({checkpointsDue: projectChks});
   }

   addNote = (p, e) => { this.project = p; $('.ui.modal.add').modal('show'); }
   onSaveNote = (note) => {
      if(this.busy) { return; }
      this.busy = true;
      note.timestamp = moment().format(TRANSFER_DATE_FORMAT);
      note.projectId = this.project.id;
      axios.post(source.note.api, note)
         .then(res => {
            this.reloadNotes(res.data);
            this.busy = false;
         });
   }
   reloadNotes(data) {
      this.project.totalTime = data.totalTime;
      this.project.notes = data.notes;
      this.setState({ projects: this.state.projects });
   }
   deleteNote = (n, p, e) => { this.project = p; this.note = n; $('.ui.modal.delete').modal('show'); }
   onConfirmDelete = () => {
      axios.delete(source.note.api + this.note.id)
         .then(res => this.reloadNotes(res.data));
   }
   onClickCheckpoint = (cp, e) => {
      if(!cp.enabled) return;
      let checkpointPayload = { checkpointId: cp.checkpointId, projectId: cp.projectId};
      checkpointPayload.completed = !cp.completed;
      axios.put(source.checkpoint.api_completed, checkpointPayload)
         .then(res => {
            // Find related project
            let project = this.state.projects.find(p => p.id == cp.projectId);
            // Update the respective checkpoint
            let projectCp = project.checkpoints.find(c => c.checkpointId == cp.checkpointId);
            projectCp.completed = checkpointPayload.completed;
            Dashboard.calculateProgress(project);
            this.setState({ projects: this.state.projects });
            this.loadCheckpointsDue();
         });
   }
   onClickDueDate = (cp, e) => {
      this.checkpoint = cp;
      let dueDate = cp.dueDate ? cp.dueDate.substr(0, 10) : '';
      this.modalRef.setDate(dueDate);
      $('.ui.modal.due-date').modal('show');
   }
   onChangeDue = (dueDate) => {
      let {checkpointId, projectId} = this.checkpoint;
      let checkpointPayload = { checkpointId, projectId, dueDate};
      axios.put(source.checkpoint.api_duedate, checkpointPayload)
         .then(res => {
            this.checkpoint.dueDate = dueDate;
            this.setState({projects: this.state.projects});
            this.loadCheckpointsDue();
         });
   }

   changeCampus = (e) => {
      this.setState({loading: true});
      axios.get(source.project.api + e.id)
         .then(res => {
            const projects = res.data;
            projects.forEach(p => Dashboard.calculateProgress(p));
            this.setState({ projects, loading: false });
            this.loadCheckpointsDue();
         });
   }

   // Calculate the new project's percentage of completion
   static calculateProgress(project) {
      // project.checkpoints = project.checkpoints.slice(0, 5);
      const len = project.checkpoints.length;
      if(len>0) {
         const completedCP = project.checkpoints.filter(c => c.completed).length;
         project.percentage = Math.ceil(completedCP * 100 / len);
      } else {
         project.percentage = 100;
      }
      // find the current checkpoint
      let currentCheckpointIndex = 0;
      for (var i = 0; i < len; i++) {
         if (!project.checkpoints[i].completed) {
            currentCheckpointIndex = i;
            break;
         }
      }
      // Detect when all checkpoints are completed
      if (currentCheckpointIndex == 0 && 
         project.checkpoints.length> 0 && 
         project.checkpoints[0].completed){
         currentCheckpointIndex = project.checkpoints.length;
      }
      // enable only the current checkpoint and the previous one
      for (var i = 0; i < len; i++) {
         project.checkpoints[i].current = i == currentCheckpointIndex;
         project.checkpoints[i].enabled = i == currentCheckpointIndex 
            || i == currentCheckpointIndex - 1;
      }
      // calculate the first item to show
      const itemsToShow = 4;
      let first = Math.max(currentCheckpointIndex - 2, 0);
      if (len - first < itemsToShow) {
         first = Math.max(len - itemsToShow, 0);
      }
      // Calculate transformation based on position
      for (var i = 0; i < len; i++) {
         project.checkpoints[i].style = { 
            transform: 'translateY(' + (-first * 20) + 'px)',
            opacity: i < first || i >= first + itemsToShow ? 0: 1
         };
      }
   }

   render() {
      return (<React.Fragment>
         {this.state.checkpointsDue.length>0 &&
            <div className="ui checkpoints due info message">
              <div className="header">Next checkpoints</div>
              <ul className="list">
                {this.state.checkpointsDue.map(chk =>
                   <li key={chk.project.id}>
                     <a href={"#project-" + chk.project.id} className="title">{chk.project.partner}</a> : 
                     <span className="due-days">{chk.dueDays}</span>
                     ({moment(chk.checkpoint.dueDate).format(SHORT_DATE_FORMAT)})
                   </li>
                )}
              </ul>
            </div>
         }
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
                  <article id={"project-" + project.id} className="project ui two column doubling stackable grid">
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
                              style={checkpoint.style}
                              className={"checkpoint " + (checkpoint.current?" current ":"") + (checkpoint.enabled?" enabled ":"")}>
                              <label className="text" onClick={this.onClickCheckpoint.bind(this, checkpoint)}>
                                 <i className={"icon circle outline " + (checkpoint.completed?"check":"")}></i>
                                 {checkpoint.checkpoint.description}
                              </label>
                              <span className="due-date" tabIndex="0" onClick={this.onClickDueDate.bind(this, checkpoint)}>
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
         <DueDateModal 
            ref={ref => { this.modalRef = ref; }} 
            onSave={this.onChangeDue}/>
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
