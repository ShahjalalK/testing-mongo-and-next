import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import baseUrl from '../../helper/basUrl'
import Cookies from 'js-cookie'

export default function Login() {
  const router = useRouter()  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerts, setAlerts] = useState('')
  const submitHandler = async (e) => {
    e.preventDefault()
    
    const res = await fetch(`${baseUrl}/api/users/login`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        email,
        password
      })
    })
    const res2 = await res.json()
    if(res2.error){
      setAlerts(res2.error)
    }else{  
      Cookies.set('token', res2.token)    
      setAlerts(res2.message)      
      router.push("/account")
    }
  }
  return (
    <div className="max-w-lg mx-auto py-5">
      <form onSubmit={submitHandler}>        
        <input type="email" placeholder='Email' className="w-full p-1 border rounded outline-none mt-5" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' className="w-full p-1 border rounded outline-none mt-5" value={password} onChange={(e) => setPassword(e.target.value)} />
        <p className='mt-5'>{alerts}</p>
        <button type='submit' className="w-full p-1 border rounded outline-none mt-5">Submit</button>
      </form>
    </div>
  )
}
