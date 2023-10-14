interface Props {
    handleCloseModal: () => void
    modalRef:  React.RefObject<HTMLDialogElement>
}

const Modal = ({ modalRef, handleCloseModal } : Props) => {
   return (
      <dialog 
         ref={modalRef}
         className="dialog p-5 w-11/12 rounded-xl bg-white flex flex-col gap-y-4 "  
      >
         <h3>Add new Task</h3>
         <form>
            <div className="w-full flex flex-col gap-y-2">
               <input 
                  className="px-4 py-2 ring-gray-300 ring-1 w-full focus:ring-indigo-700 focus:outline-indigo-700" 
                  type="text" 
                  placeholder="task title" 
               />
               <textarea 
                  name="" 
                  className="px-4 py-2 ring-gray-300 ring-1 w-full focus:ring-indigo-700 focus:outline-indigo-700" 
                  placeholder="task description">
               </textarea>
               <input 
                  className="px-4 py-2 ring-gray-300 ring-1 w-full focus:ring-indigo-700 focus:outline-indigo-700" 
                  type="date" 
               />
            </div>
         </form>
         <div className="w-full flex justify-between">
            <button 
               onClick={handleCloseModal}
               className="bg-gray-600 px-4 py-3 self-start rounded-xl text-white">Cancel</button>
            
            <button 
               onClick={handleCloseModal}
               className="bg-indigo-700 px-4 py-3 self-start rounded-xl text-white">Save</button>
         </div>
      </dialog>
   )
}

export default Modal