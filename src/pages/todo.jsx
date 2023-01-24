import React, { useState } from 'react'
import basUrl from '../../helper/basUrl'
import {AiFillDelete} from 'react-icons/ai'
import {MdEdit} from 'react-icons/md'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {parseCookies} from 'nookies'

export default function Home({todo}) {
  const {token} = parseCookies()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('active')
  const [description, setDescription] = useState('')

  const [aller, setallert] = useState('')

  const [search, setSearch] = useState('')


  const submitHandler = async (e) => {
    e.preventDefault()
    const res = await fetch(`${basUrl}/api/postTodo`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : token
      },
      body : JSON.stringify({
        title,
        status,
        description
      })
    })
    const res2 = await res.json()
    if(res2.error){
      setallert(res2.error)
    }else{
      setallert(res2.message)
      setTitle('')
      setDescription('')
      router.push("/todo")
    }
  }

  const searchHandler = async (e) => {
    e.preventDefault()
   
  }


  const deleteHandler = async (id) => {
    await fetch(`${basUrl}/api/todo/${id}`, {
      method : "DELETE"
    })
    
    router.push('/todo')
    
  }

  return (
    <div>
      <div className="max-w-lg mx-auto py-5">
        <form className="shadow" onSubmit={submitHandler}>
                  
          <input type="text" placeholder='Title' className="w-full rounded border outline-none p-1" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" value={status} placeholder='Status' className="w-full rounded border outline-none p-1 mt-5 text-gray-400" /> 
          <textarea name="" id="" cols="30" rows="5"  className="w-full rounded border outline-none p-1 mt-5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <p className="text-gray-500">{aller}</p>
          <button type="submit" className="w-full mt-5 p-1 rounded text-lg text-center bg-gray-600 text-gray-300">Submit</button>
        </form>
      </div>





      <div className="max-w-lg mx-auto">
      <form className="flex items-center" onSubmit={searchHandler}> 
      <input type="search" placeholder='Search' className="w-full rounded border outline-none p-1" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button type='submit' className="px-7 py-1 bg-gray-500 text-gray-300">Search</button>
      </form>
      </div>





      <div className="py-5 max-w-7xl mx-auto">
        <div className="grid grid-cols-5 gap-3">
            {todo && todo.map((item) => {
              
              return(
                <div key={item._id} className="border rounded p-3 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                  <div>{item.title}</div>
                  <div>{item.status}</div>
                  </div>
                  <div>{item.description}</div>
                  <div className="flex items-center justify-between">
                  {item.user.name}  
                  <div className="flex items-center gap-2"> 
                    <div className="text-lg cursor-pointer">
                      <Link href="/todos/[id]" as={`/todos/${item._id}`} ><MdEdit /></Link>
                      </div>
                    <div className="text-lg cursor-pointer" onClick={() => deleteHandler(item._id)}><AiFillDelete /></div></div>                   
                  </div>                 

                </div>
              )
            })}
        </div>

      </div>


    </div>
  )
}


export async function getServerSideProps(context) {
  const res = await fetch(`${basUrl}/api`)
  const data = await res.json()
  return {
    props: {
      todo : data
    }, // will be passed to the page component as props
  }
}