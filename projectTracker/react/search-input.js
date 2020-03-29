import React, {Component} from 'react'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators';

export default class SearchInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      debounced: '',
    };
    this.onSearch$ = new Subject();
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount(){
     this.subscription = this.onSearch$
        .pipe(
           debounceTime(500)
        )
        .subscribe(debounced => {
           this.setState({ debounced });
           this.props.onSearch(debounced);
        });
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearch(e) {
    const search = e.target.value;
    this.setState({ search });
    this.onSearch$.next(search);
  }

  render() {
    const { search, debounced } = this.state;
    return (
        <input type="text" value={search} onChange={this.onSearch} />
    );
  }
}
