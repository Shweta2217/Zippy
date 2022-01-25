import React, { useState , useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import Css from "./Login.module.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form, Button } from "react-bootstrap";
import Animation from "../Animation/Animation";
import MyContext from '../../Context/Context';
const loginUrl = "https://zippylog.herokuapp.com/api/auth/login";

export default function LoginRegister() {
    const Context = useContext(MyContext);
    const usehistory = useHistory();
    let [msg,setMsg] = useState("")
    const [userData, setData] = useState({
        email: "",
        password: ""
    });

     function handleChange(event) {
         setData((prevInputValues)=>{
            return {
                ...prevInputValues,
                [event.target.name]:event.target.value
            }
        });     
        setMsg("")  
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await fetch(loginUrl,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(userData)})
        .then((res)=>{return res.json()})
        .then((resData)=>{
            if(resData.auth){  
                Context.SetContextToken(resData.token);
                usehistory.push('/');
            }else{
                setMsg(resData.message);
            }
        });    

    }
    return (
        <div className={Css.Container}>
            <Animation />
            <div className={Css.loginContainer}>
                <h1 className={Css.Heading}>LogIn</h1>
                <div className={Css.msg}>{msg?<>{msg} !</>: <></>}</div>
                <form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3">
                        <Form.Control type="email" onChange={handleChange} value={userData.email} name="email" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" onChange={handleChange} value={userData.password} name="password" />
                    </FloatingLabel>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" className={Css.btn} size="lg">
                            Login
                        </Button>
                    </div>
                </form>
                <div className={Css.orDiv}>
                    <span className={Css.span}></span>
                    <span className={Css.orText}>Or</span>
                    <span className={Css.span}></span>
                </div>
                <p>Don't Have Account ? <Link to='/register'> Register Here</Link></p>

            </div>
        </div>
    );
}
