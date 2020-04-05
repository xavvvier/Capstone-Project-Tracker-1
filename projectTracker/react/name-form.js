import React from "react";
import ReactDOM from "react-dom";
import NameTable from "./name-table";
import DeleteModal from "./delete-modal";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayForm: false,
            items: [],
            name: '',
            editingItem: null,
            message: null,
            errors: {}
        };
        this.source = sources[this.props.source];
    }

    componentDidMount() { this.loadItems(); }

    loadItems = () => {
       this.setState({loading: true});
       axios.get(this.source.api)
          .then(res => {
             this.setState({ loading: false, items: res.data });
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
          data: { id: id, name: this.state.name }
       }).then(res => {
          this.setState({
              displayForm: false,
              name: '',
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

    onAddNew = (e) => { this.setState({ displayForm: true, name: '', editingItem: null, message: null }); }
    onCancel = (e) => { this.setState({ displayForm: false, message: null }); }
    onChange = (e) => { this.setState({ [e.target.name]: e.target.value, message: null })};

    onEdit = (item) => {
       this.setState({ displayForm: true, name: item.name, editingItem: item, message: null});
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
                    <label>Name</label>
                    <input type="text" name="name" required="required"
                        value={this.state.name}
                        onChange={this.onChange} maxLength="200"
                        placeholder={this.source.name} />
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
            <NameTable items={this.state.items}
               onEdit={this.onEdit}
               onDelete={this.onDelete}/>
            <DeleteModal onYes={this.onConfirmDelete} title={this.source.name.toLowerCase()} content={this.deleteItem && this.deleteItem.name}/>
        </div>;
    }
}


const sources = {
   campus: {
      name: "Campus",
      api: "/api/campus"
   },
   status: {
      name: "Status",
      api: "/api/status"
   },
   category: {
      name: "Category",
      api: "/api/category"
   }
}


export default NameForm;

const domContainer = document.querySelector('#name-form')
const source = domContainer.dataset.source;
ReactDOM.render(
    React.createElement(NameForm, { source }),
    domContainer
);
