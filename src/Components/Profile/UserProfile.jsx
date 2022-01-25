import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button, Table } from 'react-bootstrap';
import Css from './profile.module.css';
import MyContext from '../../Context/Context';
import {AiOutlineLogout} from 'react-icons/ai';
import Loader from '../Loader/Loader';

export default function UserProfile() {
    const Context = useContext(MyContext);
    const history = useHistory();
    const [userData, setUserData] = useState("");    
    let localData = JSON.parse(window.sessionStorage.getItem("UserInfo")); 
    useEffect(() => {            
        setUserData(JSON.parse(window.sessionStorage.getItem("UserInfo")));      
    },[]);
   
    function handleClick(event){
        Context.logOut();
        history.push('/');
    }
    function displayData(data) {
        return <div className={Css.container}>

        <Card>
            <Card.Header><h1 className={Css.nameHeading}>Hello {data.name} !</h1> </Card.Header>
            <Card.Body>
                <Card.Title> <h3>Personal Informations</h3> </Card.Title>
                <br />
                <Card.Text>
                    <Table striped bordered hover>                           
                        <tbody>
                            <tr>
                                <td>Email</td>
                                <td>{data.email}</td>                                    
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{data.phone}</td>
                            </tr>                                                           
                        </tbody>
                    </Table>
                </Card.Text>
                <br />
                <Button variant="primary" onClick={handleClick}>LogOut <span className='logoutBtn'><AiOutlineLogout /></span></Button>
            </Card.Body>
        </Card>
    </div>
    }

    return (
            <>{userData !== "" ? <>{displayData(userData)}</> : <><Loader/></>}</>        
    )
}
