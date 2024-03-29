import React,{useState,useRef} from 'react'
import { Accordion,AccordionItem,Button,Input } from '@nextui-org/react';
import { classDataAtom } from '../../store/atoms/classData';
import { useRecoilState } from 'recoil';
import axios from 'axios'

const Add_date = () => {
    const [classData,setClassData] = useRecoilState(classDataAtom)
    const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
    const trainRef = useRef()
    const dateRef = useRef()
    const addNewClass = () =>{
        setClassData(prevClass=>{
            const classes = [...prevClass]
            classes.push({
                class:'',
                price:''
            })
            return classes
        })
        setOpenAccordionIndex(null)
      }
      const removeClass = (index) =>{

        if(classData.length<3){
          return  alert("Please add sufficient number of Classes")
        }
    
        setClassData(prevClasses=>{
            const classes = [...prevClasses]
            classes.splice(index)
            return classes
        })
        
      }
    return (
    <div>
        <Input type='number' placeholder='Train Number' ref={trainRef}/>
<Accordion>
            {classData.map((classes, index) => (
              <AccordionItem
                key={index}
                aria-label='new Route'
                title='new class'
                open={openAccordionIndex === index}
                onToggle={() => setOpenAccordionIndex(openAccordionIndex === index ? null : index)}
              >
                <form className='h-full w-full flex flex-col justify-center items-center gap-5 p-8 bg-slate-500 rounded-xl'>
    <input 
     onChange={(e) => {
      const updatedClass = [...classData];
      updatedClass[index] = {
        ...updatedClass[index],
        class: e.target.value
      };
      setClassData(updatedClass);
    }}
      value={classData.class}
      type='text'
      placeholder='Enter Class'
      className='input input-bordered w-full max-w-xs bg-slate-100'
    />
    <input 
      onChange={(e) => {
        const updatedClass = [...classData];
        updatedClass[index] = {
          ...updatedClass[index],
          price: e.target.value
        };
        setClassData(updatedClass);
      }}
      value={classData.price}
      type='number'
      placeholder='Enter price'
      className='input input-bordered w-full max-w-xs bg-slate-100'
    />
   
    <Button color='success' onClick={addNewClass}>
      Add another class
    </Button>
    <Button color='danger' onClick={() => removeClass(index)}>
      remove this class
    </Button>
  </form>
              </AccordionItem>
            ))}
          </Accordion>
<Input type='date' ref={dateRef}/><br/>
<Button color='primary'
onClick={()=>{

    axios.post('http://localhost:3000/api/admin/add_date',{
        trainNumber:trainRef.current.value,
        classData:classData,
        date:dateRef.current.value
    }).then(response=>{
        console.log(response)
    }).catch(err=>console.log(err))
}}
>Add</Button>
    </div>
  )
}

export default Add_date