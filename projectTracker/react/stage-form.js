import React from "react";
import ReactDOM from "react-dom";
import StageTable from "./stage-table";
import DeleteModal from "./delete-modal";

class StageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayForm: false,
            items: [],
            stage: this.emptyEntity(),
            editingItem: null,
            message: null
        };
        this.source = this.props.source;
    }

    emptyEntity() {
        return { title: '', description: ''};
    }

    componentDidMount() { this.loadItems(); }

    loadItems = () => {
       this.setState({loading: true});
       axios.get(this.source.api)
       .then(res => {
          this.setState({ loading: false, items: res.data });
       })
       .catch(err => {
          this.setState({
             loading: false,
             message: {bad: true, content: 'Unable to reach the server'}
          });
       });
    }

    onSubmit = (e) => {
       e.preventDefault();
       this.setState({loading: true});
       //Change the http method depending if the operation is edit or save
        let method = this.state.editingItem == null ? 'post' : 'put';
        let id = this.state.editingItem !== null ? this.state.editingItem.id : 0;
       axios({
          method: method,
          url: this.source.api,
          data: this.state.stage
       }).then(res => {
          this.setState({
              displayForm: false,
              stage: this.emptyEntity(),
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

    onAddNew = (e) => { this.setState({ displayForm: true, stage: this.emptyEntity(), editingItem: null, message: null }); }
    onCancel = (e) => { this.setState({ displayForm: false, message: null }); }
    onChange = (e) => { 
       let stage = this.state.stage;
       stage[e.target.name] = e.target.value;
       this.setState({ stage, message: null });
    };

    onEdit = (item) => {
       let stageCopy = Object.assign({}, item);
       this.setState({ displayForm: true, stage: stageCopy, editingItem: item, message: null});
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
                <div className="field">
                    <label>Title</label>
                    <input type="text" name="title" required="required"
                        value={this.state.stage.title}
                        onChange={this.onChange} maxLength="200"
                        placeholder="Stage name" />
                </div>
                <div className="field">
                    <label>Description</label>
                    <input type="text" name="description" required="required"
                        value={this.state.stage.description}
                        onChange={this.onChange} maxLength="200"
                        placeholder="Description" />
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
            <StageTable items={this.state.items}
               onEdit={this.onEdit}
               onDelete={this.onDelete}/>
            <DeleteModal onYes={this.onConfirmDelete} title="stage" content={this.deleteItem && this.deleteItem.title}/>
        </div>;
    }
}


const source = {
   api: "/api/stage"
}


export default StageForm;

const domContainer = document.querySelector('#stage-form')
ReactDOM.render(
    React.createElement(StageForm, { source }),
    domContainer
);
