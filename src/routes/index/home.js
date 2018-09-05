import React, { Component } from 'react';
import './index.css';
import TimeOut from '../../components/TimeOut/TimeOut';
import showModule from '../../components/Module/showModule';
import { getChatbotList } from '../../services/api';
import ChatBoxEdit
  from '../../components/Module/ChatBoxEdit/ChatBoxEdit'
import {
  Table,
  Divider,
  Button,
  message,
  Modal,
  Pagination
} from 'antd';
import {
  editChatboxListDetail,
  viewSubmitDetail,
  handlerSubmitPublic
} from '../../services/api'
import { hashHistory } from 'react-router'
import Util from '../../util/util'
const success = Modal.success;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatBoxList: [],
      columns: [
        {
          title: '倒计时',
          dataIndex: 'defaultTime',
          key: 'defaultTime',
          render: defaultTime => defaultTime.is_published || defaultTime.is_perusal ? '-' :
            <TimeOut
              beginTime={defaultTime.time}/>,
        }, {
          title: 'jd_name',
          dataIndex: 'jdName',
          key: 'jdName',
        }, {
          title: 'cv_name',
          dataIndex: 'cvName',
          key: 'cvName',
        }, {
          title: 'cv_company',
          dataIndex: 'cvCompany',
          key: 'cvCompany',
        }, {
          title: '处理时间',
          dataIndex: 'actionTime',
          key: 'actionTime',
          render: (time)=>Util.formatTime(time)
        }, {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          render: (status) => (<span>
          {status.is_published ?
            <span>已发布</span> : (status.is_perusal ?
              <span>已批阅</span> : <span>未批阅</span>)
          }
          </span>
          )
        }, {
          title: '操作',
          key: 'action',
          render: (status) => this.actionRender(status),
        }
      ],
      page: parseInt(this.props.location.query.page) || 1,
      pageSize: parseInt(this.props.location.query.pageSize) || 10,
      total: 10
    }
  }

  actionRender = (status) => {
    let buttonStatus;
    return (
      <span>
      <Button disabled={!status.status.is_perusal}
              onClick={() => this.handlerView(status.action.data)}>查看</Button>
      <Divider type="vertical"/>
      <Button disabled={status.status.is_published}
              onClick={() => this.handlerPersual(status.action.data)}>编辑</Button>
      <Divider type="vertical"/>
      <Button
        disabled={!(status.status.is_perusal && !status.status.is_published)}
        onClick={() => this.handlerSubmit(status)}>发布</Button>
    </span>
    )
  };
  handlerSubmit = (data) => {
    handlerSubmitPublic({ id: data.status.data.id }).then(data => {
      console.log(data);
      if (data.err_no === 0) {
        success({
          title: '发布成功',
          onOk() {
            window.location.reload();
          },
        });
      } else {
        message.error(data.err_msg)
      }
    })
  }
  formatData = (data) => {
    if (data instanceof Array) {
      return data.map(function (item) {
        let _item = {};
        _item.key = item.id;
        _item.defaultTime = {
          time: item.created_at,
          is_published: item.is_published,
          is_perusal: item.is_perusal
        };
        _item.jdName = item.position.name;
        _item.cvName = item.resume.basic.name;
        _item.cvCompany = item.resume.basic.corporation_name;
        _item.actionTime = item.created_at;
        _item.status = {
          is_perusal: item.is_perusal,
          is_published: item.is_published,
          data: item
        };
        _item.action = _item.status;
        return _item;
      });
    } else {
      return []
    }

  };
  handlerPersual = (data) => {
    editChatboxListDetail({ id: data.id }).then(res => {
      let commit = {};
      if (res.err_no == 0) {
        commit.digest = res.results.digest;
        commit.tags = res.results.tags;
        commit.score = res.results.score;
        showModule(<ChatBoxEdit data={data}
                                commit={commit}/>);
      } else {
        message.error(res.err_msg)
      }
    })
  };
  handlerView = (data) => {
    viewSubmitDetail({ id: data.id }).then(res => {
      let commit = {};
      if (res.err_no == 0) {
        commit.digest = res.results.digest;
        commit.tags = res.results.tags;
        commit.score = res.results.score;
        showModule(<ChatBoxEdit data={data} disabled
                                commit={commit}/>);
      } else {
        message.error(res.err_msg)
      }
    })
  };

  componentDidMount() {
    console.log(this.props.location.query);
    this.getPageList(this.props.location.query.page)
  }

  getPageList = (pageNo) => {
    getChatbotList({
      pagesize: 10,
      page: pageNo
    }).then(data => {
      this.setState({
        chatBoxList: this.formatData(data.results.list),
        pageSize: data.results.pagesize,
        page: data.results.page,
        total: data.results.total
      });
    });
  };
  changePage = (page, pageSize) => {
    // console.log(page, pageSize);
    this.getPageList(page);
    hashHistory.push({
      pathname: '/',
      query: {
        page: page,
        pageSize: pageSize
      }
    })
  };

  render() {
    return (
      <div>
        <Table columns={this.state.columns}
               dataSource={this.state.chatBoxList}
               pagination={false}/>
        <div className='pagination'>
          <Pagination current={this.state.page || 1}
                      pageSize={this.state.pageSize}
                      total={this.state.total}
                      onChange={this.changePage}/>
        </div>
      </div>
    )
  }
}