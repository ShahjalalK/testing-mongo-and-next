import React from 'react'
import baseUrl from '../../helper/basUrl'
export default function Home({data}) { 
  console.log(data) 
  return (
    <div className="grid grid-cols-5 max-w-7xl mx-auto py-5 gap-4">      
     {data && data.map((item, index) => {
      return(
        <div className="border rouded p-3 flex flex-col spacing-y-3">
          <div>{item.title}</div>
          <div>{item.description}</div>
          <div>{item.status}</div>
        </div>
      )
     })}
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`${baseUrl}/api/todo`)
  const res2  = await res.json()
  return {
    props: {
      data : res2
    }, // will be passed to the page component as props
  }
}
