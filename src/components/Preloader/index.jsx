import preloader from "../../assets/image/preloader.svg";
import React from "react";


export default function Preloader() {
    return (
        <div style={
            {display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={preloader} alt="loading"/>
        </div>
    )
}