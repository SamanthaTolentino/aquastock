import React from 'react'

export default function BoxDiv(props) {
  return (
    <div className={`${props.gridClass} bg-tan-1 flex flex-col drop-shadow-md rounded-2xl overflow-hidden`}>
      <div className='bg-blue-2 flex justify-center py-4 px-7'>
        <p className='text-white text-2xl stroke-1 fix-stroke text-center'>{props.title}</p>
      </div>
      <div className='grow px-7 py-5 flex flex-col justify-center overflow-auto'>
        {props.content}
      </div>
    </div>
  )
}
