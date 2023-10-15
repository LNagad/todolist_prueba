import { collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../'
import { Task } from '../../types'

export const useFireStore = () => {
   
   const startSavingTask = async (task: Task) => {
      //TODO: DISPATCH SET SAVING LOADING
   
      const newNote = {...task}
   
      if (task.id) {
         const docRef = doc(FirebaseDB, `todo/tasks/${newNote.id}`)
         await setDoc(docRef, newNote, { merge: true })
      } else {
         const newDoc = doc(collection(FirebaseDB, 'tasks'))
         newNote.id = newDoc.id
         await setDoc(newDoc, newNote, { merge: true })
         return true
      }
   }
   
   return {
      startSavingTask
   }
}
