import React from 'react'
import {parseCookies} from 'nookies'
import baseUrl from '../../helper/basUrl'

export default function Account({data}) {
  console.log(data)
  return (
    <div>
      {data && data.map((item) => {
        return (
          <h1 className="text-center text-2xl py-10">Welcome {item.name}</h1>
        )
      })}
    </div>
  )
}

export async function getServerSideProps(ctx) {
    const {token} = parseCookies(ctx)        
    const res = await fetch(`${baseUrl}/api/users/account`, {
        headers : {
          "Authorization" : token
        }
    })
   const data = await res.json()
    return {
      props: {data}, // will be passed to the page component as props
    }
  }
