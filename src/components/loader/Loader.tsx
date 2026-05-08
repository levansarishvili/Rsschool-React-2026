import { Component } from 'react';
import './Loader.css';

export default class Loader extends Component {
  render() {
    return <div role="status" aria-label="Loading" className="loader"></div>;
  }
}
