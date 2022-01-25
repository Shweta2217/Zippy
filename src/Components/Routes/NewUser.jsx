import React from 'react';
import {Route, Switch } from "react-router-dom";
import Home from '../Home/Home';
import Filter from '../Filter/FilterPage';
import RestDetail from '../RestDetail/RestDetail';
import Login from '../Login/Login';
import Register from '../Register/Register';


export default function NewUser() {
    return (
        <Switch>
           <Route exact path="/"><Home /></Route>
           <Route exact path="/filter/:mealId"><Filter /></Route>
           <Route exact path="/login"> <Login /></Route>
           <Route exact path="/register"><Register /></Route>
           <Route path="/restaurent/:restId"><RestDetail /></Route>
           <Route  path="*"><><center><h2>Opppsss!</h2></center></></Route> 

        </Switch>
    )
}
