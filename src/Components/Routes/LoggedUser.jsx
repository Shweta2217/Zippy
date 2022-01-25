import React from 'react';
import {Route, Switch } from "react-router-dom";
import Home from '../Home/Home';
import Filter from '../Filter/FilterPage';
import RestDetail from '../RestDetail/RestDetail';
import Cart from '../Cart/Cart';
import Profile from '../Profile/UserProfile';
import PlaceOrder from '../PlaceOrder/placeOrder';
import OrderHistory from '../OrderHistory/viewBooking';

export default function LoggedUser() {
  return (
    <Switch> <Route exact path="/"><Home /></Route>
    <Route exact path="/filter/:mealId"><Filter /></Route>
    <Route path="/restaurent/:restId"><RestDetail /></Route>
    <Route path="/profile" ><Profile /></Route>
    <Route path="/cart" ><Cart /></Route>
    <Route path="/placeorder" ><PlaceOrder /></Route>
    <Route path="/viewBooking" ><OrderHistory /></Route>
    <Route  path="*"><><center><h2>Opppsss!</h2></center></></Route> 
    </Switch>
  )
}
