import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import '../defaultModule/defaultModule.css';
import './chatBox.css';
import { Radio } from 'antd';
import Position from '../../../components/Position/Position'
import Resume from '../../../components/Resume/Resume'
import ChatBoxEditComponent
  from '../../../components/EditComonent/ChatBox'
export default class ChatBoxEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: 'cv'
    }
  }

  closeModule = () => {
    ReactDOM.render('', document.getElementById('module-root'));
  };
  preventBackgroundScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (
      (e.deltaY < 0 && target.scrollTop <= 0) ||
      (e.deltaY > 0 && target.scrollHeight - target.clientHeight - target.scrollTop <= 0)
    ) {
      e.stopPropagation();
      e.preventDefault()
    }
  };
  handleLayoutChange = (e) => {
    this.setState({ item: e.target.value });
    if(e.target.value==='log'){
      const url = '/chatbot/backend/#/chatBoxLogo?id='+this.props.data.id;
      const win = window.open(url, '_blank');
      win.focus();
    }
  };

  render() {
    const { resume, position } = this.props.data;
    const { disabled, commit } = this.props;
    return (
      <div>
        <div className="shown"
             onClick={this.closeModule}
             onWheel={this.preventBackgroundScroll}>
        </div>
        <div className='chatBox'>
          <div onClick={this.closeModule}
               className='closeBtn'>关闭
          </div>
          <div className='changeItem'>
            <Radio.Group defaultValue="horizontal"
                         onChange={this.handleLayoutChange}
                         value={this.state.item}>
              <Radio.Button value="cv">简历</Radio.Button>
              <Radio.Button value="jd">JD</Radio.Button>
              <Radio.Button
                value="log">面试log</Radio.Button>
            </Radio.Group>

          </div>
          <div className='viewDetailContain'>
            {this.state.item === 'cv' ?
              <Resume data={resume}/> : ''}
            {this.state.item === 'jd' ?
              <Position data={position}/> : ''}
            {this.state.item === 'log' ?
              <Position data={position}/> : ''}
            {/*{this.state.item === 'logo' ?*/}
              {/*<ChatLogo/> : ''}*/}
          </div>
          <ChatBoxEditComponent closeModule={this.closeModule} disabled={disabled} data={this.props.data} commit={commit}/>
        </div>
      </div>
    )
  }
}