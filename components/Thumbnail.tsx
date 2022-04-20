// * ========== Imports ==========

import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'

// * ========== TS Types ==========

interface Props {
  //! DocumentData is for Firebase, needs clarification
  // movie: Movie | DocumentData
  movie: Movie
}
// *========== Variables & Functions ==========

const Thumbnail = ({ movie }: Props) => {
  // comes from the library recoil
  // modalState declared in modalAtom.ts
  // if true will display Modal component
  // useRecoilState return a tuple
  const [showModal, setShowModal] = useRecoilState(modalState)
  // movieState declared in modalAtom.ts
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  
  // * ========== HTML ==========
  return (
    //   parent element of Image needs to contain the height and width
    // scale-105: scale img on hover to 105%
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  )
}

export default Thumbnail
