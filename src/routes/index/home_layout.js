/**
 * Created by xiaolei on 2018/4/19.
 */
import React,{Component} from 'react';
import './index.css'
export default class Home_layout extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='home_contain'>
                <div className='home_title'><h1>Chatbot人工操作后台</h1></div>
                <div>{this.props.children}</div>
            </div>

        )
    }
}