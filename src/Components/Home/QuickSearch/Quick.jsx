import React from 'react';
import Css from './Quick.module.css';
import QuickCard from './Cards/QuickCards';


export default function Quick() {
    return (
        <section id='Quick_Search'>
            <h1 className={Css.quickHeading}>Quick Search</h1>
            <QuickCard />
        </section>
    )
}
