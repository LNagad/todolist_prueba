import { useState } from 'react'
import { HiMiniPencilSquare } from 'react-icons/hi2'

interface Props {
   title: string
   content?: string
   date: string
   isFinished: boolean
}

const TaskLi = ({title, content, date, isFinished} : Props) => {
   const [isCompleted, setIsCompleted] = useState(isFinished)
   
   const handleIsCompleted = () => {
      //TODO: Dispatch action to set task to completed
      setIsCompleted(!isCompleted)
   }

   const handleEditTask = () => {
      //TODO: Dispatch action to set editing mode
      //TODO: Dispatch action to set task to edit
      //TODO: Dispatch action to set modal to open
      alert('Editing task')
   }
   
   return (
      <li 
         onClick={ handleIsCompleted } 
         className="group flex items-center px-3 py-2 gap-x-3 hover:bg-indigo-700 rounded-2xl">
         <input 
            onClick={ handleIsCompleted} 
            checked={isCompleted} 
            type="checkbox" 
            className="checked:bg-indigo-700 outline-none text-indigo-700 w-4 rounded-xl" />
         <div> 
            <p className={`select-none ${isCompleted && 'line-through'} group-hover:text-white
             text-gray-500 font-bold outline-none focus:outline-none focus:ring-0 ring-0
              text-sm text-opacity-80`}>
               {title}
            </p>
            <p className="select-none group-hover:text-white group-hover:text-opacity-60 text-gray-500 
                font-semibold text-xs text-opacity-50">
               {date}
            </p>
         </div>
         <button type='button' className="bg-indigo-700 custom-shadow p-2 rounded-full absolute z-50 right-10 bottom-32 hidden group-hover:flex">
            <HiMiniPencilSquare className='text-white text-4xl ' />
         </button>
      </li>
   )
}

export default TaskLi