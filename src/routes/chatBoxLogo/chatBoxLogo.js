/**
 * Created by xiaolei on 2018/4/19.
 */
import React, { Component } from 'react';
import './chatBoxLogo.css';
import { getChatbotLogoList } from "../../services/api";
import ChatLogo from '../../components/ChatLogo/ChatLogo'

export default class chatBoxLogo extends Component {
  constructor(props) {
    super(props);
    this.state={
      list:[]
    }
  }

  componentDidMount() {
    getChatbotLogoList({ id: this.props.location.query.id }).then(data => {
      if (data.err_no === 0){
        this.setState({ list: data.results });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.list&&this.state.list.map((item, key)=>{
          return <ChatLogo key={key} data={item}/>
        })}
      </div>
    )
  }
}