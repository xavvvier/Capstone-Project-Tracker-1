import React from "react";
import ReactDOM from "react-dom";
import ProjectTable from "./project-table";
import DeleteModal from "./delete-modal";
import ProjectDetailModal from "./project-detail-modal";
import axios from "axios";
import DropDown from './dropdown';

class ProjectForm extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
          displayForm: false,
          items: [],
          project: this.emptyEntity(),
          editingItem: null,
          message: null,
          statuses : [],
          categories : [],
          campuses : [],
          projectView: {},
          checkpoints: [],
          notes: []
       };
       this.source = source;
    }

    emptyEntity() {
       return {
          campusId: "",
          categoryId: "",
          partner: '',
          description: '',
          curriculumConsultant: '',
          startDate: '',
          endDate: '',
          value: '',
          statusId: '',
       };
    }

    componentDidMount() {this.loadItems(); this.loadDropdown();}

    loadItems = () => {
       this.setState({loading: true});
       axios.get(this.source.api)
          .then(res => {
             this.setState({ loading: false, items: res.data });
          });
    }

    loadDropdown = () => {
       Promise.all([
          axios.get(this.source.campus),
          axios.get(this.source.category),
          axios.get(this.source.status)
       ]).then(resp => {
          const [campuses, categories, statuses] = resp.map(col => col.data);
          this.setState({campuses, categories, statuses});
       });
    }

    onSubmit = (e) => {
       e.preventDefault();
       this.setState({loading: true});
       //Change the http method depending if the operation is edit or save
       let method = this.state.editingItem == null ? 'post' : 'put';
       let id = this.state.editingItem !== null ? this.state.editingItem.id : 0;
       //Remove object related entities
       this.state.project.campus = null;
       this.state.project.category = null;
       this.state.project.status = null;
       axios({
          method: method,
          url: this.source.api,
          data: this.state.project,
       }).then(res => {
          this.setState({
              displayForm: false,
              project: this.emptyEntity(),
              message: {bad: false, content: 'Item saved successfully'},
          });
          this.loadItems();
       }).catch(err => {
          this.setState({
             loading: false,
             message: {bad: true, content: err.response.data}
          });
       });
    }

    onAddNew = (e) => { this.setState({ displayForm: true, project: this.emptyEntity(), editingItem: null, message: null }); }
    onCancel = (e) => { this.setState({ displayForm: false, message: null }); }
    onChange = (e) => { 
       let project = this.state.project;
       project[e.target.name] = e.target.value;
       this.setState({ project, message: null });
    };

    onEdit = (item) => {
       let projectCopy = Object.assign({}, item);
       projectCopy.startDate = projectCopy.startDate.substr(0,10);
       projectCopy.endDate = projectCopy.endDate.substr(0,10);
       this.setState({ displayForm: true, project: projectCopy, editingItem: item, message: null});
    };

    onView = (item) => {
       let projectCopy = Object.assign({}, item);
       projectCopy.startDate = projectCopy.startDate.substr(0,10);
       projectCopy.endDate = projectCopy.endDate.substr(0,10);
       axios.get(this.source.api + "/" + item.id).then(res => {
          const details = res.data;
          this.setState({
             projectView: projectCopy,
             checkpoints: details.checkpoints,
             notes: details.notes,
          });
          $('.ui.modal.detail').modal('show');
       }).catch(err => {
          this.setState({
             loading: false,
             message: {bad: true, content: err.response.data}
          });
       });
    };

    onDelete = (item) => {
       this.onCancel();
       this.deleteItem = item;
       $('.mini.modal').modal('show');
    }

    onConfirmDelete = () => {
        this.setState({ loading: true });
        axios.delete(this.source.api + '/' + this.deleteItem.id)
          .then(res => this.loadItems())
          .catch(err => {
             this.setState({
                loading: false,
                message: {bad: true, content: err.response.data}
             });
          });
    }

    render() {
        const showForm = this.state.displayForm;
        return <div className="name-form-container" >
            <button onClick={this.onAddNew} className={"ui positive basic button " + (showForm?"hid":"")}>
                <i className="plus icon"></i> Add new
            </button>
            <div className={this.state.loading?"ui active centered inline loader":""}></div>
            <form className={showForm ? "ui form scale-in-ver-top" : "ui form hid"}
                method="post" onSubmit={this.onSubmit}>
                <div className="two fields">
                   <div className="field">
                       <label>Campus</label>
                       <DropDown value={this.state.project.campusId}
                           name="campusId"
                           placeholder="Select campus..."
                           data={this.state.campuses}
                           onChange={this.onChange} />
                   </div>
                   <div className="field">
                       <label>Category</label>
                       <DropDown value={this.state.project.categoryId}
                           name="categoryId"
                           placeholder="Select category..."
                           data={this.state.categories}
                           onChange={this.onChange} />
                   </div>
                </div>
                <div className="two fields">
                   <div className="field">
                       <label>Partner</label>
                       <input type="text" name="partner"
                           value={this.state.project.partner}
                           onChange={this.onChange} maxLength="200"
                           placeholder="Partner name" />
                   </div>
                   <div className="field">
                       <label>Curriculum Consultant</label>
                       <input type="text" name="curriculumConsultant"
                           value={this.state.project.curriculumConsultant}
                           onChange={this.onChange} maxLength="200"
                           placeholder="John Doe" />
                   </div>
                </div>
                <div className="field">
                   <label>Description</label>
                   <textarea 
                     value={this.state.project.description}
                     name="description"
                     onChange={this.onChange}
                     placeholder="Project description"
                     rows="3"></textarea>
                </div>
                <div className="two fields">
                   <div className="field">
                       <label>Start Date</label>
                       <input type="date" name="startDate"
                           value={this.state.project.startDate}
                           onChange={this.onChange} maxLength="10"/>
                   </div>
                   <div className="field">
                       <label>End Date</label>
                       <input type="date" name="endDate"
                           value={this.state.project.endDate}
                           onChange={this.onChange} maxLength="10"/>
                   </div>
                </div>
                <div className="two fields">
                   <div className="field">
                       <label>Value</label>
                       <input type="number" name="value"
                           value={this.state.project.value}
                           onChange={this.onChange} maxLength="200"
                           placeholder="1500" />
                   </div>
                   <div className="field">
                       <label>Status</label>
                       <DropDown value={this.state.project.statusId}
                           name="statusId"
                           placeholder="Select status..."
                           data={this.state.statuses}
                           onChange={this.onChange} />
                   </div>
                </div>
                <button className={"ui positive basic button " + (this.state.loading?"disabled":"")}
                   type="submit">
                    <i className="save icon"></i>
                    Save
                </button>
                <button className="ui secondary basic button" type="button" onClick={this.onCancel}>
                    <i className="close icon"></i>
                    Cancel
                </button>
            </form>
            {this.state.message !== null?
               <div className={"ui message transition " + (this.state.message.bad?"negative":"positive")}>
                    <div className="header">{this.state.message.title}</div>
                    <p>{this.state.message.content}</p>
                </div>
               :<div></div>
            }
            <ProjectTable items={this.state.items}
               onEdit={this.onEdit}
               onView={this.onView}
               onDelete={this.onDelete}/>
            <DeleteModal onYes={this.onConfirmDelete} title="project"/>
            <ProjectDetailModal 
               project={this.state.projectView} 
               notes={this.state.notes} 
               checkpoints={this.state.checkpoints}/>
        </div>;
    }
}


const source = {
   api: "/api/project",
   campus: "/api/campus",
   category: "/api/category",
   status: "/api/status",
}


export default ProjectForm;

const domContainer = document.querySelector('#project-form')
ReactDOM.render(
    React.createElement(ProjectForm, {}),
    domContainer
);

