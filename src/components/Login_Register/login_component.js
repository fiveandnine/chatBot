import React, {
    Component
} from 'react';
import './index.css';
import util from '../../../src/util/util';
import {
    hashHistory
} from 'react-router';
import ReactDOM from 'react-dom';
import Module from '../Module/Module'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isFirst: false,
            verifyCode: ''
        }
    }

    componentDidMount() {
        document.title = "易修猫商户管理平台";
        this.getVerify();
        this.setState({userName: localStorage.getItem('userName') || ''})
    }

    getVerify = () => {
        util.save('/getCaptcha', {}, (res) => {
            this.setState({
                pictureUuid: res.pictureUuid,
                verifyBase64: res.verifyBase64
            })
        })
    }
    submit = () => {
        if (this.state.verifyCode == '') {
            ReactDOM.render(<Module title='请输入验证码' type="0"
                                    isHide="true"
                                    time="2000"/>, document.getElementById('module-root'));
            return false;
        }
        if (this.state.userName == '' || this.state.password == '') {
            ReactDOM.render(<Module title='请输入用户名和密码'
                                    type="0" isHide="true"
                                    time="2000"/>, document.getElementById('module-root'));
            return false;
        }
        util.save('/user/userLogin', {
            "password": this.state.password,
            "pictureUuid": this.state.pictureUuid,
            "userName": this.state.userName,
            "verifyCode": this.state.verifyCode
        }, (res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('userId', res.userId);
            localStorage.setItem('status', res.status);
            localStorage.setItem('userName', this.state.userName);
            switch (res.code) {
                case '0':
                    if (this.state.password == '123456') {
                        hashHistory.push({
                            pathname: '/modify',
                            query: {
                                isFirst: true
                            }
                        });
                    } else {
                        hashHistory.push({
                            pathname: '/home',
                            query: {
                                tabNo: 1,
                                prePage: "login"
                            }
                        });
                    }
                    break;
                default:
                    ReactDOM.render(<Module type="0"
                                            time="2000"
                                            isHide="true"
                                            title={res.msg}/>, document.getElementById('module-root'));
                    break;
            }
        })
    }
    getInputValue = (event) => {
        util.getInputValue(event, this)
    }
    toRegister = ()=>{
        hashHistory.push({
            pathname: '/changePassword'
        });
    }
    render() {
        return (
            <div>
                <div>
                    <img className="login_img" alt="login"
                         src="./assets/img/login.png"/>
                </div>
                <div className="login">
                    <div className="loginRow">
                        <div className="loginTxt">账号</div>
                        <input
                            className="userInput"
                            type="text"
                            name="userName"
                            placeholder="请输入用户名"
                            value={this.state.userName}
                            onChange={this.getInputValue}/>
                    </div>
                    <div className="loginRow">
                        <div className="loginTxt">密码</div>
                        <input type="password"
                               name="password"
                               placeholder="请输入密码"
                               className="userInput"
                               onChange={this.getInputValue}/>
                    </div>
                    <div className="loginRow verfiyDiv">
                        <div className="loginTxt">验证码</div>
                        <input type="number"
                               name="verifyCode"
                               placeholder="请输入验证码"
                               className="userInput YZMInput"
                               onChange={this.getInputValue}/>
                        <img onClick={this.getVerify}
                             alt="getPicCode"
                             src={this.state.verifyBase64}/>
                    </div>

                    <button onClick={this.submit}
                            className="loginBtn">确定
                    </button>
                    <div className="toRegister"
                         onClick={this.toRegister}>忘记密码
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;