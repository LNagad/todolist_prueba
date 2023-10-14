import { Modal } from "./components";
import { useAddNewModal } from "./hooks";
import { getMonthName } from "./utils";

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
                  <li className="group flex items-center px-3 py-2 gap-x-3 hover:bg-indigo-700 rounded-2xl">
                     <input type="checkbox" className="checked:bg-indigo-700 outline-none text-indigo-700 w-4 rounded-xl" />
                     <div>
                        <p className="group-hover:text-white text-gray-500 font-bold outline-none focus:outline-none focus:ring-0 ring-0 text-sm text-opacity-80">item 1</p>
                        <p className="group-hover:text-white group-hover:text-opacity-60 text-gray-500 
                        font-semibold text-xs text-opacity-50">12/14/2200
                        </p>
                     </div>
                  </li>
                  <li className="group flex items-center px-3 py-2 gap-x-3 hover:bg-indigo-700 rounded-2xl">
                     <input type="checkbox" className="checked:bg-indigo-700 text-indigo-700 w-4 rounded-xl" />
                     <div>
                        <p className="group-hover:text-white text-gray-500 font-bold outline-none focus:outline-none focus:ring-0 ring-0 text-sm text-opacity-80">item 1</p>
                        <p className="group-hover:text-white group-hover:text-opacity-60 text-gray-500 
                        font-semibold text-xs text-opacity-50">12/14/2200
                        </p>
                     </div>
                  </li>
                  
               </ul>
            </div>
         </section>
         <Modal modalRef={ modalRef } handleCloseModal={ handleCloseModal } />
      </main>
   );
}

export default App;
