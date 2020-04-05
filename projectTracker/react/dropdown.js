import React from 'react';

class DropDown extends React.Component{
    render() {
        var {data, value} = this.props;
        return (
        <select required="required" className="ui search dropdown" 
           onChange={this.props.onChange}
           name={this.props.name}
           value={value}>
            <option>{this.props.placeholder}</option>
            {
                data.map(function (item) {
                    return <option key={item.id} value={item.id }>{item.name}</option>;
                })
            }
        </select>);
    }
}

export default DropDown;
