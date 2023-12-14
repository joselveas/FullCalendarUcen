import React from 'react';
import './index.css';
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import axios from 'axios';


export default function ForgotPassword(){
    const [correo, setCorreo] = useState("");
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const forgot =  (e) => {
      e.preventDefault();
      axios.post('http://localhost:3001/forgot', { correo }).then((response) => {
        Swal.fire({
          title: "<strong>Correo enviado</strong>",
          html: `<i>Se ha enviado un correo a <strong>${correo}</strong> con las instrucciones para restablecer la contraseÃ±a.</i>`,
          icon: 'success',
          timer:3000
        })
        if (response.data.status === 'Success') {
          navigate('/')
        }
        }).catch(error => console.log(error));
      }

    return(
        <div className="flex w_full h-screen">
        <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Olvidaste tu contraseña</h1>
            <div className='mt-8'>
                <div>
                    <label className='text-lg font-medium'>Correo</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu correo'
                        type="text"
                        onChange={(e) => setCorreo(e.target.value)}  // Actualiza el estado cuando el usuario ingresa el correo
                    />
                </div>
               
                <div className='mt-8 flex flex-col gap-y-4'>
                <button className='active:scale-[.98] active-75 hover:scale[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold'  onClick={forgot}>
                    Enviar
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