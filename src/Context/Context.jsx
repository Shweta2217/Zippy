import React, { useState, createContext, useEffect } from 'react';
const MyContext = createContext();
export default MyContext;

//Context Wrapper
export function Wrapper(props) {
    // _______________________________States_______________________________
    let localCart = JSON.parse(window.localStorage.getItem("CartItems"));
    const [selectedItem, SetItem] = useState(localCart);//Cart Items

    let LocalToken = window.localStorage.getItem("Token");
    const [Token, setToken] = useState(LocalToken);//Token

    let counter ;
    let localCartItems = JSON.parse(window.localStorage.getItem("CartItems"));
    if (localCartItems === null || localCartItems === undefined) {
        counter = 0;
    }else{
    counter = localCartItems.length;
}
    const [cartCount, setCount] = useState(counter); //Cart Item Count

    //_______________________________Functions______________________________


    //Recieving Token from Login Page And setting the token into Local Storage
    function SetContextToken(token) {
        setToken(token);
        window.localStorage.setItem("Token", token);
    }

    //Setting the IsLogin Based on Token
    let isLogin;
    if (Token === null || Token === undefined) isLogin = false;
    else isLogin = true;


    //Setting Cart Items By receiving item from Menu
    function cartItems(item) {
        let CartArray = [item];
        let newCartItems;
        let OldCartItems = JSON.parse(window.localStorage.getItem("CartItems"));
        if (OldCartItems === null || OldCartItems === undefined)
            newCartItems = CartArray;
        else
            newCartItems = OldCartItems.concat(CartArray);
        window.localStorage.setItem("CartItems", JSON.stringify(newCartItems));
        SetItem(JSON.parse(window.localStorage.getItem("CartItems")));
        setCount(cartCount + 1);
    }

    //Deleting Cart Items By Receiving index No. from Cart 
    function deleteCartItem(index) {
        let CartItems = JSON.parse(window.localStorage.getItem("CartItems"));
        let newCartItems = CartItems.filter((items, Index) => {
            return Index !== index;
        });
        if (newCartItems.length >= 1) {
            window.localStorage.setItem("CartItems", JSON.stringify(newCartItems));
            SetItem(newCartItems);
            setCount(cartCount - 1);
        }
        else {
            window.localStorage.setItem("CartItems", JSON.stringify(null));
            SetItem(null);
            setCount(0);
        }
    }

    //Clearing Local & Session Storage On Logout()
    function logOut() {
        window.localStorage.removeItem("Token");
        window.localStorage.removeItem("CartItems");
        window.sessionStorage.removeItem("UserInfo");
        SetItem(null)
        setToken(null);
    }

    return (
        <MyContext.Provider value={{ SetContextToken, isLogin, logOut, cartItems, selectedItem, deleteCartItem, cartCount }}>
            {props.children}
        </MyContext.Provider>
    );
}
