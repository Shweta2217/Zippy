import React, { useEffect, useState } from 'react';
import Css from './QuickCard.module.css';
import { Link } from 'react-router-dom';
import Loader from '../../../Loader/Loader';
import {BsDot} from 'react-icons/bs';

export default function QuickCard() {
   
    let [meals, setMeals] = useState("");

    useEffect(() => {
        fetch("https://foodiezz-api.herokuapp.com/mealtype")
            .then((res) => { return res.json() })
            .then((data) => { return setMeals(data) })
    },[]);


    function Card(mealData) {
        return mealData.map((data,index) => {
            return (
                <span key={index+"mealType"} className={Css.Card}> 
                <Link className={Css.cardLink} to={"/filter/" + data.mealtype_id} >
                    <div  >
                        <img src={data.meal_image} className={Css.cardImg} alt="QuickImage" />
                        <div className={Css.cardBody} >
                            <h4 className={Css.Heading}>{data.mealtype}<span className={Css.dot}><BsDot  /></span></h4>
                            <p className={Css.discription}>{data.content}</p>
                        </div>
                    </div>
                </Link>
                </span>
            )
        })
    }

    return (
        <> 
        {meals !== "" ? <div className={Css.cardContainer} >{Card(meals)}</div> : 
        <Loader />
        }
        </>
    )
}
