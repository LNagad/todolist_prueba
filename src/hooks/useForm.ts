import { useEffect, useState } from 'react'
import { Task } from '../types'

const useForm = (task: Task | null | undefined) => {
    
   const [form, setForm] = useState({
      title: '',
      content: '',
      date:  ''
   })
     
   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
        
      setForm({
         ...form,
         [name]: value
      })
   }
  
   useEffect(() => {
      setForm({
         title: task ? task.title : '',
         content: task ? task.content : '',
         date: task ? task.date : ''
      })
   },[task])
     
   const { title, content, date } = form

   return {
      title, 
      content, 
      date, 
      handleOnChange
   }
}

export default useForm