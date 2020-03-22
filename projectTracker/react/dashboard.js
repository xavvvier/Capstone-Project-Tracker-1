import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import ButtonGroup from './button-group.js';

const DATE_FORMAT = "dddd, MMMM Do YYYY, h:mm:ss a";

const source = {
   campus: { api: '/api/campus' },
   project: { api: '/api/project/bycampus/' },
};

class Dashboard extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         campuses: [],
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

   changeCampus = (e) => {
      console.log('changed campus to', e);
   }

   render() {
      return (
         <div className="ui middle center aligned grid">
            <ButtonGroup id="dashboardButtons" 
               items={this.state.campuses} 
               onChange={this.changeCampus}/>
            <div className="content">
               <article className="project ui two column doubling stackable grid">
                  <div className="column">
                     <span className="title">Acme inc.</span>
                     <span className="grayed">Applied Research</span>
                     <span className="time">Total time: 23h</span>
                     <div className="status">Status: Initial meeting</div>
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
                        <button className="ui basic mini button "><i className="plus icon"></i> Add note</button>
                     </div>
                     <div className="note">
                        <div>
                           <i className="icon calendar alternate outline"></i>
                           <span className="grayed">2015-03-23</span>
                           <i className="icon clock outline"></i>
                           <span className="grayed">
                              Time spent: 23 minutes.
                           </span>
                        </div>
                        <div>
                           This is the note content, suppose there is something meaningful here
                        </div>
                     </div>
                     <div className="note">
                        <div>
                           <i className="icon calendar alternate outline"></i>
                           <span className="grayed">2015-03-23</span>
                           <i className="icon clock outline"></i>
                           <span className="grayed">
                              Time spent: 23 minutes.
                           </span>
                        </div>
                        <div>
                           This is the note content, suppose there is something meaningful here
                        </div>
                     </div>
                  </div>
               </article>
               <div className="ui divider"></div>
            </div>
         </div>
      );
   }
}


export default Dashboard;

const domContainer = document.querySelector('#dashboard');
ReactDOM.render(
    React.createElement(Dashboard, {}),
    domContainer
);
