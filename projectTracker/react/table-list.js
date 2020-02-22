import React from "react";

class TableList extends React.Component {
    
    render() {
        return <table className="ui celled table">
            <thead><tr><th>Name</th><th>Actions</th></tr></thead>
            <tbody>
                {this.props.items.map(item => (
                    <tr key={item.id}>
                        <td data-label="Name">{item.name}</td>
                        <td data-label="Actions" className="right collapsing aligned">
                            <button className="ui vertical primary basic animated mini button">
                                <span className="hidden content">Edit</span>
                                <div className="visible content">
                                    <i className="pencil alternate icon"></i>
                                </div>
                            </button>
                            <button className="ui vertical negative basic animated mini button">
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


export default TableList;