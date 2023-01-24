import { useRouter } from 'next/router'
import React, { useState } from 'react'
import baseUrl from '../../../helper/basUrl'
import {AiOutlineClose} from 'react-icons/ai'

export default function UpdateId({todo}) {
    const [title, setTitle] = useState(todo.title)
  const [status, setStatus] = useState(todo.status)
  const [description, setDescription] = useState(todo.description)
  const [aller, setAller] = useState('')
  

  const router = useRouter()

  const submitHandler = async (e) => {
    e.preventDefault()
    const res =  await fetch(`${baseUrl}/api/todo/${todo._id}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            title,
            status,
            description
        })
    })
    const res2 = await res.json()
    if(res2.error){
        setAller(res2.error)
    }else{
        setAller(res2.message)
        router.push("/todo")
        
    }
  }

  const closeHandler = () => {
    router.push("/todo")
  }
  return (
    <div className="model">
        <div className="max-w-xl mx-auto py-10 bg-white p-5 relative">
            <div className="absolute top-3 right-5 text-xl border cursor-pointer" onClick={closeHandler}>
                <AiOutlineClose />
            </div>
        <form className="shadow" onSubmit={submitHandler}>
                  
          <input type="text" placeholder='Title' className="w-full rounded border outline-none p-1" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" value={status} placeholder='Status' className="w-full rounded border outline-none p-1 mt-5 text-gray-400" /> 
          <textarea name="" id="" cols="30" rows="5"  className="w-full rounded border outline-none p-1 mt-5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <p className="text-gray-500">{aller}</p>
          <button type="submit" className="w-full mt-5 p-1 rounded text-lg text-center bg-gray-600 text-gray-300">Update</button>
        </form>
      </div>
      
    </div>
  )
}

export async function getServerSideProps({params:{id}}) {
    const res = await fetch(`${baseUrl}/api/todo/${id}`)
    const data = await res.json()
    return {
      props: {
        todo : data
      }, 
    }
  }
