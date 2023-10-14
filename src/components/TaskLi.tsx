import { useState } from 'react'
import { useTaskStore } from '../store'
import { Task } from '../types'
import { HiMiniPencilSquare } from 'react-icons/hi2'
import { CgTrash }from 'react-icons/cg'

const TaskLi = ({id, title, content = '', date, isFinished} : Task) => {
   const [isCompleted, setIsCompleted] = useState(isFinished)
   const { activeTask, setActiveTask, clearActiveTask }  = useTaskStore(state => state)

   
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

   const handleSetActiveTask = () => {
      if (activeTask?.id === id) return
      setActiveTask({id, title, content, date, isFinished})
   }
   
   return (
      <li 
         onMouseEnter={ handleSetActiveTask }
         onDoubleClick={ handleIsCompleted } 
         className="group relative flex items-center px-3 py-2 gap-x-3 hover:bg-indigo-700 rounded-2xl">
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
         <button type='button' className={`bg-transparent p-2 rounded-full 
            absolute z-50  right-0 hidden group-hover:flex`}>
            <CgTrash className='text-white text-4xl ' />
         </button>
         <button type='button' className="bg-transparent p-2 rounded-full 
            absolute z-50 right-9  hidden group-hover:flex">
            <HiMiniPencilSquare className='text-white text-4xl ' />
         </button>
      </li>
   )
}

export default TaskLi