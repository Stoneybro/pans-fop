/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
const pollref=useRef(null)
const pollwidth=useRef(null)
const [userdata,Setuserdata]=useState([])
const [data,setData]=useState([])
const [poll,setPoll]=useState('')

  function scale(num,inmin,inmax,outmin,outmax) {
    return(num-inmin)*(outmax-outmin)/(inmax-inmin)+outmin;
}

  useEffect(()=>{
    // pollwidth.current.style.width=`${scale(data.percentage,0,100,0,poll)}px`
    setPoll(pollref.current.offsetWidth)
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


  return (
    <div className="h-full w-screen">
      <nav className='bg-secondary sticky top-0 left-0 w-full text-white text-2xl text-center py-2 z-50'>
        Face of Pharmacy
      </nav>
      <article className='my-8 mx-6 flex flex-col gap-4'>
      <div className="text-white text-xl">Poll Statistics</div>
            {/* /////////////poll-card///////////// */}
      <main className="bg-secondary flex flex-col gap-3 p-4 rounded-3xl">
              {/* ////////////single////////////// */}
              {userdata?.map((data)=>{
                console.log(scale(data.percentage,0,100,0,poll));
                const width=scale(data?.percentage,0,100,0,poll)
                console.log(width);
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



{userdata.map((data)=>{
  return(
    <>
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
  <div className="flex-1 bg-accent-one rounded-xl flex items-center justify-center">Vote</div>
</div>
</div>

    </>
   )
})}
 
    </main>

      </article>
       {/* ////////////modal////////////// */}

       <div className="">

       </div>
    </div>
  )
}

export default App
