import React from "react";
import './index.css';
import { useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ResetPassword(){
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const {userType, id, token} = useParams();
    console.log(userType, id, token);
    axios.defaults.withCredentials = true;

    const reset = (e) => {
        e.preventDefault();
        console.log(userType, id, token);
        axios.post(`http://localhost:3001/reset/${userType}/${id}/${token}`, { password }).then((response) => {
            Swal.fire({
                title: "<strong>Contraseña restablecida</strong>",
                html: `<i>La contraseña del usuario ha sido restablecida.</i>`,
                icon: 'success',
                timer:3000
            })
            if (response.data.Status === 'Success') {
                navigate('/')
            }
        }).catch(error => console.log(error));
    }
  
    return(
        <div className="flex w_full h-screen">
        <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Recuperacion de contraseña</h1>
            <div className='mt-8'>
                <div>
                    <label className='text-lg font-medium' htmlFor="email">Contraseña nueva</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Contraseña nueva'
                        type="password"
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className='mt-8 flex flex-col gap-y-4'>
                <button className='active:scale-[.98] active-75 hover:scale[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold' type="submit" onClick={reset} >
    
                    Reestablecer contraseña
                </button>
                <button onClick={() => navigate('/')}>
                 Volver a inicio
                </button>
                </div>
                <div>
                </div>
            </div>
        </div>
        </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">       
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Logo_nuevo_ucen.png/1200px-Logo_nuevo_ucen.png" 
        className="w-60 h-60 bg-gradient-to-tr  rounded-full animate-bounce" />
        <div className="w-full h-3/2 absolute bottom-0 bg-white backdrop-blur-lg"/>
      </div>
    </div>
    )

}