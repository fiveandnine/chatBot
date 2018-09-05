import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import '../defaultModule/defaultModule.css';
import './Module520.css'
export default class FTZModule extends Component{
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
                <div className="moduleBody520">
                    {/*{this.props.bodyText && this.props.bodyText.map((item,key) =>{*/}
                        {/*return<div className={`module${key}`} key={key}>{item}</div>*/}
                    {/*})}*/}
                    <div dangerouslySetInnerHTML={{__html: this.props.bodyText}}></div>
                    {this.props.btnTitle ?  <div className="btnBody520">
                        <button onClick={()=>this.props.btnfun()}>{this.props.btnTitle}</button>
                    </div> : <div className="btnBody520">
                            <button onClick={this.closeModule}>确定</button>
                        </div>}
                    <img onClick={this.closeModule} className="close520" alt="x" src="assets/img/520/x.png"/>
                </div>

            </div>
        )
    }
}