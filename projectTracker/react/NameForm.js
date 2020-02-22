import React from "react";
import ReactDOM from "react-dom";
import TableList from "./table-list";
import axios from "axios";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayForm: false,
            items: [],
            name: ''
        };
        this.source = sources[this.props.source];
    }

    componentDidMount() {
        axios.get(this.source.api)
            .then(res => {
                this.setState({ items: res.data });
            });
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.post(this.source.api, { name: this.state.name })
            .then(res => {
                this.setState({
                    displayForm: false,
                    name: '',
                    items: [...this.state.items, res.data]
                });
            });
    }

    onAddNew = (e) => { this.setState({ displayForm: true }); }
    onCancel = (e) => { this.setState({ displayForm: false }); }
    onChange = (e) => { this.setState({ [e.target.name]: e.target.value })};

    render() {
        const showForm = this.state.displayForm;
        return <div className="name-form-container" >
            <button onClick={this.onAddNew} className={"ui positive basic button " + (showForm?"hid":"")}>
                <i className="plus icon"></i> Add new
            </button>
            <form className={showForm ? "ui form scale-in-ver-top" : "ui form hid"}
                method="post" onSubmit={this.onSubmit}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="name"
                        value={this.state.name}
                        onChange={this.onChange} maxLength="200"
                        placeholder={this.source.placeholder} />
                </div>
                <button className="ui positive basic button" type="submit">
                    <i className="save icon"></i>
                    Save
                </button>
                <button className="ui secondary basic button" type="button" onClick={this.onCancel}>
                    <i className="close icon"></i>
                    Cancel
                </button>
            </form>
            <TableList items={this.state.items}/>
        </div>;
    }
}


const sources = {
    campus: {
        placeholder: "Campus",
        api: "/api/campus"
    },
    status: {
        placeholder: "Status",
        api: "/api/status"
    },
    category: {
        placeholder: "Category",
        api: "/api/category"
    }
}


export default NameForm;

const domContainer = document.querySelector('#name-form')
const source = domContainer.dataset.source;
const onSubmitted = domContainer.dataset.submitted;
ReactDOM.render(
    React.createElement(NameForm, { source, onSubmitted }),
    domContainer
);