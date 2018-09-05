import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import '../defaultModule/defaultModule.css';
import './oilCouponModule.css'
class OilCouponsModules extends Component{
    constructor(props){
        super(props)
    }

    closeModule = ()=>{
        ReactDOM.render('', document.getElementById('module-root'));
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
    render(){
        return(
            <div >
                <div className="shown"
                     onWheel={ this.preventBackgroundScroll }>
                </div>
                <div className="newLayer">
                    <div className="newLayerBg" onClick={this.closeModule}></div>
                    <div className="newLayerContent">
                        <img className="closeBtn" src="
        assets/img/oilCoupons/close.png" onClick={this.closeModule}/>
                            <div></div>
                            <img className="completeImg" src="assets/img/oilCoupons/Checked.png" />
                                <div>领取成功</div>
                                <button  className="toBtn" onClick={this.toYXC}>去使用</button>
                    </div>
                </div>

            </div>
        )
    }
}
export default OilCouponsModules;