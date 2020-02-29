import React from 'react';

export default class DeleteModal extends React.Component {
   render() {
      return (
         <div className="ui mini test modal transition">
            <div className="header"> Delete {this.props.title} </div>
            <div className="content">
                  <p>
                      Are you sure you want to delete &nbsp; 
                      { this.props.content?
                         (<span className="ui label">
                             {this.props.content}
                         </span>):
                         (<span> 
                            this {this.props.title}
                         </span> )
                      }?
                  </p>
            </div>
            <div className="actions">
               <div className="ui basic positive button" tabIndex="0">No</div>
               <div className="ui negative right labeled icon button" onClick={this.props.onYes} tabIndex="0">
                  Yes
                  <i className="trash icon"></i>
               </div>
            </div>
         </div>
      );
   }
}
