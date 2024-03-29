import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { TicketAtom } from '../store/atoms/Ticket';
import { userAtom } from '../store/atoms/user';
import { useRecoilState, useRecoilValue } from 'recoil';
import {ScrollShadow} from "@nextui-org/react";
import { CrucksAtom } from '../store/atoms/Crucks';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Navbar from '../components/Navbar';
import NewNav from '../components/NewNav';
import {isLoadingAtom} from '../store/atoms/isLoading'
import Loading from '../components/Loading'
import axios  from 'axios'; 
const Passenger = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const navigate = useNavigate()
  const crucks = useRecoilValue(CrucksAtom)
  const [username,setUsername] = useRecoilState(userAtom)
  const [ticket,setTicket] = useRecoilState(TicketAtom)
  const [payment,setPayment] = useState('UPI')
  const [isLoading,setIsLodaing] = useState()
  const [passengers,setPassengers] = useState([{
    passengerName:'',
    Age:18,
    Gender:'',
    ContactNo:'',
    Country:'',
  }])
  useEffect(()=>{
    if(!localStorage.getItem('token') || ticket.passengerCount*ticket.price==0){
      alert('Please Login to Book tickets or Select any Train to booki tickets')  
      window.location.href='/user'
    }
  })
  const addNewPassenger = () =>{
    setPassengers([...passengers,{}])
    setTicket(prevTicket => ({ ...prevTicket, passengerCount: prevTicket.passengerCount + 1 }));  
  }
    const removePassenger = (indexToRemove) => {
      setPassengers(passengers.filter((_, index) => index !== indexToRemove));
      setTicket(prevTicket => ({ ...prevTicket, passengerCount: prevTicket.passengerCount - 1 })); 
    };
  const makePayment = async (e) =>{

    e.preventDefault()

    if(ticket.passengerCount>0)
    { 
      
    
    axios.post('https://railquest.onrender.com/api/payment',{ticketInfo:ticket,userId:username.userId,passengers,payment:payment},{
      headers:{
        'x-access-token':localStorage.getItem('token')
      }
    }).then((res)=>{
      console.log(res.data.payment_id)
      if(res.data.isDone===true){
        alert('Payment Done')
        axios.post('https://railquest.onrender.com/api/book-ticket',{ticketDetails:ticket,userId:username.userId,passengers,crucks,payment_id:res.data.payment_id}
        ,{
          headers:{
            'x-access-token':localStorage.getItem('token')
          }
        }
        ).then((res)=>{
          
          if(res.data==='Transaction Completed'){
            alert("Ticket sent to your E-Mail!")
            setIsLodaing(false)
            window.location.href='/user'
          }

        })
      }
    
    })
  }

    }
    const handlePassengerChange = (index, field, value) => {
      setPassengers(prevPassengers => {
          const updatedPassengers = [...prevPassengers];
          updatedPassengers[index] = {
              ...updatedPassengers[index],
              [field]: value
          };
          return updatedPassengers;
      });
  };

  return (<div className='h-screen w-full bg-gradient-to-r from-[#591979] via-[#991986] to-[#591979]'>
    {isLoading&&
     <div className="absolute h-full w-full flex justify-center items-center backdrop-blur-sm z-50">
     <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-[#96469A]" />
   </div>
    }
    <center><div className='h-screen w-full justify-center items-center gap-5 overflow-scroll p-32'>
       
     <div className='h-[32%] w-1/3 bg-slate-100 rounded-lg'>
     Source      : {crucks.source}<br/>
     Destination : {crucks.destination}<br/>
     Travel Date : {crucks.date}<br/>
     Train-Number: {ticket.trainNumber}<br/>
     Train-name  : {ticket.trainName}<br/>
     class       : {ticket.class}<br/>
     Price       : {ticket.price}<br/>
     Number of passengers: {ticket.passengerCount}<br/>
     Total Amount Payable : {ticket.passengerCount*ticket.price}
     </div>
     <form method='post'>
     {passengers.map((passengers,index)=>{
      return <div key={index+1} className='h-[70%] w-1/2 bg-yellow-200 rounded-xl overflow-y-scroll flex flex-col justify-center items-center m-5'>
  
      <div className='h-96 w-full flex flex-col justify-center items-center gap-5 bg-slate-300'>
         <input 
 onChange={(e) => handlePassengerChange(index, 'passengerName', e.target.value)}
         className=' h-12 w-1/2  border-2 border-black rounded-md text-xl'
         type='name' placeholder='Passenger Name' required/>
          <input 
           onChange={(e) => handlePassengerChange(index, 'Age', e.target.value)}
          className=' h-12 w-1/2  border-2 border-black rounded-md text-xl'
         type='number' placeholder='Passenger Age' required/>
          <select 
                     onChange={(e) => handlePassengerChange(index, 'Gender', e.target.value)}
          name='gender'
          required={true}
         className=' h-12 w-1/2  border-2 border-black rounded-md text-xl'>
          <option value=''>
            Select Gender
          </option>
          <option value='Male'>
            Male
          </option>
          <option value='Female'>
            Female
          </option>
          <option value='Other'>
            Other
          </option>
         
         </select>
         <input 
          onChange={(e) => handlePassengerChange(index, 'ContactNo', e.target.value)}
             className=' h-12 w-1/2  border-2 border-black rounded-md text-xl'
         type='number' placeholder='Contact No.' required/>
         <input 
          onChange={(e) => handlePassengerChange(index, 'Country', e.target.value)}
             className=' h-12 w-1/2  border-2 border-black rounded-md text-xl'
         type='name' placeholder='Country' required/>
         <button onClick={() => removePassenger(index)}>Remove</button>

      </div>
      </div>
     })}
     <Button 
     onPress={onOpen}>makePayment</Button>
     </form>
     <button
     onClick={addNewPassenger}
     >Add new Passenger</button>
     </div></center>
     <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Payment Method</ModalHeader>
              <ModalBody>
               <select onChange={(e)=>{
                setPayment(e.target.value)
                console.log(payment)
               }}>
                <option value={"UPI"}>
                  UPI
                </option>
                <option value={"NETBANKING"}>
                  NETBANKING
                </option>
               </select>
              
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={makePayment} >
                  Pay
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
     </div>

  )
}

export default Passenger