import { useState } from "react"

const TaskLi = () => {
   const [isCompleted, setIsCompleted] = useState(false)
   console.log(isCompleted)
   const handleIsCompleted = () => {
      setIsCompleted(!isCompleted)
   }
   return (
      <li onDoubleClick={ handleIsCompleted } className="group flex items-center px-3 py-2 gap-x-3 hover:bg-indigo-700 rounded-2xl">
         <input onClick={ handleIsCompleted} checked={isCompleted} type="checkbox" className="checked:bg-indigo-700 outline-none text-indigo-700 w-4 rounded-xl" />
         <div> 
            <p className="select-none group-hover:text-white text-gray-500 font-bold outline-none focus:outline-none focus:ring-0 ring-0 text-sm text-opacity-80">item 1</p>
            <p className="select-none group-hover:text-white group-hover:text-opacity-60 text-gray-500 
                font-semibold text-xs text-opacity-50">12/14/2200
            </p>
         </div>
      </li>
   )
}

export default TaskLi