import React, { useContext } from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import NewUser from './Routes/NewUser';
import LoggedUser from './Routes/LoggedUser';
import { BrowserRouter } from 'react-router-dom';
import MyContext from '../Context/Context';

export default function Layout(props) {
    const Context = useContext(MyContext);
    return (
        <BrowserRouter>
            <Header />
            {Context.isLogin ? <LoggedUser /> : <NewUser />}
            <Footer />
        </BrowserRouter>
    );
}
