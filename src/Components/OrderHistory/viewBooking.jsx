import React, { useState, useEffect, useContext } from 'react';
import Css from './OrderHistory.module.css';
import MyContext from '../../Context/Context';
import Loader from '../Loader/Loader';
import { Table} from 'react-bootstrap';

export default function OrderHistory() {
    const Context = useContext(MyContext);
    const [data, setData] = useState("");
    let email = JSON.parse(window.sessionStorage.getItem("UserInfo")).email;
    let ordersUrl = "https://foodiezz-api.herokuapp.com/orders?email=" + email; 
   
    useEffect(() => {
        fetch(ordersUrl,)
            .then((res) => { return res.json() })
            .then((data) => { setData(data) })
    },[]);
   
    function OrderList(data) {
        return <div className={Css.orderListContainer}>
            <h1 className={Css.heading}>Order History</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className={Css.TH}>Order Id</th>
                        <th className={Css.TH}>Dish</th>
                        <th className={Css.TH}>Name</th>
                        <th className={Css.TH}>Email</th>
                        <th className={Css.TH}>Address</th>
                        <th className={Css.TH}>Cost</th>
                        <th className={Css.TH}>Date</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index)=>{
                        return   <tr key={index+"orderList"}>
                        <td className={Css.TH}>{item.orderId}</td>
                        <td className={Css.TH}>{(item.orderedItems).map((dataItem,index)=>{
                            return <>{dataItem},&nbsp;&nbsp;</>
                        })}</td>
                        <td className={Css.TH}>{item.name}</td>
                        <td className={Css.TH}>{item.email}</td>
                        <td className={Css.TH}>{item.address}</td>
                        <td className={Css.TH}>{item.totalCost}</td>
                        <td className={Css.TH}>{item.date}</td>
                    </tr>
                    })}
                  
                  
                </tbody>
            </Table>
        </div>;
    }

    return <>
        {data !== "" ?
            <>{OrderList(data)}</>
            :
            <Loader />
        }
    </>;
}
