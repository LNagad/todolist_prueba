import { Suspense, useEffect } from 'react'
import { useTaskStore } from './store'
import { useModal } from './hooks'
import { getMonthName, domiData } from './utils'
import { Modal, TaskLi } from './components'
import { useFireStore } from './firebase'

const currentDate = new Date()
const currentDay = currentDate.getDate()
const monthIndex  = currentDate.getMonth()
const monthName = getMonthName(monthIndex)


function App() {

   const { startLoadingTasks } = useFireStore()

   const { tasks, isLoadingTasks }  = useTaskStore(state => state)

   const showEditModal = useTaskStore(state => state.showEditModal)
   const editModalTask = useTaskStore(state => state.editModalTask)
   const setShowEditModal = useTaskStore(state => state.setShowEditModal)

   const { 
      modalRef, 
      handleCloseModal,
      handleShowModal 
   } = useModal()

   const { 
      modalRef : editModalRef, 
      handleCloseModal : handleEditClose, 
      handleShowModal: handleShowEditModal 
   } = useModal()

  
   const handleEditCloseModal = () => {
      setShowEditModal(false)
      handleEditClose()
   }

   useEffect(() => {
      startLoadingTasks()
   },[])

   showEditModal && handleShowEditModal()

   return (
      <main className="bg-indigo-700 w-screen h-screen relative">
         <section className="todo-list h-screen">
            <div className='header h-[144px] p-4 flex flex-col gap-y-8'>
              
               <div className="flex justify-center">
                  <h3 className="text-sm text-white capitalize font-bold">{currentDay} {monthName}</h3>
               </div>

               <div className="flex justify-between items-end">
                  <div className="font-bold">
                     <h2 className="text-lg text-white">Today</h2>
                     <p className="text-xs -mt-0.5 text-white text-opacity-70">{tasks?.length} tasks</p>
                  </div>
                  
                  <button 
                     className="bg-white text-indigo-700 font-bold text-opacity-80 px-4 py-3 rounded-xl"
                     onClick={handleShowModal}>
                     Add New
                  </button>
               </div>
            </div>
            <div className='bg-slate-50 h-[calc(100vh-144px)] rounded-tl-[30px] p-6 shadow-xl'>
               <ul className="flex flex-col gap-y-2">
                  <Suspense fallback={
                     <svg className="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                  }>
                     {tasks
                        .sort((a, b) => Number(a.isFinished) - Number(b.isFinished)) // Sort by isFinished in ascending order
                        .map((item, index) => (
                           <TaskLi key={index} {...item} />
                        ))}
                  </Suspense>
                 
               </ul>
            </div>
         </section>
         <Modal modalRef={ modalRef } handleCloseModal={ handleCloseModal } />
         <Modal modalRef={ editModalRef } handleCloseModal={ handleEditCloseModal } task={ editModalTask } />
      </main>
   )
}

export default App
