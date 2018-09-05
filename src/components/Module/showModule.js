import ReactDOM from 'react-dom';
import React, {Component} from 'react';
const showModule = (moduleReactDom)=>{
    ReactDOM.render(
        moduleReactDom, document.getElementById('module-root'));
};
export default showModule;