import React, { useState, createContext, useEffect } from 'react';
const MyContext = createContext();
export default MyContext;

//Context Wrapper
export function Wrapper(props) {
    let localCart = JSON.parse(window.localStorage.getItem("CartItems"));
    const [selectedItem, SetItem] = useState(localCart);
    
    let LocalToken = window.localStorage.getItem("Token");
    const [Token, setToken] = useState(LocalToken);
    let isLogin;

    function SetContextToken(token) {
        setToken(token);
        window.localStorage.setItem("Token", token);
    }

    if (Token === null || Token === undefined) isLogin = false;
    else isLogin = true;

    function logOut() {
        window.localStorage.removeItem("Token");
        window.localStorage.removeItem("CartItems");
        window.sessionStorage.removeItem("UserInfo");
        SetItem(null)
        setToken(null);
    }

    function cartItems(item) {
        let CartArray = [item];       
        let newCartItems;  
        let OldCartItems = JSON.parse(window.localStorage.getItem("CartItems"));
        if (OldCartItems === null || OldCartItems === undefined) 
        newCartItems = CartArray ;
        else
         newCartItems = OldCartItems.concat(CartArray);
        window.localStorage.setItem("CartItems", JSON.stringify(newCartItems));
        SetItem(JSON.parse(window.localStorage.getItem("CartItems")));
    }
    
    function deleteCartItem(index) {        
        let CartItems = JSON.parse(window.localStorage.getItem("CartItems"));
        let newCartItems =  CartItems.filter((items,Index)=>{
            return Index !== index;
        }); 
        if (newCartItems.length >= 1) {
            window.localStorage.setItem("CartItems", JSON.stringify(newCartItems));
            SetItem(newCartItems);          
        }
        else{
            window.localStorage.setItem("CartItems", JSON.stringify(null));
            SetItem(null);  
        }
    }

    return (
        <MyContext.Provider value={{ SetContextToken, isLogin, logOut, cartItems, selectedItem, deleteCartItem}}>
            {props.children}
        </MyContext.Provider>
    );
}
