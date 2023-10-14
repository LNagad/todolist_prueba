import { useRef } from 'react'

const useModal = () => {
   const modalRef = useRef<HTMLDialogElement>(null)

   const handleShowModal = () => {
      modalRef.current?.classList.remove('close')
      modalRef.current?.classList.remove('hidden')
      modalRef.current?.showModal()
   }
 
   const handleCloseModal = () => {
      modalRef.current?.classList.add('close')
      setTimeout(() => {
         modalRef.current?.close()
      }, 500)
   }
 
   return {
      // properties
      modalRef,
      // methods
      handleShowModal,
      handleCloseModal
   }
}

export default useModal