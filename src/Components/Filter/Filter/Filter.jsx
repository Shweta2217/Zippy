import React from 'react';
import Css from './Filter.module.css';

export default function Filter(props) {
    function onclk(event) {
        let Url;
        let lcost, hcost;
        if (event.target.name === "cost") {
            let cost = event.target.value;

            if (cost === "") {
                Url = "https://foodiezz-api.herokuapp.com/quickRest/" + props.mealId;

            } else {
                if (cost == 300) {
                    hcost = Number(cost);
                    Url = "https://foodiezz-api.herokuapp.com/quickRest/" + props.mealId + "?hcost=" + hcost;
                }
                else if (cost == 1000) {
                    lcost = Number(cost);
                    Url = "https://foodiezz-api.herokuapp.com/quickRest/" + props.mealId + "?lcost=" + lcost;
                }
                else {
                    cost = cost.split('-');
                    lcost = Number(cost[0]);
                    hcost = Number(cost[1]);
                    Url = "https://foodiezz-api.herokuapp.com/quickRest/" + props.mealId + "?lcost=" + lcost + "&&hcost=" + hcost;
                }

            }
        } else if (event.target.name === "Cuisine") {
            const cuisineID = event.target.value;
            Url = "https://foodiezz-api.herokuapp.com/quickRest/" + props.mealId + "?cuisineId=" + cuisineID;
        }
        fetch(Url)
            .then((res) => { return res.json() })
            .then((data) => { return props.restDataSetter(data); });

    }

    return (
        <div className={Css.filter}>
            <div className={Css.filterContainer}>
                <div className={Css.cuisineContainer}>
                    <h4 className={Css.filterHeading}>Choose Cuisine</h4>

                    <div className={Css.itemContainer}>
                        <input type="radio" value="1" name="Cuisine" onChange={onclk} />
                        <span className={Css.itemName}>North Indian</span>
                    </div>

                    <div className={Css.itemContainer}>
                        <input type="radio" value="2" name="Cuisine" onChange={onclk} id="South_Indian" />
                        <span className={Css.itemName}>South Indian</span>
                    </div>

                    <div className={Css.itemContainer}>
                        <input type="radio" value="3" name="Cuisine" onChange={onclk} id="Chinese" />
                        <span className={Css.itemName}>Chinese</span>
                    </div> 

                    <div className={Css.itemContainer}>
                        <input type="radio" value="4" name="Cuisine" onChange={onclk} id="Fast_Food" />
                        <span className={Css.itemName}>Fast Food</span>
                    </div>

                    <div className={Css.itemContainer}>
                        <input type="radio" value="5" name="Cuisine" onChange={onclk} id="Chinese" />
                        <span className={Css.itemName}>Street Food</span>
                    </div>
                </div>

                <div className={Css.CostContainer}>
                    <h4 className={Css.filterHeading}>Cost</h4>
                    <div className={Css.CostItemContainer}>

                        <div className={Css.itemContainer}>
                            <input type="radio" name="cost" value="" onChange={onclk} />
                            <span className={Css.itemName}>All</span>
                        </div>

                        <div className={Css.itemContainer}>
                            <input type="radio" name="cost" value="300" onChange={onclk} />
                            <span className={Css.itemName}>Less than 300</span>
                        </div>

                        <div className={Css.itemContainer}>
                            <input type="radio" name="cost" value="300-699" onChange={onclk} />
                            <span className={Css.itemName}>300-699</span>
                        </div>

                        <div className={Css.itemContainer}>
                            <input type="radio" name="cost" value="700-1000" onChange={onclk} />
                            <span className={Css.itemName}>700-1000</span>
                        </div>

                        <div className={Css.itemContainer}>
                            <input type="radio" name="cost" value="1000" onChange={onclk} />
                            <span className={Css.itemName}>1000 +</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
