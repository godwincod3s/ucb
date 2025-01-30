"use client"

import React from "react"
import axios from "axios"

export default function Register() {


    const register = async () => {
        const email = "rachealonyi.dev@gmail.com" //e.target[0].value;0040066130
        const password = "@Nema!ucb"//e.target[1].value; @J0hnD30!ucb
        const fullName = "Chris Nema"
        
        const res = await axios.post('/api/register', {
            fullName,
            email,
            password
        })

        console.log(res)
    }
    
    return <button onClick={register}> Simulate Register with default user </button>;
}