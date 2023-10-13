interface Props {
    handleCloseModal: () => void
    modalRef:  React.RefObject<HTMLDialogElement>
}

const Modal = ({ modalRef, handleCloseModal } : Props) => {
   return (
      <dialog 
         ref={modalRef}
         className="dialog p-5 w-11/12 rounded-xl bg-white "  
      >
         <h3>hello</h3>
         <form>
            <input type="text" placeholder="type your task" />
         </form>
         <button 
            onClick={handleCloseModal}
            className="bg-gray-600 px-4 py-3 self-start rounded-xl text-white">Close</button>
      </dialog>
   )
}

export default Modal