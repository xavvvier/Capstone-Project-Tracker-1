import React from "react";
import ReactDOM from "react-dom";
import ProjectTable from "./project-table";
import DeleteModal from "./delete-modal";
import ProjectDetailModal from "./project-detail-modal";
import DropDown from './dropdown';
import SearchInput from './search-input';
import { debounce } from "lodash";

class ProjectForm extends React.Component {
    constructor(props) {
       super(props);
       this.sortedBy = '';
       this.sortOrder = '';
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
          notes: [],
          filter: '',
          errors: {}
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
       let queryString = '/?sort=' + this.sortedBy + '&asc=' + (this.sortOrder?"1":"0") + '&filter=' + this.state.filter;
       axios.get(this.source.api + queryString)
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

    validate = () => {
       let errors = {};
       if(!Number(this.state.project.campusId)>0) {
          errors.campus = "Required field";
          errors.active = true;
       }
       if(!Number(this.state.project.categoryId)>0) {
          errors.category = "Required field";
          errors.active = true;
       }
       if(!Number(this.state.project.statusId)>0) {
          errors.status = "Required field";
          errors.active = true;
       }
       this.setState({errors});
       return !errors.active;
    }

    onSubmit = (e) => {
       e.preventDefault();
       if(!this.validate()) { return; }
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

    onAddNew = (e) => { this.setState({ errors: {}, displayForm: true, project: this.emptyEntity(), editingItem: null, message: null }); }
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
       this.setState({ errors: {}, displayForm: true, project: projectCopy, editingItem: item, message: null});
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

    onSort = (column, order) => {
       this.sortOrder = order;
       this.sortedBy = column;
       this.loadItems();
    }

    changeSearch = (value) => {
       this.setState({filter: value});
       this.loadItems();
    }

    render() {
        const showForm = this.state.displayForm;
        return <div className="project-form-container" >
            <button onClick={this.onAddNew} className={"ui positive basic button " + (showForm?"hid":"")}>
                <i className="plus icon"></i> Add new
            </button>
            <a target="_blank" href="/api/project/export" className={"ui secondary basic button " + (showForm?"hid":"")}>
               <i className="icon download"></i> Export
            </a>
            <div className={"ui icon input " + (showForm?"hid":"")}>
               <SearchInput onSearch={this.changeSearch}/>
               <i className="search icon"></i>
            </div>
            <div className={this.state.loading?"ui active centered inline loader":""}></div>
            <form className={showForm ? "ui form scale-in-ver-top" : "ui form hid"}
                method="post" onSubmit={this.onSubmit}>
                <div className="two fields">
                   <div className={"field" + (this.state.errors.campus?" error ":"")}>
                       <label>Campus</label>
                       <DropDown value={this.state.project.campusId}
                           name="campusId"
                           placeholder="Select campus..."
                           data={this.state.campuses}
                           onChange={this.onChange} />
                   </div>
                   <div className={"field" + (this.state.errors.category?" error ":"")}>
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
                       <input type="text" name="partner" required="required"
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
                   <textarea  required="required"
                     value={this.state.project.description}
                     name="description"
                     onChange={this.onChange}
                     placeholder="Project description"
                     rows="3"></textarea>
                </div>
                <div className="two fields">
                   <div className="field">
                       <label>Start Date</label>
                       <input type="date" name="startDate" required="required"
                           value={this.state.project.startDate}
                           onChange={this.onChange} maxLength="10"/>
                   </div>
                   <div className="field">
                       <label>End Date</label>
                       <input type="date" name="endDate" required="required"
                           value={this.state.project.endDate}
                           onChange={this.onChange} maxLength="10"/>
                   </div>
                </div>
                <div className="two fields">
                   <div className="field">
                       <label>Value</label>
                       <input type="number" name="value" required="required"
                           value={this.state.project.value}
                           onChange={this.onChange} maxLength="200"
                           placeholder="1500" />
                   </div>
                   <div className={"field" + (this.state.errors.status?" error ":"")}>
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
               onSort={this.onSort}
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

