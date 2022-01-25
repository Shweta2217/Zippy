import React from 'react';
import Css from './Loader.module.css';

export default function Loader() {
    return (      
            <div className={Css.loaderDiv}>
                <img className={Css.loader} src="https://i.ibb.co/58v1LPC/pizza-Loading.gif" alt="Loader" />
            </div>     
    )
}
