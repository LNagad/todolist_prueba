import { Task } from '../types'
import { useForm } from '../hooks'
import { useFireStore } from '../firebase'
import Swal from 'sweetalert2'

interface Props {
    handleCloseModal: () => void
    modalRef:  React.RefObject<HTMLDialogElement>
    task?: Task | null
}

const Modal = ({ modalRef, handleCloseModal, task } : Props) => {
   
   const { title, content, date, handleOnChange }= useForm(task)
   const { startSavingTask } = useFireStore()

   const modalTitle = task ? 
      <p>Editing task<strong className="ms-1">{task.title}</strong></p>
      : 'Add new task'

   const handleOnSubmit = async() => {
      
      if(task) {
         console.log('update task')
      } else {
         console.log('add task')
         const res =  await startSavingTask({ title, content, date, isFinished: false })
         handleCloseModal()
         if (res) Swal.fire('Task added', '', 'success')
      }
   }
   
   return (
      <dialog 
         ref={modalRef}
         className="dialog hidden p-5 w-11/12 md:w-6/12 lg:w-5/12 rounded-xl bg-white flex-col gap-y-4 "  
      >
         <div className="flex flex-col gap-y-4">
            <h3>{modalTitle}</h3>
            <form onSubmit={(e) => e.preventDefault()}>
               <div className="w-full flex flex-col gap-y-2">
                  <input 
                     autoComplete='off'
                     name='title'
                     value={title}
                     onChange={handleOnChange}
                     className="w-full px-4 py-2 ring-gray-300 ring-1 ring-opacity-10 rounded-lg focus:ring-indigo-700" 
                     type="text" 
                     placeholder="task title" 
                  />
                  <textarea 
                     autoComplete='off'
                     name="content"
                     value={content}
                     onChange={handleOnChange} 
                     className="w-full px-4 py-2 ring-gray-300 ring-1 ring-opacity-10 rounded-lg focus:ring-indigo-700" 
                     placeholder="task description">
                  </textarea>
                  <input 
                     autoComplete='off'
                     name="date"
                     value={date}
                     onChange={handleOnChange}
                     className="w-full px-4 py-2 ring-gray-300 ring-1 ring-opacity-10 rounded-lg focus:ring-indigo-700" 
                     type="date" 
                  />
               </div>
            </form>
            <div className="w-full flex justify-between">
               <button 
                  onClick={handleCloseModal}
                  className="bg-gray-600 px-4 py-3 self-start rounded-xl text-white">Cancel</button>
             
               <button 
                  onClick={handleOnSubmit}
                  type='submit'
                  className="bg-indigo-700 px-4 py-3 self-start rounded-xl text-white">
                  {task ? 'Update' : 'Add'}
               </button>
            </div>
         </div>
      </dialog>
   )
}

export default Modal