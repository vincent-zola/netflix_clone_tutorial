// * ========== Imports ==========
import { XIcon } from '@heroicons/react/outline'
import MuiModal from '@mui/material/Modal'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'
// *========== Variables & Functions ==========
const Modal = () => {
  // comes from the library recoil
  // modalState declared in modalAtom.ts
  // if true will display Modal component
  // useRecoilState works just like useState
  const [showModal, setShowModal] = useRecoilState(modalState)
  // stores the random Movie selected in Banner.tsx
  const [movie, setMovie] = useRecoilState(movieState)

  // * ===== Close Modal Fn. =====
  const handleClose = () => {
    setShowModal(false)
  }
  // * ===== Fetch Video. =====
  useEffect(() => {
    // if no movie than return nothing
    if (!movie) return
    // else fetch movie
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          // check if movie has a tv or movie attribute, append to url
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
          // this gives us back the videos
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())
      console.log(data)
      
    }
    fetchMovie()
  }, [movie])
 
  
  // * ========== HTML ==========
  return (
    //   open: just when showModal is true
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        {/* // * ===== Close Button ===== */}
        {/* modalButton custom className in globals.css */}
        <button
          onClick={handleClose}
          className="modalButton absolute top-5 right-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6 " />
        </button>
        <div></div>
      </>
    </MuiModal>
  )
}

export default Modal
