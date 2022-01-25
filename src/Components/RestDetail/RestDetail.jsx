import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Css from './RestDetail.module.css';
import Loader from '../Loader/Loader';
import Menu from './RestMenu/Menu';
import RestaurentDetail from './Restaurent/RestaurentStuff';

export default function RestDetail() {
    const { restId } = useParams();
    const [restData, setRestData] = useState("");

    useEffect(() => {
        fetch(`https://foodiezz-api.herokuapp.com/restdetail/${restId}`)
            .then((res) => { return res.json() })
            .then((data) => {
                return setRestData(data)
            })

    }, []);

    return (
        <div className={Css.restDetailContainer}>
            {restData !== "" ?
                <>
                    < RestaurentDetail restData={restData} />
                    <Menu restId={restId}/>
                </> :
                <Loader />}
        </div>
    )
}
