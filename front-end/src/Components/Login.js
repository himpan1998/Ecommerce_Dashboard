import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth){
            navigate('/')
        }
    })

    const handleLogin = async () => {
        // console.log(email, password)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };
        let result = await fetch('http://localhost:5000/login', requestOptions)
        result = await result.json();
        if(result.auth){
        localStorage.setItem("user",JSON.stringify(result.user))
        localStorage.setItem("token",JSON.stringify(result.auth))
        navigate('/')
        }
        else{
            alert("Please enter conncet details")
        }
    }

    return (
        <div className="login">
            <h3>Users Login</h3>
            <label>Email</label>
            <input className="input-box" type="email" placeholder="enter your email id" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password</label>
            <input className="input-box" type="password" placeholder="enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="button" onClick={handleLogin}>Login</button>
        </div>
    )
}


export default Login;