import React, { useState,useEffect } from "react";
import { useNavigate} from "react-router-dom"

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })

    const data = async () => {
        console.log(name,email,password);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name:name,email:email,password:password})
        };
        let result = await fetch("http://localhost:5000/register",requestOptions
        );
        result = await result.json()
        console.log(result)
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth))

        if(result){
           navigate("/")
        }

    }


    return (
        <div className="register">
            <h3>Users Registration</h3>
            <label>Name</label>
            <input className="input-box" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="enter your  name" />
            <label>Email</label>
            <input className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="enter your  email" />
            <label>Password</label>
            <input className="input-box" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="enter your  password" />
            <button onClick={data} className="button" type="button" >SignUp</button>
        </div>
    )
}


export default SignUp