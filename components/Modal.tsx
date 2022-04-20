// * ========== Imports ==========
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
// *========== Variables & Functions ==========
const Modal = () => {
  // comes from the library recoil
  // modalState declared in modalAtom.ts
  // if true will display Modal component
  // useRecoilState works just like useState
  const [showModal, setShowModal] = useRecoilState(modalState)

  const handleClose = () => {
    setShowModal(false)
  }

  // * ========== HTML ==========
  return (
    //   open: just when showModal is true
    <MuiModal open={showModal} onClose={handleClose}>
      <>Modal</>
    </MuiModal>
  )
}

export default Modal
