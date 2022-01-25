import React from 'react'
import Css from './Home.module.css';
import Select from './Select/Select';
import QuickSearch from './QuickSearch/Quick';
import Animation from '../Animation/Animation';

export default function Home() {
    return (
        <div >
            <div className={Css.homeSection}>

                <Animation />

                <h1 className={Css.mainHeading} >All your Favrouite Places are Here. Enjoy Delicious Food Anytime, Anywhere</h1>

                <Select />

            </div>

            <QuickSearch />

        </div>
    )
}
