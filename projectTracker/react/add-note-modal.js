import React from 'react';

export default class AddNoteModal extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         minutes: 0,
         content: ''
      };
   }

   onChange = (e) => { this.setState({ [e.target.name]: e.target.value, message: null })};
   onSubmit = (e) => {
      e.preventDefault();
      let {minutes, content} = this.state;
      this.props.onSave({minutes, content});
      this.setState({content: '', minutes: 0});
   }

   render() {
      return (
         <form className="ui mini modal add transition form" onSubmit={this.onSubmit}> <div className="header">Add Note</div>
            <div className="content">
              <div className="field">
                <label>Content</label>
                <textarea rows="2" name="content" 
                  onChange={this.onChange}
                  value={this.state.content}></textarea>
              </div>
              <div className="field">
                <label>Time Spent (minutes)</label>
                <input type="number" name="minutes" 
                  onChange={this.onChange}
                  value={this.state.minutes}/>
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
