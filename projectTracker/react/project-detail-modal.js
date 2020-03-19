import React from 'react';

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
           Projects
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
            <div>
               <h4>Checkpoints</h4>
               {checkpoints.map(c => 
                  <div key={c.checkpointId}>
                     <label>
                        <input type="checkbox" disabled checked={c.completed}/>
                        {c.checkpoint.description}
                     </label>
                  </div>
               )}
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
