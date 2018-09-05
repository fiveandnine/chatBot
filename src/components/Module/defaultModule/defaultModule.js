import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom'
import './defaultModule.css';
class Module extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: '',
            isShow: true,
            moduleType: '0'
        }
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.timer = undefined;
    }

    componentDidMount() {
        const {isHide, time, type} = this.props;
        this.setState({
            moduleType: type
        });
        if (isHide) {
            this.timer = setTimeout(() => {
                // this.changeLoadingState({ isHide: isHide });
                this.props.callBackFun && this.props.callBackFun();
                ReactDOM.render('', document.getElementById('module-root'));
            }, time);
        }
    }

    preventBackgroundScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        const target = e.currentTarget
        if (
            (e.deltaY < 0 && target.scrollTop <= 0) ||
            (e.deltaY > 0 && target.scrollHeight - target.clientHeight - target.scrollTop <= 0)
        ) {
            e.stopPropagation();
            e.preventDefault()
        }
    }
    confirmFun = () => {
        this.props.confirmFun && this.props.confirmFun();
        ReactDOM.render('', document.getElementById('module-root'));
    }
    cancelFun = () => {
        this.props.cancelFun && this.props.cancelFun();
        ReactDOM.render('', document.getElementById('module-root'));
    }

    render() {
        return (
            <div>
                <div
                    className="shown"
                    onWheel={ this.preventBackgroundScroll }>
                </div>
                <div
                    className={this.state.moduleType == '0' ? 'moduleBtn_0' : 'hidden'}>
                    <div>{this.props.title}</div>
                </div>
                <div
                    className={this.state.moduleType == '1' ? 'moduleBtn_1' : 'hidden'}>
                    <div
                        className="moduleBtn_1_div">{this.props.title}</div>
                    {this.props.body?<div className="moduleBody" dangerouslySetInnerHTML={{__html: this.props.body}} />: ""}

                    <button onClick={this.confirmFun}>确定
                    </button>


                </div>
                <div className={this.state.moduleType == '2' ? 'moduleBtn_2' : 'hidden'}>
                    <div>{this.props.title}</div>
                        <button
                            className='moduleBtn2_button1'
                            onClick={this.cancelFun}>取消
                        </button>
                        <button className='moduleBtn2_button2' onClick={this.confirmFun}>确定
                        </button>
                </div>
            </div>
        );
    }
}
function showModule(title, body, isHide,type,confirmFun,cancelFun) {
    ReactDOM.render(
        <Module title={title} body={body} isHide={isHide} type={type} confirmFun={confirmFun} cancelFun={cancelFun}/>, document.getElementById('module-root'));
}
export default showModule;
//type :012
//