import ReactDOM from 'react-dom';
import React,{Component} from 'react';
import './index.css'
import {
    Router,
    hashHistory
} from 'react-router';
import routerConfig from './routes';
export default class AppRoutes extends Component {

    render() {
        return (
            <Router history={hashHistory} routes={routerConfig} onUpdate={() => window.scrollTo(0, 0)}/>
        );
    }
}
ReactDOM.render(<AppRoutes/>, document.getElementById('root'));