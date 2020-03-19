import React from 'react';

const DATE_FORMAT = "dddd, MMMM Do YYYY, h:mm:ss a";

class ProjectDetailModal extends React.Component {
   render() {
      const {
         partner,
         campus,
         category,
         description,
         curriculumConsultant,
         status,
         startDate,
         endDate,
         value,
         totalTime
      } = this.props.project;
      const {notes, checkpoints} = this.props;
      return (<div className="ui modal detail">
         <i className="close icon"></i>
         <div className="header">
           Project Details
         </div>
         <div className="content">
            <div className="ui three column doubling stackable grid">
                 <div className="column detail-field">
                     <p>Partner</p>
                     <h4>{partner}</h4>
                 </div>
                 <div className="column detail-field">
                     <p>Campus</p>
                     <h4>{campus && campus.name}</h4>
                 </div>
                 <div className="column detail-field">
                     <p>Category</p>
                     <h4>{category && category.name}</h4>
                 </div>
                 <div className="column detail-field">
                     <p>Description</p>
                     <h4>{description}</h4>
                 </div>
                 <div className="column detail-field">
                     <p>Curriculum Consultant</p>
                     <h4>{curriculumConsultant}</h4>
                 </div>
                 <div className="column detail-field">
                     <p>Status</p>
                     <h4>{status && status.name}</h4>
                 </div>
                 <div className="column detail-field">
                     <p>Start Date</p>
                     <h4>{startDate}</h4>
                 </div>
                 <div className="column detail-field">
                     <p>End Date</p>
                     <h4>{endDate}</h4>
                 </div>
                 <div className="column detail-field">
                     <p>Value</p>
                     <h4>{value}</h4>
                 </div>
                 <div className="column detail-field">
                     <p>Total Time Spent (minutes)</p>
                     <h4>{totalTime}</h4>
                 </div>
            </div>
            <div className="ui two column doubling stackable grid">
               <section className="column">
                  <h4>Checkpoints</h4>
                  {checkpoints.map(c => 
                     <div key={c.checkpointId}>
                        <label>
                           <i className={"icon circle outline " + (c.completed?"check":"")}></i>
                           <span className="grayed">{c.checkpoint.stage.title} - </span>
                           {c.checkpoint.description}
                        </label>
                     </div>
                  )}
               </section>
               <section className="column">
                  <h4>Notes</h4>
                  {notes.map(c => 
                     <div key={c.id} className="note">
                        <div>
                           <i className="icon calendar alternate outline"></i>
                           <span className="grayed">{moment(c.timestamp).format(DATE_FORMAT)} </span>
                        </div>
                        <div>
                           <i className="icon clock outline"></i>
                           <span className="grayed">
                              Time spent: {c.minutes} minutes.
                           </span>
                        </div>
                        <div>
                           {c.content}
                        </div>
                     </div>
                  )}
                  {notes.length==0?"No notes found":""}
               </section>
            </div>
         </div>
         <div className="actions">
           <div className="ui basic deny button">
             Close
           </div>
         </div>
      </div>);
   }
}

export default ProjectDetailModal; 
