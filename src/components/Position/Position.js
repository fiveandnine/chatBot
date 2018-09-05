import React, { Component } from 'react';
import './Position.css';
import { Row, Col } from 'antd';
import Util from '../../util/util';
export default class Position extends Component {
  constructor(props) {
    super(props)
  }

  formatData = (data) => {
    const city = JSON.parse(data);
    let cityStr = '';
    Object.keys(city).map((key) => {
      cityStr += city[ key ] + " "
    });
    return cityStr
  };

  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div>
        <Row>
          <Col span={8}>名称：{data.name}</Col>
          <Col
            span={8}>职位地点：{this.formatData(data.city_ids)}</Col>
          <Col span={8}>公司名称：{data.corporation_name}</Col>

        </Row>
        <Row>
          <Col span={8}>招聘人数：{data.number}</Col>
          <Col span={8}>职位类别：{data.category}</Col>
          <Col span={8}>部门名称：{data.architecture_name}</Col>
        </Row>
        <Row>
          <Col span={8}>是否211/985：{data[ '985_211' ]}</Col>
          <Col
            span={8}>薪资范围：{data.salary_begin}-{data.salary_end}</Col>
          <Col span={8}>原始薪资：{data.salary}</Col>

        </Row>
        <Row>
          <Col span={8}>职位标签：{data.tags}</Col>
          <Col span={8}>偏好项目组：{data.projects}</Col>
          <Col span={8}>偏好技能组：{data.skills}</Col>
        </Row>
        <Row>
          <Col span={8}>偏好公司组：{data.corporations}</Col>
          <Col span={8}>偏好行业组：{data.industries}</Col>
          <Col span={8}>是否有海外经历：{data.is_oversea}</Col>
        </Row>
        <Row>
          <Col span={8}>是否需要管理：{data.is_manager}</Col>
          <Col span={8}>管理规模：{data.subordinate}</Col>
          <Col span={8}>管理年限：{data.manager_years}</Col>
        </Row>
        <div>工作描述：{data.description}</div>
        <Row>
          <Col span={8}>不要的背景候选人偏好：{data.no_background}</Col>
          <Col span={8}>部门描述：{data.department_desc}</Col>
        </Row>
        <div>工作职责：{data.requirement}</div>
        <Row>
          <Col span={8}>传统描述：{data.additional_desc}</Col>

          <Col span={8}>专业：{data.majority}</Col>
          <Col span={8}>偏好学校组：{data.schools}</Col>
        </Row>
        <div>公司地址：{data.address}</div>
        <Row>
          <Col
            span={8}>经验要求：{Util.formatExperience(data.experience_begin,data.experience_end)}</Col>
          <Col span={8}>招聘类型：{Util.formatRecruitType(data.recruit_type)}</Col>
          <Col
            span={8}>职业业态：{data.occupation_commercial_activitie}</Col>
        </Row>
      </div>
    )
  }
}