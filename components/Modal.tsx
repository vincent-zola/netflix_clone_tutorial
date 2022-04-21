// * ========== Imports ==========
import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from '@heroicons/react/outline'
import MuiModal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
// add lazy at the end for lazy-load
import ReactPlayer from 'react-player/lazy'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Genre, Movie } from '../typings'
import { Element } from '../typings'
// *========== Variables & Functions ==========
const Modal = () => {
  // comes from the library recoil
  // modalState declared in modalAtom.ts
  // if true will display Modal component
  // useRecoilState works just like useState
  const [showModal, setShowModal] = useRecoilState(modalState)
  // stores the random Movie selected in Banner.tsx
  const [movie, setMovie] = useRecoilState(movieState)
  // will contain key from fetched video, which is part of an url from YT
  const [trailer, setTrailer] = useState('')
  // will contain array of genres of our fetched video, obj: Id and name
  const [genres, setGenres] = useState<Genre[]>([])
  // state for muting the player
  const [muted, setMuted] = useState<boolean>(true)

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
          // besides trending all other have a "movie" attribute
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
          // this gives us back the videos
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error))

      if (data?.videos) {
        // find the index of video with the "Trailer" attribute
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        // assign key property from fetched data to trailer
        setTrailer(data.videos?.results[index]?.key)
      }
      // assign genres property from fetched data to genres
      if (data?.genres) {
        setGenres(data.genres)
      }
    }
    fetchMovie()
  }, [movie])

  console.log(genres)
  console.log(trailer)

  // * ========== HTML ==========
  return (
    //   open: just when showModal is true
    // "!": to override MU styles
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        {/* // * ===== Close Button ===== */}
        {/* modalButton custom className in globals.css */}
        <button
          onClick={handleClose}
          className="modalButton absolute top-5 right-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6 " />
        </button>
        {/* // * ===== Player ===== */}
        {/* the following styling is react-player specific, see npm docs */}
        <div className="relative pt-[56.25%]">
          {/* ReactPlayer comes from the react-player library*/}
          <ReactPlayer
            // insert fetched video code to YT url
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            // the following styling is react-player specific, see npm docs
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          {/* // * ===== Buttons ===== */}
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10 ">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black " />
                Play
              </button>
              {/* modalButton custom class in global.css */}
              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button className="modalButton" onClick={()=> setMuted(!muted)} >
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal
