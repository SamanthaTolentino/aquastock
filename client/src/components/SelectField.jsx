import React, { useState, useRef, useEffect } from 'react'

import arrowSelect from '../assets/img/arrow-select.png'

export default function SelectField(props) {
  // let [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  
  const wrapperRef = useRef("menu");
  useClickOutside(wrapperRef, () => {
    setOpen(false);
  });

  function useClickOutside(ref, onClickOutside) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          onClickOutside();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
     
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onClickOutside]);
  }

  return (
    <div className='relative flex bg-teal-1 py-3 px-2 rounded-xl mb-4'>
      <select ref={wrapperRef} defaultValue={'default'} className='bg-transparent w-full z-10' name="" id="" onClick={() => setOpen(!open)} value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="default" disabled>Select an option...</option>
        {
          props.options.map((option, index) => (
            <option className='bg-tan-1' value={option} key={index}>{option}</option>
          ))
        }
      </select>
      <img className={`${open ? 'rotate-arrow-up' : 'rotate-arrow-down'} absolute right-0 mr-2 mt-1 w-4`} src={arrowSelect} alt="arrow" />
    </div>
  )
}
