import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import baseUrl from '../../helper/basUrl'

export default function Signup() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState('')
  const submitHandler = async (e) => {
    e.preventDefault()
    const res = await fetch(`${baseUrl}/api/users/signup`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        name,
        email,
        password
      })
    })
    const res2 = await res.json()
    if(res2.error){
      setAlert(res2.error)
    }else{
      setAlert(res2.message)
      router.push("/login")
    }
  }
  return (
    <div className="max-w-lg mx-auto py-5">
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Name' className="w-full p-1 border rounded outline-none" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder='Email' className="w-full p-1 border rounded outline-none mt-5" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' className="w-full p-1 border rounded outline-none mt-5" value={password} onChange={(e) => setPassword(e.target.value)} />
        <p className='mt-5'>{alert}</p>
        <button type='submit' className="w-full p-1 border rounded outline-none mt-5">Submit</button>
      </form>
    </div>
  )
}
