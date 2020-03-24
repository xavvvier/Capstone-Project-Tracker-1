import React from 'react';

export default class DueDateModal extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         date: ''
      };
   }

   setDate(date) { this.setState({date}); }
   onChange = (e) => { this.setState({ [e.target.name]: e.target.value})};
   onSubmit = (e) => {
      e.preventDefault();
      let {date} = this.state;
      this.props.onSave(date);
      this.setState({date: ''});
   }

   render() {
      return (
         <form className="ui mini modal due-date transition form" onSubmit={this.onSubmit}> <div className="header">Add Due Date</div>
            <div className="content">
              <div className="field">
                <label>Due date</label>
                <input type="date" name="date" 
                  onChange={this.onChange}
                  value={this.state.date}/>
              </div>
            </div>
            <div className="actions">
               <div className="ui secondary deny basic button" tabIndex="0">Cancel</div>
               <button type="submit" className="ui basic positive right button" onClick={this.props.onAdd} tabIndex="0">
                  Save
               </button>
            </div>
         </form>
      );
   }
}
