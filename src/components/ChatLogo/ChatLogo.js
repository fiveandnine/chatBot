import React, { Component } from 'react';
import './ChatLogo.css';
import {  Button } from 'antd';
import { getChatBoxQuestion, getAnswerFile } from '../../services/api';
import Util from '../../util/util';
export default class Home extends Component {
  state = {
    data:{}
  };
  getQuestion = (id) => {
    getChatBoxQuestion({ id: id }).then((data) => {
      if (data.err_no === 0) {
        this.setState({
          question: data.results.text
        })
      }
    })
  };
  formatAnswer = (answer) => {
    if (answer.split(':')[ 0 ] === 'mp3') {
      return <Button
        onClick={()=>this.getAnswerFile(answer.split(':')[ 1 ])}>点击查看</Button>
    } else {
      return answer
    }
  };
  getAnswerFile = (id) => {
    getAnswerFile({id:id}).then(data=>{
      this.setState({data: data.results})
    })
  };

  render() {
    const { user_interview_list_id, answer, created_at } = this.props.data;
    return (
      <div className='chatLogoContain'>
        <div>时间: {Util.formatTime(created_at)}</div>
        {this.state.question ? <span>Q：{this.state.question}</span> : <Button
          onClick={() => this.getQuestion(user_interview_list_id)}>
          查看问题
        </Button>}
        <div
          className='answer'>A：{this.state.data.text? this.state.data.text:this.formatAnswer(answer)}
        </div>

        {/*{this.state.data.source?<audio src={this.state.data.source}>*/}
          {/*您的浏览器不支持 audio 标签。*/}
        {/*</audio>:''}*/}
      </div>
    )
  }
}