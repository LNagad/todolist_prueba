import { useTaskStore } from '../store'
import { Task } from '../types'
import { HiMiniPencilSquare } from 'react-icons/hi2'
import { CgTrash }from 'react-icons/cg'
import Swal from 'sweetalert2'
import { useFireStore } from '../firebase'

const TaskLi = ({id, title, content, date, isFinished} : Task) => {
   
   const setShowEditModal = useTaskStore(state => state.setShowEditModal)
   const setEditModalTask = useTaskStore(state => state.setEditModalTask)
   const { startDeletingTask, startSavingTask } = useFireStore()

   const handleIsCompleted = () => {
      startSavingTask({id, title, content, date, isFinished: !isFinished})
   }

   const handleEditTask = () => {
      setEditModalTask({id, title, content, date, isFinished})
      setShowEditModal(true)
   }

   const handleDeleteTask = async () => {
      const result = await Swal.fire({
         title: 'Are you sure?',
         text: 'You won\'t be able to recover this task!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
      })
    
      if (result.isConfirmed) {
         const success = await startDeletingTask({id, title, content, date, isFinished})
    
         if (success) {
            Swal.fire('Deleted!', `Task ${title} has been deleted.`, 'success')
         } else {
            console.log(success)
            Swal.fire('Error', 'Something went wrong', 'error')
         }
      }
   }

   
   return (
      <li
         onDoubleClick={handleIsCompleted}
         className="group relative flex items-center px-3 py-2 gap-x-3 hover:bg-indigo-700 rounded-2xl"
      >
         <input
            onClick={handleIsCompleted}
            checked={isFinished}
            onChange={() => {}}
            type="checkbox"
            className="checked:bg-indigo-700 outline-none text-indigo-700 w-4 rounded-xl"
         />
         <div>
            <p
               className={`select-none ${
                  isFinished && 'line-through'
               } group-hover:text-white
             text-gray-500 font-bold outline-none focus:outline-none focus:ring-0 ring-0
              text-sm text-opacity-80`}
            >
               {title}
            </p>
            <p
               className="select-none group-hover:text-white group-hover:text-opacity-60 text-gray-500 
                font-semibold text-xs text-opacity-50"
            >
               {date}
            </p>
         </div>
         <button
            onClick={handleDeleteTask}
            type="button"
            className={`bg-transparent p-2 rounded-full 
            absolute z-50  right-0 hidden group-hover:flex`}
         >
            <CgTrash className="text-white text-4xl " />
         </button>
         <button
            onClick={handleEditTask}
            type="button"
            className="bg-transparent p-2 rounded-full 
            absolute z-50 right-9  hidden group-hover:flex"
         >
            <HiMiniPencilSquare className="text-white text-4xl " />
         </button>
      </li>
   )
}

export default TaskLi