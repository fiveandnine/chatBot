import { Form, Input, Button, Row, Col, message, Modal } from 'antd';
import React, { Component } from 'react';
import { editChatboxList } from '../../services/api'

const { TextArea } = Input;
const FormItem = Form.Item;
const success = Modal.success;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

class ChatBoxEdit extends React.Component {
  state = {
    checkNick: false,
  };

  check = (e) => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          this.handleSubmit(e);
        }
      },
    );
  }
  componentDidMount(){
    let commit = this.props.commit;
    if(commit && commit.tags!==''){
      const tagsList = commit.tags.split(',');
      commit.tag1 = tagsList[0];
      commit.tag2 = tagsList[1];
      commit.tag3 = tagsList[2];
      this.props.form.setFieldsValue(commit);
    }

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let _value = {};
        _value.digest = values.digest;
        _value.score = values.score;
        _value.id = this.props.data.id;
        _value.tags = [ values.tag1, values.tag2, values.tag3 ];
        editChatboxList(_value).then(data => {
          if(data.err_no==0){
            success({
              title: '编辑成功',
              // content: 'Some descriptions',
              onOk() {
                window.location.reload();
              }
            });
          }else{
            message.error("编辑失败:"+data.err_msg);
          }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {disabled, closeModule, commit} = this.props;
    return (
      <div>
        <Form>
        <Row>
        <Col span='8'>
          <FormItem  {...formItemLayout} label="评分">
            {getFieldDecorator('score', {
              rules: [ {
                required: true,
                message: '请输入评分',
              } ],
            })(
              <Input type='number' disabled={disabled} placeholder="请输入评分"/>
            )}
          </FormItem>
        </Col>
        </Row>
        <Row>
          <Col span='8'>
            <FormItem {...formItemLayout} label="tag1">
              {getFieldDecorator('tag1', {
                rules: [ {
                  required: true,
                  message: '请输入tag1',
                } ],
              })(
                <Input disabled={disabled} placeholder="请输入tag1"/>
              )}
            </FormItem>
          </Col>
          <Col span='8'>
            <FormItem {...formItemLayout} label="tag2">
              {getFieldDecorator('tag2', {
                rules: [ {
                  required: true,
                  message: '请输入tag2',
                } ],
              })(
                <Input disabled={disabled} placeholder="请输入tag2"/>
              )}
            </FormItem>
          </Col>
          <Col span='8'>
            <FormItem {...formItemLayout} label="tag3">
              {getFieldDecorator('tag3', {
                rules: [ {
                  required: true,
                  message: '请输入tag3',
                } ],
              })(
                <Input disabled={disabled} placeholder="请输入tag3"/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
        <FormItem label="综合描述">
          {getFieldDecorator('digest', {
            rules: [ {
              required: true,
              message: '请输入评价',
            } ],
          })(
            <TextArea disabled={disabled}/>
          )}
        </FormItem>
        </Row>
        {
          disabled ? <Button onClick={closeModule}>关闭</Button>:<FormItem >
            <Button disabled={disabled} type="primary" onClick={this.check}>
              提交
            </Button>
          </FormItem>
        }
        </Form>
      </div>
    );
  }
}

const ChatBoxEditComponent = Form.create()(ChatBoxEdit);
export default ChatBoxEditComponent;