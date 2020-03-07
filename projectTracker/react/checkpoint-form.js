import React from "react";
import ReactDOM from "react-dom";
import CheckpointTable from "./checkpoint-table";
import DeleteModal from "./delete-modal";
import axios from "axios";
import DropDown from './dropdown';

class CheckpointForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayForm: false,
            items: [],
            checkpoint: this.emptyEntity(),
            editingItem: null,
            message: null,
            stages: []
        };
    }

    emptyEntity() {
       return { description: "", stageId: "" };
    }

    componentDidMount() { this.loadItems(); this.loadDropdown();}

    loadItems = () => {
       this.setState({loading: true});
       axios.get(sources.checkpoints.api)
          .then(res => {
             this.setState({ loading: false, items: res.data });
          });
    }

    loadDropdown = () => {
       axios.get(sources.stages.api).then(res => {
          let stages = res.data.map(s => {
             return { id: s.id, name: s.title + ' - ' + s.description}
          });
          this.setState({stages});
       });
    }

    onSubmit = (e) => {
       e.preventDefault();
       this.setState({loading: true});
       //Change the http method depending if the operation is edit or save
        let method = this.state.editingItem == null ? 'post' : 'put';
        let id = this.state.editingItem !== null ? this.state.editingItem.id : 0;
       //Remove object related entities
       this.state.checkpoint.stage = null;
       axios({
          method: method,
          url: sources.checkpoints.api,
          data: this.state.checkpoint
       }).then(res => {
          this.setState({
              displayForm: false,
              checkpoint: this.emptyEntity(),
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

    onAddNew = (e) => { this.setState({ displayForm: true, checkpoint: this.emptyEntity(), editingItem: null, message: null }); }
    onCancel = (e) => { this.setState({ displayForm: false, message: null }); }
    onChange = (e) => { 
       let checkpoint = this.state.checkpoint;
       checkpoint[e.target.name] = e.target.value;
       this.setState({ checkpoint , message: null });
    };

    onEdit = (item) => {
       let checkpointCopy = Object.assign({}, item);
       this.setState({ displayForm: true, checkpoint: checkpointCopy, editingItem: item, message: null});
    };

    onDelete = (item) => {
       this.onCancel();
       this.deleteItem = item;
       $('.mini.modal').modal('show');
    }

    onConfirmDelete = () => {
        this.setState({ loading: true });
        axios.delete(sources.checkpoints.api + '/' + this.deleteItem.id)
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
                <div className="field">
                    <label>Stage</label>
                    <DropDown value={this.state.checkpoint.stageId}
                        name="stageId"
                        placeholder="Select stage..."
                        data={this.state.stages}
                        onChange={this.onChange} />
                </div>
                <div className="field">
                    <label>Description</label>
                    <input type="text" name="description"
                        value={this.state.checkpoint.description}
                        onChange={this.onChange} maxLength="200"
                        placeholder="Descripion" />
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
            <CheckpointTable items={this.state.items}
               onEdit={this.onEdit}
               onDelete={this.onDelete}/>
            <DeleteModal onYes={this.onConfirmDelete} title="checkpoint" content={this.deleteItem && this.deleteItem.description}/>
        </div>;
    }
}


const sources = {
   checkpoints: {
      api: "/api/checkpoint"
   },
   stages: {
      api: "/api/stage"
   },
}


export default CheckpointForm;

const domContainer = document.querySelector('#checkpoint-form')
ReactDOM.render(
    React.createElement(CheckpointForm, { }),
    domContainer
);
