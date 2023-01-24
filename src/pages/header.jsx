import Link from 'next/link'
import React from 'react'
import {parseCookies} from 'nookies'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function Header() {
  const {token} = parseCookies() 
  const router = useRouter() 
  return (
    <div className="bg-gray-500">
        <div className="max-w-7xl mx-auto py-2">
        <div className="flex item-center justify-between">
          
            <Link href="/" className='text-xl text-white'>Logo</Link>
            <div className="flex item-center gap-3">
            
            {token ?  <> <Link href="/todo" className="text-white text-lg font-medium">Todo</Link>
                <Link href="/account" className="text-white text-lg font-medium">account</Link>
                <button className="bg-blue-500 text-white px-5 py-1" 
                onClick={() => {
                  Cookies.remove('token')
                  router.push('/login')
                }}>Logout</button> </>
                 :
                 <>
                 <Link href="/login" className="text-white text-lg font-medium">Login</Link>
                 <Link href="/signup" className="text-white text-lg font-medium">Signup</Link> </>
                }
                           
            </div>
        </div>
        </div>
       
    </div>
  )
}
