import React from 'react';

class ButtonGroup extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         selected: null
      };
   }

   componentDidUpdate(prevPros) {
      //To avoid infinite rendering, update state only when new items are set
      if(this.props.items != prevPros.items) {
         const {items} = this.props;
         const previousSelected = localStorage.getItem(this.props.id);
         let selected = items[0];
         if(previousSelected) {
            selected = items.find(i => i.id == previousSelected);
         }
         this.onChange(selected);
      }
   }

   onChange = (item, e) => {
      this.setState({selected: item});
      localStorage.setItem(this.props.id, item.id);
      this.props.onChange(item);
   }

   render() {
      let items = this.props.items;
      return (
         <div className="ui mini buttons">
            {items.map(i => (
               <button key={i.id} 
                  onClick={this.onChange.bind(this, i)} 
                  className={"ui button " + (this.state.selected?.id == i.id?"active":"")}
               >
                 {i.name}
               </button>
            ))}
         </div>
      );
   }
}

export default ButtonGroup;
