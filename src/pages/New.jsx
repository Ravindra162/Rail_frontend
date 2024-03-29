import React, { useState,useRef,useEffect } from 'react'
import axios from 'axios'
import NewNav from '../components/NewNav'
import Train from './Train1.png'
import {Input} from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/react";
import { useRecoilState } from 'recoil';
import {sourceAtom} from '../store/atoms/source'
import { destinationAtom } from '../store/atoms/destination';
import { CrucksAtom } from '../store/atoms/Crucks';
import { isLoadingAtom } from '../store/atoms/isLoading';
import {ScrollShadow} from "@nextui-org/react";
import { trainsAtom } from '../store/atoms/trains';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import {TicketAtom} from '../store/atoms/Ticket'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

const New = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const backdrops = ["blur"];
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useRecoilState(isLoadingAtom)
  const [ticket,setTicket] = useRecoilState(TicketAtom)
  const [source,setSource] = useRecoilState(sourceAtom)
  const [destination,setDestination] = useRecoilState(destinationAtom)
  const [crucks,setCrucks]  = useRecoilState(CrucksAtom)
  const [date,setDate] = useState('')
  const [options,setOptions] = useState(
    ['Mumbai Central',
    'Pune Junction',
    'Nagpur Junction',
    'Banglore City',
    'Hyderabad Secunderabad',
    'MGR Chennai Central',
    'Mangaluru Central',
    'Kasaragod',
    'Payyanur',
    'Tiruppur',
    'Katpadi Junction',
    'Tiruvallur']
    
    
    );
  const [trains,setTrains]=useRecoilState(trainsAtom)
  const sourceRef = useRef()
  const destinationRef = useRef()
  const [backdrop, setBackdrop] = useState('opaque')
  const [classData,setClassData] = useState({})
  const [trainData,setTrainData] = useState({})
  const [index,setIndex] = useState(0)
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }
  const searchHandler = (e) =>{
    
    console.log(date)
    console.log(source)
    console.log(destination)
    setSource(sourceRef.current.value)
    setDestination(destinationRef.current.value)
    e.preventDefault()
    
    axios.get(`https://railquest.onrender.com/api/search?src=${sourceRef.current.value}&dest=${destinationRef.current.value}&date=${date}`)
    .then(response=>{
        setIsLoading(true)
        setCrucks({source:sourceRef.current.value,destination:destinationRef.current.value,date:date})
        setTimeout(()=>{
          if(response.data.found===true){
            setTrains(response.data.trains)
          console.log(response.data.trains)
          // navigate('/searchTrains')
        }
            else{
                setTrains([])
                alert("No trains Found")
            }
            setIsLoading(false)
        },1500)
        
    })
    
}



  return (<div className='h-screen w-full' >  
      <NewNav color={'7C1882'}/>
      {isLoading && <Loading/>}
      <div className="h-[85%] w-full  flex " id="Hero">
      <datalist id="browsers">
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
        <div className="h-full w-[40%]  flex justify-center items-center">
              <form method='post' onSubmit={searchHandler} className='h-[80%] w-[80%] bg-slate-200 flex flex-col justify-center items-center gap-5' >
                <input type='date'onChange={(e)=>{setDate(e.target.value)}}/>
                <Input 
                ref={sourceRef}
                list='browsers'
                // onChange={(e)=>{setSource(e.target.value)}}
                className='w-[70%]' type="text" label="Source" />
               
                <span className="material-symbols-outlined">
                swap_vert
                </span>
                
                <Input 
                ref={destinationRef}
                list='browsers'
                // onChange={(e)=>setDestination(e.target.value)}
                className='w-[70%]' type="text" label="Destination" />
                <Button type='submit' className="bg-[#7C1882] text-white">
                Search
                </Button>
              </form>
        </div>
       { trains.length?<ScrollShadow className="w-[95%] h-[95%]">

{trains.map((elem,index)=>{
  return  <div key={index} className='h-1/3 w-4/5 bg-slate-100 flex flex-col justify-center items-center m-10 rounded-xl'>
  <center><h2 className='basis-[15%] w-full text-lg font-bold'>{elem.train_number}  -  {elem.train_name}</h2></center>
  <h2 className='basis-[15%]' w-full>{source} - {destination}</h2>
  <div className='basis-[70%] bg-[#96469A] w-full flex justify-center items-center gap-10 p-5 rounded-xl'>


    
         {elem.class_price_avail.map((element,index)=>{
          return<>
          <Button key={index}
          onPress={() => {
            setIndex(index)
            setClassData(element)
            handleOpen("blur")
          }}
          className='h-1/2 w-1/4 bg-slate-100 flex flex-col justify-center items-center'>
            <div className='h-2/3 p-3 text-xl'>
              {element.class}
            </div>
            <div className={`h-1/3 ${element.available_tickets > 35 ? 'text-green-500' : 'text-red-500'} mb-3`}>
                          {element.available_tickets}
            </div>
        </Button>
        </>
       
         })}
      
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  CLASS - {classData.class}</p><br/>
                  <p>PRICE - {classData.ticket_price}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{
                  setTicket({
                    trainName:trains[index].train_name,
                    trainNumber:trains[index].train_number,
                    class:classData.class,
                    price:classData.ticket_price,
                    passengerCount:1
                  })
                  navigate('/user/filldetails')

                }}>
                  Book
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    

      

  </div>
</div>


})}





</ScrollShadow>:

             <div className="h-full w-[60%]">
                    <img 
                      className="h-full w-full"
                   src={Train} alt="Image"/>
                     </div>}
               </div>
    </div>)
          


}

export default New