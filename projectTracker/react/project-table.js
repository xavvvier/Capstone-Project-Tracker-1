import React from "react";

class ProjectTable extends React.Component {

    formatDate(date) {
       return new Date(Date.parse(date)).toLocaleDateString();
    }

    render() {
        return <table className="ui celled table">
            <thead><tr>
               <th>Campus</th>
               <th>Category</th>
               <th>Partner</th>
               <th>Description</th>
               <th>Curriculum Consultant</th>
               <th>Start Date</th>
               <th>End Date</th>
               <th>Value</th>
               <th>Status</th>
               <th>Actions</th>
            </tr></thead>
            <tbody>
                {this.props.items.map(item => (
                    <tr key={item.id}>
                        <td data-label="Campus">{item.campus.name}</td>
                        <td data-label="Category">{item.category.name}</td>
                        <td data-label="Partner">{item.partner}</td>
                        <td data-label="Description">{item.description}</td>
                        <td data-label="Curriculum Consultant">{item.curriculumConsultant}</td>
                        <td data-label="Start Date">
                              {this.formatDate(item.startDate)}
                        </td>
                        <td data-label="End Date">
                              {this.formatDate(item.endDate)}
                        </td>
                        <td data-label="Value">{item.value}</td>
                        <td data-label="Status">{item.status.name}</td>
                        <td data-label="Actions" className="right collapsing aligned">
                            <button className="ui vertical secondary basic animated mini button"
                                onClick={this.props.onView.bind(this, item)}>
                                <span className="hidden content">View</span>
                                <div className="visible content">
                                    <i className="icon list alternate outline"></i>
                                </div>
                            </button>
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


export default ProjectTable;
