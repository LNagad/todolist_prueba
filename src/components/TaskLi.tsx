import { useTaskStore } from '../store'
import { Task } from '../types'
import { HiMiniPencilSquare } from 'react-icons/hi2'
import { CgTrash }from 'react-icons/cg'

const TaskLi = ({id, title, content = '', date, isFinished} : Task) => {
      
   const activeTask  = useTaskStore(state => state.activeTask)
   const setActiveTask  = useTaskStore(state => state.setActiveTask)
   const loadTasks = useTaskStore(state => state.loadTasks)
   const tasks= useTaskStore(state => state.tasks)
   
   const handleIsCompleted = () => {
      //TODO: Dispatch action to set task to completed
      console.log('handle is completed')
      const newTasks = tasks.filter(task => task.id !== id)
      const allTasks = [...newTasks, {id, title, content, date, isFinished: !isFinished}]
      console.log(allTasks)
      loadTasks(allTasks)

   }

   const handleEditTask = () => {
      //TODO: Dispatch action to set editing mode
      //TODO: Dispatch action to set task to edit
      //TODO: Dispatch action to set modal to open
      alert('Editing task')
   }

   const handleSetActiveTask = () => {
      setActiveTask({id, title, content, date, isFinished})
   }
   
   return (
      <li 
         onClick={ handleIsCompleted } 
         className="group relative flex items-center px-3 py-2 gap-x-3 hover:bg-indigo-700 rounded-2xl">
         <input 
            onClick={ handleIsCompleted} 
            checked={isFinished} 
            onChange={() => {}}
            type="checkbox" 
            className="checked:bg-indigo-700 outline-none text-indigo-700 w-4 rounded-xl" />
         <div> 
            <p className={`select-none ${isFinished && 'line-through'} group-hover:text-white
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