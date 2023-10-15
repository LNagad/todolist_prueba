
import { useTaskStore } from '../store'
import { useForm } from '.'
import { Task } from '../types'
import { useFireStore } from '../firebase'
import Swal from 'sweetalert2'

interface Props {
   task?: Task | null
   handleCloseModal: () => void
}

const useModalFirebase = ({task, handleCloseModal} : Props ) => {

   const { title, content, date, handleOnChange, handleResetForm } = useForm(task)
   const { isSavingTask }  = useTaskStore(state => state)
   const { startSavingTask } = useFireStore()

   const modalTitle = task ? 
      <p>Editing task<strong className="ms-1">{task.title}</strong></p>
      : 'Add new task'

   const handleOnSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

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
   
   return { 
      title, 
      content, 
      date, 
      modalTitle,
      isSavingTask,
      handleOnChange, 
      handleResetForm,
      handleOnSubmit 
   }
}

export default useModalFirebase