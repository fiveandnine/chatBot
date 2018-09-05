import React from 'react';
import './index.css';
import {
    hashHistory
} from 'react-router';

export default class To_Login extends React.Component {

    componentWillMount() {
        const token = localStorage.getItem('token');
        console.log("token=" + token);
        console.log(!token || token == null);
        // if (!token || token ==null || token ==undefined) {
        //     browserHistory,hashHistory.push('/login');
        // }else{
        //     // browserHistory,hashHistory.push('/home');
        // }
        hashHistory.push('/home');


    }

    render() {
        return (
            <div>
                {this.props.children}</div>
        )
    }
}