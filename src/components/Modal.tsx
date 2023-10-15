import { Task } from '../types'
import { useForm } from '../hooks'
import { useFireStore } from '../firebase'
import Swal from 'sweetalert2'
import { useTaskStore } from '../store'

interface Props {
    handleCloseModal: () => void
    modalRef:  React.RefObject<HTMLDialogElement>
    task?: Task | null
}

const Modal = ({ modalRef, handleCloseModal, task } : Props) => {
   
   const { title, content, date, handleOnChange, handleResetForm }= useForm(task)
   const { isSavingTask }  = useTaskStore(state => state)
   const { startSavingTask } = useFireStore()

   const modalTitle = task ? 
      <p>Editing task<strong className="ms-1">{task.title}</strong></p>
      : 'Add new task'

   const handleOnSubmit = async() => {
      
      if(task) {
         const res =  await startSavingTask({ id: task.id, title, content, date, isFinished: task.isFinished })
         handleCloseModal()
         if (res) Swal.fire('Task Updated!', '', 'success')
      } else {
         
         const res =  await startSavingTask({ title, content, date, isFinished: false })
         handleCloseModal()
         if (res) Swal.fire('Task added!', '', 'success')
      }
      handleResetForm()
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
                  <input type="text"  autoComplete='off' autoFocus={true} className='hidden' />
                  <input 
                     name='title'
                     value={title}
                     autoComplete='off'
                     autoFocus={false}
                     onChange={handleOnChange}
                     className="w-full px-4 py-2 ring-gray-300 ring-1 ring-opacity-10 rounded-lg focus:ring-indigo-700" 
                     type="text" 
                     placeholder="task title" 
                  />
                  <textarea 
                     autoComplete='off'
                     autoFocus={false}
                     name="content"
                     value={content}
                     onChange={handleOnChange} 
                     className="w-full px-4 py-2 ring-gray-300 ring-1 ring-opacity-10 rounded-lg focus:ring-indigo-700" 
                     placeholder="task description">
                  </textarea>
                  <input 
                     autoFocus={false}
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
                  className="bg-gray-600 px-4 py-3 self-start rounded-xl text-white font-bold">Cancel</button>
             
               <button 
                  onClick={handleOnSubmit}
                  type='submit'
                  disabled={isSavingTask}
                  className="bg-indigo-700 px-4 py-3 self-start rounded-xl
                   text-white flex items-center font-bold disabled:bg-indigo-500 disabled:cursor-wait">
                  {isSavingTask && 
                  (
                     <svg className="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                  )
                  }
                  {task ? isSavingTask ? 'Updating...' : 'Update' : isSavingTask ? 'Saving...' : 'Save'}
               </button>
            </div>
         </div>
      </dialog>
   )
}

export default Modal