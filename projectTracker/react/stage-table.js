import React from "react";

class StageTable extends React.Component {

    render() {
        return <table className="ui celled table">
            <thead><tr><th>Title</th><th>Description</th><th>Actions</th></tr></thead>
            <tbody>
                {this.props.items.map(item => (
                    <tr key={item.id}>
                        <td data-label="Title">{item.title}</td>
                        <td data-label="Description">{item.description}</td>
                        <td data-label="Actions" className="right collapsing aligned">
                            <button className="ui vertical primary basic animated mini button"
                                onClick={this.props.onEdit.bind(this, item)}>
                                <span className="hidden content">Edit</span>
                                <div className="visible content">
                                    <i className="pencil alternate icon"></i>
                                </div>
                            </button>
                            <button className="ui vertical negative basic animated mini button"
                                onClick={this.props.onDelete.bind(this, item)}>
                                <div className="hidden content">Delete</div>
                                <div className="visible content">
                                    <i className="trash alternate icon"></i>
                                </div>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>;
    }
}


export default StageTable;
