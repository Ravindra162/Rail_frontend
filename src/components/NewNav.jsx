import React,{useEffect} from 'react'
import axios from 'axios';
import {Button, ButtonGroup} from "@nextui-org/react";
import {Avatar} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
const NewNav = ({color}) => {
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('http://localhost:3000/api/user',{
       headers:{
           'x-access-token':localStorage.getItem('token')
       }
   }).then((response)=>{
    console.log(response)
    if(response.data.role==='admin'){ 
      console.log('admin')
      navigate('/admin')
      }
  })
   },[])
  return (
    <>
    <div className="h-[15%] w-full  flex justify-between items-center" id="Navbar">
        <div className="h-full w-3/5 flex justify-evenly items-center mr-10" id="Navbar-left">
       <h2 className="font-bold text-4xl ">RailQuest</h2>
       <div className='h-12 w-24 flex justify-center items-center'><h3 className={`cursor-pointer text-xl transition ease-in-out delay-400 hover:text-[${color}] hover:-translate-y-1 hover:scale-110 duration-100`}>Home</h3></div>
       <div className='h-12 w-24 flex justify-center items-center'><h3 className={`cursor-pointer text-xl transition ease-in-out delay-400 hover:text-[${color}] hover:-translate-y-1 hover:scale-110 duration-100`}>Services</h3></div>
       <div className='h-12 w-24 flex justify-center items-center'><h3 className={`cursor-pointer text-xl transition ease-in-out delay-400 hover:text-[${color}] hover:-translate-y-1 hover:scale-110 duration-100`}>About</h3></div>
    </div>
    <div className="h-full w-2/5 flex justify-center items-center" id="Navbar-right">
    {!localStorage.getItem('token')?<Button className="bg-[#7C1882] text-white p-4"
    onClick={()=>{
      navigate('/')
    }}
    >
                Login
                </Button>: <Dropdown className='mx-10'>
      <DropdownTrigger>
      <Avatar  className='h-12 w-12 cursor-pointer' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Action event example" className='bg-white '>
       <DropdownItem key="profile"
       onClick={()=>{navigate('/user/profile')}}
       >Profile</DropdownItem>
        <DropdownItem key="logout" className="text-danger" color="danger"  onClick={
      (e)=>{
        if(e.target.innerText==='Logout'){
          localStorage.removeItem('token');
          navigate('/')
        }
  

      }}>
        <button 
     className=''>Logout</button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>}
    </div>
    </div>
    
    </>
  )
}

export default NewNav