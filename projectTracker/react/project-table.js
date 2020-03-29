import React from "react";

class ProjectTable extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
          column: '',
          asc: true
       };
    }

    formatDate(date) {
       return new Date(Date.parse(date)).toLocaleDateString();
    }

    sort = (column) => {
       const asc = this.state.column == column ? !this.state.asc : true;
       this.setState({column, asc});
       this.props.onSort(column, asc);
    }

    sortIcon = (column) => {
       if (column == this.state.column) {
          if (this.state.asc) {
             return (<i className="icon sort alphabet down"></i>);
          } else {
             return (<i className="icon sort alphabet up"></i>);
          }
       } else {
          return <React.Fragment/>;
       }
    }
    
    sortClass = (column) => {
       if (column == this.state.column) {
          return "sortable sorted";
       }
       return "sortable";
    }

    render() {
        return <table className="ui celled table">
            <thead><tr>
               <th className={this.sortClass("campus")} onClick={this.sort.bind(this, "campus")}>Campus {this.sortIcon("campus")}</th>
               <th className={this.sortClass("category")} onClick={this.sort.bind(this, "category")}>Category {this.sortIcon("category")}</th>
               <th className={this.sortClass("partner")} onClick={this.sort.bind(this, "partner")}>Partner {this.sortIcon("partner")}</th>
               <th className={this.sortClass("description")} onClick={this.sort.bind(this, "description")}>Description {this.sortIcon("description")}</th>
               <th className={this.sortClass("curriculum")} onClick={this.sort.bind(this, "curriculum")}>Curriculum Consultant {this.sortIcon("curriculum")}</th>
               <th className={this.sortClass("startdate")} onClick={this.sort.bind(this, "startdate")}>Start Date {this.sortIcon("startdate")}</th>
               <th className={this.sortClass("enddate")} onClick={this.sort.bind(this, "enddate")}>End Date {this.sortIcon("enddate")}</th>
               <th className={this.sortClass("value")} onClick={this.sort.bind(this, "value")}>Value {this.sortIcon("value")}</th>
               <th className={this.sortClass("status")} onClick={this.sort.bind(this, "status")}>Status {this.sortIcon("status")}</th>
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
