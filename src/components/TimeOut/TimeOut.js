/**
 * Created by xiaolei on 2018/4/18.
 */
import React, { Component } from 'react';
import './timerout.css';

class TimeOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: '00',
      minutes: '00',
      second: '00',
      degree: 'normal'
    }
  }

  componentDidMount() {
    if (this.props.noTimer) {
      this.getTime();
    } else {
      this.getTime() ? this.timeer = setInterval(this.getTime, 1000) : '';
    }
  }

  getTime = () => {
    let nowData = new Date();
    let targetDate = new Date(this.props.beginTime).getTime() + 3 * 60 * 60 * 1000;
    if (nowData > targetDate) {
      return false;
    }
    let _second = Math.floor((targetDate - nowData) / 1000);
    let hours = Math.floor(_second / 3600) < 10 ? '0' + Math.floor(_second / 3600) : Math.floor(_second / 3600);
    let minutes = Math.floor((_second % 3600) / 60) < 10 ? '0' + Math.floor((_second % 3600) / 60) : Math.floor((_second % 3600) / 60);
    let second = Math.floor(_second % 3600 % 60) < 10 ? '0' + Math.floor(_second % 3600 % 60) : Math.floor(_second % 3600 % 60);
    if(hours==='00' && minutes<=5){
      this.setState({degree: 'height'})
    }else if(hours==='00' && parseInt(minutes)<=30 && parseInt(minutes)>5){
      this.setState({degree: 'middle'})
    }else if((hours==='00' && parseInt(minutes)>30)||parseInt(hours)===1){
      this.setState({degree: 'lower'})
    }else{
      this.setState({degree: 'normal'})
    }
    this.setState({ hours, minutes, second });
    return true;
  };

  componentWillUnmount() {
    clearInterval(this.timeer);
  }

  render() {
    return (
      <span className={this.state.degree}>
        <span>{this.state.hours}:</span><span>{this.state.minutes}:</span><span>{this.state.second}</span>
      </span>
    )
  }
}

export default TimeOut;