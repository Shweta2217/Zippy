import React from "react";
import { Link } from "react-router-dom";
import Css from "./FilteredRests.module.css";
import { GoPrimitiveDot } from "react-icons/go";
import Rating from "../../Rating/Rating";

export default function FilteredRests(props) {
  function Rest(data) {
    return data.map((restdata) => {
      return (
        <Link
          key={restdata._id}
          to={"/restaurent/" + restdata.restaurant_id}
          className={Css.restLink}
        >
          <div className={Css.restCard}>
            <img
              className={Css.foodImg}
              src={restdata.restaurant_thumb}
              alt="foodImg"
            />
            <span className={Css.detailsCont}>
              <h4 className={Css.restheading}>{restdata.restaurant_name}</h4>
              <span className={Css.restaddress}>{restdata.address}</span>
              <div>
                {restdata.mealTypes.map((meal, index) => {
                  return (
                    <span className={Css.malTypes} key={index + "mealType"}>
                      &nbsp;
                      <GoPrimitiveDot color="green" />
                      {meal.mealtype_name}
                    </span>
                  );
                })}
              </div>
              <p className={Css.restcost}>Cost for two :  &#8377;  {restdata.cost}</p>

              <hr className={Css.HR} />
              <Rating rating={restdata.average_rating} />
            </span>
          </div>
        </Link>
      );
    });
  }

  return (
    <div className={Css.RestContainer}>
      {props !== "" && Rest(props.restsData)}
    </div>
  );
}
