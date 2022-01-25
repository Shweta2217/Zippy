import React, { useEffect, useState } from 'react';
import Css from './Select.module.css';
import { useHistory } from 'react-router-dom';

export default function Select() {
    const [location, setLocation] = useState("");
    const [rest, setRest] = useState("");
    const usehistory = useHistory();
    const LocationUrl = "https://foodiezz-api.herokuapp.com/location";
    const restUrl= "https://foodiezz-api.herokuapp.com/restaurents?stateId=";
    useEffect(() => {

        fetch(LocationUrl)
            .then(response => response.json())
            .then(data => setLocation(data));
   
    }, []);

    function onSelectLocation(event) {        
       const stateID=(event.target.value);

       fetch(`${restUrl}${stateID}`)
       .then(response => response.json())
       .then(data => setRest(data))
       
    }
    
    function fillData1(locationData) {
        return locationData.map((data, index) =>{
            return (
                <option key={`${index}location`} value={data.state_id}>{data.state}</option>
            )
        });
     }

    function fillData2(restData) {
        return restData.map( (data, index)=>{
            return (
                <option key={`${index}rest`} value={data.restaurant_id}>{data.restaurant_name}</option>
            )
        })
    }
    function onSelectRest(event) {
        const restID=(event.target.value);
        usehistory.push(`/restaurent/${restID}`);
    }

    return (
        <div className={Css.searchRestaurents}>

            <select onChange={onSelectLocation} name="Location" id="Location" className={`${Css.location} ${Css.select}`}>
                <option >----Select-Location---</option>
                {location !=="" && fillData1(location)}
            </select>

            <select onChange={onSelectRest} name="Restaurent" id="Restaurent" className={`${Css.resta} ${Css.select}`}>
                <option >---Select-Restaurent------</option>
                {rest !=="" && fillData2(rest)}

            </select>
        </div>

    )
}
