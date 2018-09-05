import React, {
  Component
} from 'react';
import {
  hashHistory
} from 'react-router';
class NotFound extends Component {
  componentDidMount() {
    hashHistory.push('/')
  }
  render() {
    return (
      <div className="">
        Not Found
      </div>
    );
  }
}

export default NotFound;