/**
 * Created by xiaolei on 2018/4/20.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import Loading from './Module_Loading';
const LoadingFun=(flag=true)=>{
    if (flag){
        ReactDOM.render(
            <Loading/>, document.getElementById('module-root'));
    }else {
        ReactDOM.render(
            '', document.getElementById('module-root'));
    }

}

export default LoadingFun;
