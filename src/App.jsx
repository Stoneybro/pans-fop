/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {FaChevronDown,FaChevronUp,FaCheck,FaTimes} from 'react-icons/fa'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import axios from 'axios'

function App() {
const pollref=useRef(null)
const pollwidth=useRef(null)
const [userdata,Setuserdata]=useState([])
const [data,setData]=useState([])
const [poll,setPoll]=useState('')
const [vote,setVote]=useState()
const [count,setCount]=useState(0)
const votes = [
  { vote: 5,price: 500 },
  { vote: 10, price: 1000 },
  { vote: 15,price: 1500 },
  { vote: 20,price: 2000 },
  { vote: 30,price: 3000 },
  { vote: 50,price: 5000 },
]
const [selected, setSelected] = useState(votes[0])
const [price,setPrice]=useState(votes[0].price)

  function scale(num,inmin,inmax,outmin,outmax) {
    return(num-inmin)*(outmax-outmin)/(inmax-inmin)+outmin;
}
  function cancelModal(params) {
    setVote()
  }
  function test(fee) {
    setPrice(fee)
  }

  useEffect(()=>{
    // pollwidth.current.style.width=`${scale(data.percentage,0,100,0,poll)}px`

    const fetchData = async () => {
      try {
        const response = await axios.get('https://pan-vote.onrender.com/v1/data');
        Setuserdata(response.data.contestants);
        setData(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
 
  },[])

    function work(params) {
      if (pollref.current) {
        setPoll(pollref.current.offsetWidth)
        console.log(true);
      }else{ console.log(false);}
     
    }
useEffect(()=>{
  const timeout=setTimeout(() => {
    work()
  }, 2000);
  return () => {
    clearTimeout(timeout);
  }

},[])

function votec(id) {
  const choice=userdata.filter((data)=>data._id===id)
  setVote(choice)
}
  return (
    <div className={`h-full w-screen ${vote?' pointer-events-none  ':''}`}>
      <nav className='bg-secondary sticky top-0 left-0 w-full text-white text-2xl text-center py-2 z-50'>
        Face of Pharmacy
      </nav>
      <div className={`${vote?' pointer-events-none blur-sm  ':''}`}>

      
      <article className='my-8 mx-6 flex flex-col gap-4'>
      <div className="text-white text-xl">Poll Statistics</div>
            {/* /////////////poll-card///////////// */}
      <main className="bg-secondary flex flex-col gap-3 p-4 rounded-3xl">
              {/* ////////////single////////////// */}
              {userdata?.map((data)=>{

                const width=scale(data?.percentage,0,100,0,poll)

                  return(
                    <div key={data._id} ref={pollref}  className=" flex justify-between text-sm bg-tetiary py-2 px-3 rounded-xl relative overflow-hidden"><div ref={pollwidth} className={`bg-[#7FFA8A] h-full flex items-center absolute   top-0 left-0`} style={{width:`${width}px`}}><span className='pl-4'> {data.fullname}</span></div><span className="ml-auto z-10 text-xs">{data.no_votes} { data.no_votes===1?'vote':'votes'}</span></div>
                  )
              })}
     
        </main>

                 {/* /////////// big buttons(total votes)/////////////// */}
      <div className="flex text-white gap-3">
      <div className="flex flex-1 flex-col justify-center items-center bg-accent-one py-2 rounded-xl"><span className="">Total Votes</span><span className="">{data.total_votes}</span></div>
      <div className="flex-1  bg-accent-one py-2 rounded-xl"></div>
      </div>

      </article>

      <article className='my-8 mx-6 flex flex-col gap-4 '>
    <div className="text-white text-xl">Contestants</div>
    <main className="flex flex-col gap-8">



{userdata.map((data,index)=>{
  return(
    < div key={index}>
     {/* ////////////contestant cards////////////// */}
     <div className="bg-secondary rounded-3xl overflow-hidden">

{/* ////////////white-segment////////////// */}
  <div className=" flex flex-col items-center bg-white rounded-3xl pg py-4 ">
    <div className="h-20 w-20 rounded-full bg-black mb-4"></div>
    <div className="text-2xl">{data.fullname}</div>
    <div className="text-sm">@{data.instagram}</div>
  </div>

{/* /////////////transparent-segment///////////// */}
  <div className="flex px-6 py-2 text-white">
  <div className="flex flex-col items-center flex-1"><span className='text-xs text-white'>votes</span><span>{data.no_votes}</span></div>
  <div className="flex flex-col items-center flex-1"><span className='text-xs text-white'>percentage</span><span>{parseFloat(data.percentage.toFixed(1))}%</span></div>
  <button className="flex-1 bg-accent-one rounded-xl flex items-center justify-center " onClick={()=>votec(data._id)}>Vote</button>
</div>
</div>

    </div>
   )
})}
 
    </main>

      </article>
      </div>
       {/* ////////////modal////////////// */}

      {vote&&<div className="flex fixed flex-col items-center p-4 bg-white w-[90%] h-[60%] top-20 left-6 z-20 rounded-xl pointer-events-auto">
        <FaTimes className='absolute top-4 right-4 cursor-pointer' size={20} onClick={cancelModal} />
      <div className="h-16 w-16 rounded-full bg-black "></div>
      <div className="text-xl text-black">{vote[0].fullname}</div>
      <div className="flex w-full h-full mt-4 justify-between">
        <div className="flex-1">
      <Listbox value={selected} onChange={setSelected} >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.vote} votes</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown
                className="h-3 w-3 text-gray-400"
                aria-hidden="true"
                
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-32 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {votes.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active,selected }) =>
                    (`relative cursor-default select-none py-2 pl-4 text-xs pr-4 ${
                      active ? `bg-amber-100 text-amber-900 ${test(person.price)}` : 'text-gray-900'
                    }${selected?`bg-blue-600`:``}`)
                  }
                  value={person}
                >
                  {({ selected }) => 
                  (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? `font-medium ` : 'font-normal'
                        }`}
                      >
                        {person.vote} votes
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      </div>

      <div className="flex-1  flex flex-col justify-center items-center">
      <div className="text-2xl ">Price:{price}</div>
      <button className=''>pay now</button>
      </div>
       </div>
       </div>}

    </div>
  )
}

export default App
