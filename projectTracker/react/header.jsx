import React from 'react';
import ReactDOM from "react-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       
        return (
            <header>
                The header for: {this.props.name}
            </header>
        );
    }
}

export default Header;

let domContainer = document.querySelector('.header');
const name = domContainer.dataset.name;
ReactDOM.render(
    React.createElement(Header, { name: name }),
    domContainer
);
