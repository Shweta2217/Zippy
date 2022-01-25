import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Animation from '../Animation/Animation';
import { FloatingLabel, Form } from 'react-bootstrap';
import Css from './placeOrder.module.css';
import Loader from '../Loader/Loader';
import MyContext from '../../Context/Context';


export default function PlaceOrder() {
    let placeorderUrl = "https://foodiezz-api.herokuapp.com/placeorder";
    const Refrence = useRef();
    const history = useHistory();
    const Context = useContext(MyContext);
    const [msg, setmsg] = useState("")
    const [userData, setUserData] = useState({
        orderId: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        orderedItems: "",
        totalCost: "",
        date: ""
    });
    //--------------------------Total Cost-------------------------------
    let TotalCost = 0;
    useEffect(() => {
        Context.selectedItem.forEach(element => {
            TotalCost += Number(element.menu_price);
        });

        //----------------Current Date---------------------------
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let data = JSON.parse(window.sessionStorage.getItem("UserInfo"));

        let itemArray = [];
        Context.selectedItem.forEach((ele) => {
            itemArray.push(ele.menu_name);
        })
        let Data = {
            orderId: Math.floor(Math.random() * 100000),
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: "",
            orderedItems: itemArray,
            totalCost: TotalCost,
            date: dateTime
        }
        setUserData(Data);

    }, []);

    function handleChange(event) {
        let Address = event.target.value;
        setUserData((prev) => {
            return {
                ...prev,
                address: Address
            }
        });
        setmsg("");
    }
    
    function handleClick() {
        if (userData.address === "") setmsg("Please Enter Your Address !");
        else{
        fetch(placeorderUrl, {
            method: 'POST', headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then((res) => { return res.json(); })
            .then((data) => {
                console.log("Going to payment")
                Refrence.current.submit();
            })
            .catch((err) => { console.log(err); });
        }

    }
    // https://paytm-pament-gateway.herokuapp.com/paynow
    function InputFeilds(userData) {
        return (
            <div className={Css.container}>
                <Animation />
                <div className={Css.detailsContainer}>
                    <form ref={Refrence}
                        action="http://localhost:4100/paynow" method='POST'
                    >

                        <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                            <Form.Control onChange={handleChange} type="text" value={userData.name} name='name' readOnly />
                        </FloatingLabel>

                        <FloatingLabel controlId="email" label="Email" className="mb-3">
                            <Form.Control onChange={handleChange} type="email" value={userData.email} name='email' readOnly />
                        </FloatingLabel>

                        <FloatingLabel controlId="phone" label="Phone Number" className="mb-3">
                            <Form.Control onChange={handleChange} type="text" value={userData.phone} name='phone' readOnly />
                        </FloatingLabel>
                        <span style={{"color":"red"}}>{msg}</span>
                        <FloatingLabel controlId="address" label="Address" className="mb-3">
                            <Form.Control onChange={handleChange} type="text" name='address' value={userData.address} />
                        </FloatingLabel>
                        <Form.Control onChange={handleChange} type="hidden" value={userData.orderId} name='id' readOnly />
                        <Form.Control onChange={handleChange} type="hidden" value={userData.orderedItems} name='rest_name' readOnly />
                        <Form.Control onChange={handleChange} type="hidden" value={userData.totalCost} name='cost' readOnly />
                        <p className={Css.cost}>Total Payable Amount : &#8377; {userData.totalCost}</p>
                    </form>
                    <button onClick={handleClick} className={`btn btn-primary ${Css.Button}`}>Continue</button>
                </div>
            </div>
        );
    }

    return (
        <>
            {userData !== "" ? <>{InputFeilds(userData)}</> : <Loader />}
        </>
    );
}
