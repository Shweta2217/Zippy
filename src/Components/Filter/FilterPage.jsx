import React,{useEffect,useState} from 'react';
import Css from './FilterPage.module.css';
import { useParams } from 'react-router-dom';
import Filter from './Filter/Filter';
import FilteredRests from './FilteredRest/FilteredRests';
import Loader from '../Loader/Loader';


export default function FilterPage() {
    const {mealId} = useParams();
    const [quickRest, setQuickRest] = useState("");

    function restDataSetter(data) {
        setQuickRest(data)
    }
    
    useEffect( ()=>{
        fetch("https://foodiezz-api.herokuapp.com/quickRest/"+mealId)
        .then((res)=>{return res.json()})
        .then((data)=>{return setQuickRest(data);});

    },[]);
    
    return (
        <>
        {quickRest !== "" ?   <div className={Css.Container} >
            <Filter mealId={mealId} restDataSetter={restDataSetter}/><FilteredRests restsData={quickRest} />
            </div> : 
       <Loader />}      
        </>
    )
}
