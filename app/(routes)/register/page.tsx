"use client"

import React from "react"
import axios from "axios"

export default function Register() {


    const register = async () => {
        const email = "miller.guuru@gmail.com" //e.target[0].value;
        const password = "@J0hnD30!ucb"//e.target[1].value;
        const fullName = "Miller Gee"
        
        const res = await axios.post('/api/register', {
            fullName,
            email,
            password
        })

        console.log(res)
    }
    
    return <button onClick={register}> Simulate Register with default user </button>;
}