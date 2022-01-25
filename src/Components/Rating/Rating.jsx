import React from 'react';
import Css from './Rating.module.css'

export default function Rating(props) {
    let Rating = Number(props.rating);
    switch (Rating) {
        case 4.2 || 4.5 || 4 || 3.9 || 3.7:
            return ( 
                <div className={Css.rating}> ⭐⭐⭐⭐ &nbsp;  30+ Votes 

                </div>
            );
        case 3.5 || 3.2:
            return (
                <div className={Css.rating}>⭐⭐⭐ &nbsp;  15+ Votes

                </div>
            );
        case 5:
            return (
                <div className={Css.rating}>⭐⭐⭐⭐⭐ &nbsp;  35+ Votes
                </div>
            );

        case 2.6:
            return (
                <div className={Css.rating}>⭐⭐ &nbsp;  5+ Votes
                </div>
            );

        default:
            return (
                <div className={Css.rating}>  ⭐⭐⭐ &nbsp;  4+ Votes
                    
                </div>
            );

    }

}
