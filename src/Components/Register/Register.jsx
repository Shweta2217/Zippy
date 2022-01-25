import React, { useState, userEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Css from "./Register.module.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form, Button } from "react-bootstrap";
import Animation from "../Animation/Animation";
const registerUrl = "https://zippylog.herokuapp.com/api/auth/register";

export default function Login() {
    const usehistory = useHistory();
    const [msg, setMsg] = useState("");
    const [userData, setData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    function handleChange(event) {

        setData((prevInputValues) => {
            return {
                ...prevInputValues,
                [event.target.name]: event.target.value
            }
        });
    }

    function HandleSubmit(event) {
        event.preventDefault();
        if (userData.phone === "") setMsg("Enter Phone number")
        else if (userData.name === "") setMsg("Enter Name ")
        else if (userData.email === "") setMsg("Enter Email ")
        else if (userData.password === "") setMsg("Enter  Password");
        else if (isNaN(userData.phone)) setMsg("Enter valid Phone number ")
        else {
            fetch(registerUrl, {
                method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userData)
            }).then((res) => { return res.json() })
                .then((data) => {
                    if (data.message == "Successfully registered") usehistory.push("/login");
                    else setMsg(data.message);
                })
        }
    }

    return (
        <div className={Css.Container}>
            <Animation />
            <div className={Css.loginContainer}>
                <h1 className={Css.Heading}>Register</h1>
                <div className={Css.msg}>{msg ? <>{msg} !</> : <></>}</div>
                <form onSubmit={HandleSubmit}>
                    <FloatingLabel controlId="floatingName"
                        label="Name"
                        className="mb-3">
                        <Form.Control type="text" value={userData.name} name="name" onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingEmail"
                        label="Email address"
                        className="mb-3">
                        <Form.Control type="email" value={userData.email} name="email" onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword"
                        label="Password"
                        className="mb-3">
                        <Form.Control type="password" value={userData.password} name="password" onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingNumber"
                        label="Phone Number"
                        className="mb-3">
                        <Form.Control type="text" value={userData.phone} name="phone" onChange={handleChange} />
                    </FloatingLabel>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" className={Css.RegisterBtn} size="lg">
                            Register
                        </Button>
                    </div>
                </form>
                <div className={Css.orDiv}>
                    <span className={Css.span}></span>
                    <span className={Css.orText}>Or</span>
                    <span className={Css.span}></span>
                </div>
                <p>Allready Have Account ? <Link to='/login'> Login Here</Link></p>

            </div>
        </div>
    );
}
