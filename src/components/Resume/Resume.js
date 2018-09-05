import React, { Component } from 'react';
import './Resume.css';
import { Col, Row } from 'antd';
import Util from '../../util/util'
export default class Resume extends Component {
  constructor(props) {
    super(props)
  }

  formatTime = (begin, end, flag) => {
    console.log(begin, end, flag,flag==='Y')
    if (flag==='Y') {
      return begin + '-至今'
    } else {
      return begin + '-' + end
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <div>
          <div className='title'>基本信息</div>
          <Row>
            <Col span={8}>姓名：{data.basic.name}</Col>
            <Col span={8}>兴趣爱好：{data.basic.interests}</Col>
            <Col
              span={8}>自我描述：{data.basic.self_remark}</Col>
          </Row>
          <Row>
            <Col
              span={8}>期望工作性质：{data.basic.expect_type}</Col>
            <Col
              span={8}>期望从事职业：{data.basic.expect_position_name}</Col>
            <Col
              span={8}>期望从事行业：{data.basic.expect_industry_name}</Col>
          </Row>
          <Row>
            <Col
              span={24}>自我描述：{data.basic.self_remark}</Col>
          </Row>
        </div>
        <div>
          <div className='title'>工作经验</div>
          {
            Object.keys(data.work).map((key) => {
              return (
                <div key={key}>
                  <Row>
                    <Col span={8}>公司名称：{data.work[ key ].corporation_name}</Col>
                    <Col span={8}>工作时间：{this.formatTime(data.work[ key ].start_time, data.work[ key ].end_time, data.work[ key ].so_far)}</Col>
                    <Col span={8}>行业名称：{data.work[ key ].industry_name}</Col>
                  </Row>
                  <Row>
                    <Col span={8}>公司类型：{data.work[ key ].corporation_type}</Col>
                    <Col span={8}>公司规模：{data.work[ key ].scale}</Col>
                    <Col span={8}>公司描述：{data.work[ key ].corporation_desc}</Col>
                  </Row>
                  <Row>
                    <Col span={8}>所属部门：{data.work[ key ].architecture_name}</Col>
                    <Col span={8}>岗位类别：{data.work[ key ].station_name}</Col>
                    <Col span={8}>职位名称：{data.work[ key ].position_name}</Col>
                  </Row>
                  <Row>
                    <Col span={8}>职责：{data.work[ key ].responsibilities}</Col>
                    <Col span={8}>下属人数：{data.work[ key ].subordinates_count}</Col>
                    <Col span={8}>管理经验：{data.work[ key ].management_experience}</Col>
                  </Row>
                </div>
              )
            })
          }
        </div>
        <div>
          <div className='title'>教育经验</div>
          {
            Object.keys(data.education).map((key) => {
              return (
                <Row key={key} className='detailsContain'>
                  <Col span={6}>学校名称：{data.education[ key ].school_name}</Col>
                  <Col span={6}>学历：{Util.formatDegree(data.education[ key ].degree)}</Col>
                  <Col span={6}>专业名称：{data.education[ key ].discipline_name}</Col>
                  <Col span={6}>是否统招：{data.education[ key ].is_entrance}</Col>
                </Row>
              )
            })
          }
        </div>
        <div>
          <div className='title'>项目经验</div>
          {
            Object.keys(data.project).map((key) => {
              return (
                <span key={key}>
                  <span>项目名称：{data.project[ key ].name}</span>
                  <span>项目成就：{data.project[ key ].achivement}</span>
                  <span>项目描述：{data.project[ key ].describe}</span>
                </span>
              )
            })
          }
        </div>
        <div>
          <div className='title'>证书</div>
          {
            Object.keys(data.certificate).map((key) => {
              return (
                <span key={key}>
                  <span>证书名字：{data.certificate[ key ].name}</span>
                  <span>证书描述：{data.certificate[ key ].description}</span>
                </span>
              )
            })
          }
        </div>
        <div>
          <div className='title'>培训经历</div>
          {
            Object.keys(data.training).map((key) => {
              return (
                <span key={key}>
                  <span>培训名称：{data.training[ key ].name}</span>
                  <span>培训描述：{data.training[ key ].description}</span>                      <span>培训证书：{data.training[ key ].certificate}</span>
                </span>
              )
            })
          }
        </div>
        <div>
          <div className='title'>技能</div>
          {
            Object.keys(data.training).map((key) => {
              return (
                <span key={key}>
                  <span>技能名称：{data.training[ key ].name}</span>
                  <span>技能等级：{data.training[ key ].level}</span>
                </span>
              )
            })
          }
        </div>
      </div>
    )
  }
}