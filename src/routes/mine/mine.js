/**
 * Created by xiaolei on 2018/4/19.
 */
import React, {Component} from 'react';
import './mine.css';
import {hashHistory} from 'react-router';
export default class GoodsDetail extends Component{
    constructor(props){
        super(props)
    }
    toFTZ = () =>{
        hashHistory.push('/520')
    }
    render(){
        return(
            <div onClick={this.toFTZ}>mine</div>
        )
    }
}