import React from 'react';
import './index.css';
import GetPhoneCodeBtn from '../../components/getPhoneCodeBtn/getPhoneCodeBtn';
import util from '../../../src/util/util';
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            verificationCode: '',
            personName: '',
            merchantName: '',
            address: '',
            scope: ''
        };
    }

    getInputValue = (e) => {
        util.getInputValue(e,this);
    }
    submit = ()=>{
        // let flag = util.validate(19818818181, 'phoneNumber');
        util.save('',{

        })
    }
    render() {
        return (
            <div className="register">
                <div>

                    <input
                    type="number" name='phoneNumber'
                    placeholder="请输入手机号码"
                    onChange={this.getInputValue} value={this.state.phoneNumber}/>
                </div>
                <div>

                    <input
                    type="number" name="verificationCode"
                    placeholder="请输入验证码"
                    onChange={this.getInputValue} value={this.state.verificationCode}/>
                    <GetPhoneCodeBtn />
                </div>
                <div>

                    <input
                    type="text" name="personName"
                    placeholder="请输入联系人姓名"
                    value={this.state.personName}
                    onChange={this.getInputValue}/>
                </div>
                <div>

                    <input
                    type="text" name="merchantName"
                    placeholder="请输入商户名称"
                    value={this.state.merchantName}
                    onChange={this.getInputValue}/>
                </div>
                <div>

                    <input
                    type="text" name="address"
                    placeholder="请输入商户地址"
                    value={this.state.address}
                    onChange={this.getInputValue}/>
                </div>
                <div>

                    <input
                    type="text" name="scope"
                    placeholder="请输入主营范围"
                    value={this.state.scope}
                    onChange={this.getInputValue}/>
                </div>
                <button onClick={this.submit}>立即申请</button>
            </div>
        );
    }
}