import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import BoxDiv from '../components/BoxDiv'
import arrowSelect from '../assets/img/arrow-select.png'
import arrowLeft from '../assets/img/arrow-left.png'
import arrowRight from '../assets/img/arrow-right.png'
import fishLogo1 from '../assets/img/fish-logo-1.png'
import fishLogo2 from '../assets/img/fish-logo-2.png'
import { getImageURL } from '../utils/image-util'

export default function Home() {
  let [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeSelect, setActiveSelect] = useState()
  const [filteredFish, setFilteredFish] = useState([])
  const [currentSelection, setCurrentSelection] = useState(0)
  const [okClicked, setOkClicked] = useState(false)
  const [imgPath, setImgPath] = useState()
  const [error, setError] = useState(false)
  const [data, setData] = useState({
    tankSize: '',
    temperament: '', 
    difficulty: '',
  })
  const selectOptions = [
    {
      label: 'Minimum Tank Size',
      options: [
        '10',
        '20',
        '30',
        '40',
        '50',
        '60',
      ]
    },
    {
      label: 'Ideal Temperament',
      options: [
        'Shoaling',
        'Schooling',
        'Territorial',
      ]
    },
    {
      label: 'Difficulty Level',
      options: [
        'Beginner',
        'Intermediate',
        'Experienced',
      ]
    },
  ]

  useEffect(() => {
    // setLoading(true)
    setLoading(false)

    setTimeout(() => {
      setLoading(false)
    }, 5800)
  }, [])

  const getFilteredFish = async (e) => {
    e.preventDefault()
    const {tankSize, temperament, difficulty} = data

    try {
      let response = await axios.get('/getFilteredFish', {
        params: {
          tankSize: tankSize,
          temperament: temperament,
          difficulty: difficulty,
        }
      })

      if (response.data.error) {
        console.log('error')
        setFilteredFish(response.data)
        setError(true)
      }
      else {
        setOkClicked(true)
        setFilteredFish(response.data)
        setCurrentSelection(0)
        setError(false)

        const image = getImageURL(response.data[0].imgPath)
        setImgPath(image)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const wrapperRef = useRef("menu");
  useClickOutside(wrapperRef, () => {
    setOpen(false);
    setActiveSelect(null)
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

  const updateFormData = (value, index) => {
    if (index == 0) {
      setData({...data, tankSize: value})
    }
    else if (index == 1) {
      setData({...data, temperament: value})
    }
    else if (index == 2) {
      setData({...data, difficulty: value})
    }
  }

  const goBack = async () => {
    if (filteredFish.length) {
      if ((currentSelection - 1) >= 0) {
        let currentIndex = currentSelection - 1
        setCurrentSelection(currentIndex)

        const image = getImageURL(filteredFish[currentIndex].imgPath)
        setImgPath(image)
      }
    }
  }

  const goNext = async () => {
    if (filteredFish.length) {
      if ((currentSelection + 1) < filteredFish.length) {
        let currentIndex = currentSelection + 1
        setCurrentSelection(currentIndex)
        
        const image = getImageURL(filteredFish[currentIndex].imgPath)
        setImgPath(image)
      }
    }
  }

  const formDiv = 
    <form onSubmit={getFilteredFish} className='flex flex-col xl:w-300px xl:h-350px'>
      {
        selectOptions.map((select, index) => (
          <div className='grow flex flex-col xl:mb-0 mb-7' key={index}>
            <label>{select.label}</label>  
            <div className='relative flex bg-teal-1 py-3 px-2 rounded-xl'>
              <select ref={wrapperRef} defaultValue={'default'} className='bg-transparent w-full z-10' name="" id="" onClick={() => {setOpen(!open); setActiveSelect(index)}} onChange={(e) => updateFormData(e.target.value, index)}>
                <option value="default" disabled>Select an option...</option>
                {
                  index == 0 ?
                  select.options.map((option, index) => (
                    <option className='bg-tan-1' value={option} key={index}>{option}{option == '60' ? '+' : ''} Gallons</option>
                  )) :
                  select.options.map((option, index) => (
                    <option className='bg-tan-1' value={option} key={index}>{option}</option>
                  )) 
                }
              </select>  
              <img className={`${activeSelect == index && open ? 'rotate-arrow-up' : 'rotate-arrow-down'} absolute right-0 mr-2 mt-1 w-4`} src={arrowSelect} alt="arrow" />
            </div>
          </div>
        ))
      }
      {
        error ? 
          <p className='text-sm text-red-1 pb-3'>{`*${filteredFish.error}`}</p>
        : 
          <></>
      }
      <div className='flex justify-center'>
        <button type='submit' className='bg-purple-1 text-white stroke-1 fix-stroke w-32 py-2 px-4 rounded-lg transition ease-in-out hover:bg-purple-2'>OK</button>
      </div>
    </form>

    const emptyFishDiv = 
      <div className='flex flex-col xl:w-600px xl:h-350px h-450px'>
        {
          !filteredFish.length && okClicked ?
            <div className='flex flex-col'>
              <div className='mb-5'>Currently there are no fish in our database for these parameters. Try a combination of these options for now!</div>
              <ul className='ml-4'>
                <li className='mb-3'>- 10 gallons: shoaling/schooling/territorial, beginner/intermediate/experienced</li>
                <li className='mb-3'>- 20 gallons: schooling, experienced</li>
                <li className='mb-3'>- 30 gallons: shoaling, beginner</li>
                <li>- 60 gallons: shoaling/schooling, beginner/intermediate</li>
              </ul>
            </div>
          : ''
        }
      </div>

    const fishDiv =
      <div className='flex flex-col items-center xl:w-600px xl:h-350px h-450px'>
        <img className='h-1/2 animate-bounceFish py-2' src={imgPath} alt="" />
        <div className='h-1/2 bg-teal-1 w-full rounded-lg overflow-auto py-4 px-5'>
          <div>{filteredFish.length ? filteredFish[currentSelection].description : ''}</div>
        </div>
      </div>

  return (
    <>
      {
        loading ? 
          <div className='bg-blue-1 h-screen flex flex-col items-center justify-center'> 
            <div className='flex items-center mb-4'>
              <div className='opacity-0 animate-fadeInOut justify-self-end w-24 mr-1 scale-x-[-1]'>
                <img className='animate-bounceDownUp' src={fishLogo2} alt='' />
              </div>     
              <div className='opacity-0 animate-fadeInOut justify-self-start w-24 ml-1'>
                <img className='animate-bounceUpDown' src={fishLogo1} alt='' />
              </div>           
            </div>
            <div className='animate-slideUpDown mt-1 row-start-5 col-start-2 col-span-2 justify-self-center w-40'>
              <p className='opacity-0 animate-fadeInOut font-regular text-white text-xl stroke-1 fix-stroke text-center'>AquaStock</p>
            </div>      
          </div>
        :
          <div className='bg-blue-1 h-screen xl:overflow-hidden px-6 py-7 flex xl:flex-row flex-col xl:items-center xl:justify-center font-regular'>
            <BoxDiv title={'Enter Details'} content={formDiv} gridClass={'xl:mr-2 xl:mb-0 mb-7'} />
            <div className='xl:grid grid-rows-3 gap-4'>
              <div className='row-start-2'>
                {
                  filteredFish.length ?
                    <BoxDiv title={filteredFish[currentSelection].name} content={fishDiv} gridClass={'xl:ml-2 xl:mb-0 mb-7'} /> 
                  : <BoxDiv title={okClicked ? 'No fish in our database yet :(' : 'Enter info and hit OK!'} content={emptyFishDiv} gridClass={'xl:ml-2 xl:mb-0 mb-7'} />
                }       
              </div>
              <div className='row-start-3 xl:mb-0 mb-7'>
                <div className='flex justify-center items-center'>
                  <button onClick={goBack} className='mr-5 transition ease-in-out hover:scale-125'>
                    <img className='w-10 animate-wiggleLeft' src={arrowLeft} alt="arrowLeft" />
                  </button>
                  <div className='bg-tan-1 w-1/2 h-14 text-center py-3 rounded-3xl drop-shadow-md'>{filteredFish.length ? currentSelection + 1 : 0}/{error ? 0 : filteredFish.length}</div>
                  <button onClick={goNext} className='ml-5 transition ease-in-out hover:scale-125'>
                    <img className='w-10 animate-wiggleRight' src={arrowRight} alt="arrowRight" />
                  </button>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}
