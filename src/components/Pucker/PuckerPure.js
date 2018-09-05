/**
 * Created by xiaolei on 2018/4/9.
 */
import React from 'react';
const Pucker=(props)=> {
    function showMoreRemark(e){
        e.target.style.overflow = e.target.style.overflow === "auto" ? "hidden" : "auto";
        e.target.style.display = e.target.style.display === "block" ? "-webkit-box" : "block"
    }
    const divStyle= {
        borderBottom: "4px solid #ffffff",
        lineHeight: '1.2rem',
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "2"
    };
    return (
        <span style={divStyle} onClick={showMoreRemark}>
                {props.title}{props.text}

            </span>
    );
}
export default Pucker