import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MyContext from '../../Context/Context';
import Loader from '../Loader/Loader';
import { GoPrimitiveDot } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import Css from './Cart.module.css';
import { BsCartXFill } from 'react-icons/bs';
import {Button} from 'react-bootstrap'


export default function Cart() {
    const History = useHistory();
    const [items, setItems] = useState(null);
    const Context = useContext(MyContext);
    useEffect(() => {
        setItems(Context.selectedItem);
    }, [Context.selectedItem]);

    function deleteCartItem(index) {
        Context.deleteCartItem(index);
    }

    function handleClick(event) {
        History.push('/')
    }

    function CartItems(Items) {
        return Items.map((items, index) => {
            return (
                <div className={Css.Card} key={index + "s"}>
                    <img className={Css.dishImg} src={items.menu_image} alt="Dish Image" />
                    <div className={Css.dishDescription}>
                        <h5 className={Css.dishName}>{items.menu_name}</h5>
                        <div className={Css.dishPrice}>Cost : &#8377; {items.menu_price} </div>
                        <div className={Css.dishType}><i className={Css.dot}><GoPrimitiveDot /></i>{items.menu_type}</div>
                        <div className={Css.deleteContainer}>
                            <i onClick={() => { deleteCartItem(index) }} className={Css.delete}><MdDelete /></i>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <>
            {items !== null ?
                <>
                    <h1 className={Css.mainHeading}>Cart Items </h1>
                    <div className={Css.CardContainer}>
                    {CartItems(items)}
                    </div>
                    <div className={Css.Div}>
                        <button className={`btn btn-primary ${Css.orderBtn}`}><Link className={Css.btnLink} to='/placeorder'>Place Order</Link></button>
                    </div>
                </>
                :
                <div className={Css.emptyContainer}>
                    <center>
                        <div className={Css.emptyIcon}><BsCartXFill />&nbsp;</div>
                        <h1>
                            Cart is Empty !
                        </h1>
                        <button onClick={handleClick} className={Css.btn}>Browse Restaurents</button>
                    </center>
                </div>
            }
        </>
    )
}
