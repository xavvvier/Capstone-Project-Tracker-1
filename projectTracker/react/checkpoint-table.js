import React from "react";

class CheckpointTable extends React.Component {

    render() {
        return <table className="ui celled table">
            <thead><tr><th>Stage</th><th>Description</th><th>Actions</th></tr></thead>
            <tbody>
                {this.props.items.map(item => (
                    <tr key={item.id}>
                        <td data-label="Stage">{(item.stage && item.stage.title + ' - ' + item.stage.description) || item.stageId}</td>
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


export default CheckpointTable;
