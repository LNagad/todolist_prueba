import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../'
import { Task } from '../../types'
import { useTaskStore } from '../../store'

export const useFireStore = () => {
   const setIsLoadingTasks = useTaskStore( state => state.setIsLoadingTasks )
   const loadTasks = useTaskStore( state => state.loadTasks )
   const addNewTask = useTaskStore( state => state.addNewTask )
   const updateTask = useTaskStore( state => state.updateTask )
   const deleteTask = useTaskStore( state => state.deleteTask )
   const setIsSavingTask = useTaskStore( state => state.setIsSavingTask )

   const startLoadingTasks = async () => {
      setIsLoadingTasks(true)
      const collectionRef = collection(FirebaseDB, 'tasks')
      const docsRef = await getDocs( collectionRef )
   
      const notes: any = []

      docsRef.forEach( doc => {
         notes.push( {...doc.data()})
      })

      loadTasks(notes)
      setIsLoadingTasks(false)
   }

   const startSavingTask = async (task: Task) => {
      
      setIsSavingTask(true)
      const newNote = {...task}
      
      if (task.id) {
         const docRef = doc(FirebaseDB, `tasks/${newNote.id}`)
         await setDoc(docRef, newNote, { merge: true })
         updateTask(newNote)
         
      } else {
         const newDoc = doc(collection(FirebaseDB, 'tasks'))
         newNote.id = newDoc.id
         await setDoc(newDoc, newNote, { merge: true })
         addNewTask(newNote)

      }

      setIsSavingTask(false)
      return true
   }

   const startDeletingTask = async (task: Task) => {
      const docRef = doc( FirebaseDB, `tasks/${task.id}`)
      console.log(task)
      const docSnapshot = await getDoc(docRef)

      if (docSnapshot.exists()) {
         // El documento existe, se puede eliminar
         try {
            await deleteDoc(docRef)
            deleteTask(task)
            return true
         } catch (error) {
            console.error(error)
            return false
         }
      } else {
         // El documento no existe, no se puede eliminar
         return false
      }
   }

   return {
      startSavingTask,
      startLoadingTasks,
      startDeletingTask
   }
}
