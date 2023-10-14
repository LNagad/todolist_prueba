import { Modal, TaskLi } from './components';
import { useAddNewModal } from './hooks';
import { getMonthName } from './utils';
import { domiData } from './utils';

const currentDate = new Date();
const currentDay = currentDate.getDate();
const monthIndex  = currentDate.getMonth();
const monthName = getMonthName(monthIndex);


function App() {
   const { modalRef, handleCloseModal, handleShowModal } = useAddNewModal();

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
                     <p className="text-xs -mt-0.5 text-white text-opacity-70">8 tasks</p>
                  </div>
                  
                  <button 
                     className="bg-white text-indigo-700 font-bold text-opacity-80 px-4 py-3 rounded-xl"
                     onClick={handleShowModal}>
                     Add New
                  </button>
               </div>
         '  </div>
            <div className='bg-slate-50  h-[calc(100vh-144px)] rounded-tl-[30px] p-6 shadow-xl'>
               <ul className="flex flex-col gap-y-2">
                  {domiData
                     .sort((a, b) => Number(a.isFinished) - Number(b.isFinished)) // Sort by isFinished in ascending order
                     .map((item, index) => (
                        <TaskLi key={index} {...item} />
                     ))}
               </ul>
            </div>
         </section>
         <Modal modalRef={ modalRef } handleCloseModal={ handleCloseModal } />
      </main>
   );
}

export default App;
