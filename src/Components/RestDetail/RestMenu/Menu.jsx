import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Css from './Menu.module.css';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';
import MyContext from "../../../Context/Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Menu(props) {
    const Context = useContext(MyContext);
    const [menuData, setMenuData] = useState("");
    const history = useHistory();

    useEffect(() => {
        fetch(`https://foodiezz-api.herokuapp.com/menu/${props.restId}`)
            .then((res) => { return res.json() })
            .then((data) => { return setMenuData(data) });
    }, []);


    function Add(Data) {

        if (Context.isLogin) {
            Context.cartItems(Data);
            toast.success(Data.menu_name + " Added to Cart", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else history.push('/login');
    }

    function menuCards(data) {
        return data.map((data) => {
            return (
                <div key={data.menu_id + "menu"}>
                    <div className={Css.menuCard}>
                        <div className={Css.menuContentContainer}>
                            <span className={Css.imageCo}>
                                <img src={data.menu_image} className={Css.menuItemImg} alt="menuImg" />
                            </span>
                            <span className={Css.detailContainer}>
                                <h3 className={Css.menuName}>{data.menu_name}</h3>
                                <div className={Css.description}>{data.description}</div>
                                <div className={Css.dishType}><i className={Css.dot}><GoPrimitiveDot /></i>{data.menu_type}</div>
                                <div className={Css.pice}>Cost : {data.menu_price} &#8377;</div>
                            </span>
                        </div>

                        <div className={Css.buttonContainer}>
                            <span onClick={() => { Add(data) }} className={Css.Icon} ><FaPlusCircle /></span>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className={Css.menuContainer}>
            <hr />
            <h2 className={Css.mainHeading}>Menu</h2>
            {menuData !== "" && menuCards(menuData)}
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
