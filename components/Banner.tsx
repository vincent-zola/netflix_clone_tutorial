// * ========== Imports ==========

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

// * ========== TS Types ==========

interface Props {
  netflixOriginals: Movie[]
}
// *========== Variables & Functions ==========

const Banner = ({ netflixOriginals }: Props) => {
  // stores the random Movie selected in useEffect
  // <Movie | null> TS type either Movie or null
  const [movie, setMovie] = useState<Movie | null>(null)
  // comes from the library recoil
  // modalState declared in modalAtom.ts
  // if true will display Modal component
  // useRecoilState return a tuple
  const [showModal, setShowModal] = useRecoilState(modalState)
  // movieState declared in modalAtom.ts
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {
    //   get the random Movie from the netflixOriginals which contains 20 of them
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length + 1)]
    )
  }, [netflixOriginals])

  // * ========== HTML ==========
  return (
    // removed: lg:h-[65vh]
    // added: lg:pt-72 customLg:pt-16
    <div className="flex flex-col space-y-2 py-16 md:space-y-4  lg:justify-end lg:pb-12 lg:pt-72 customLg:pt-16">
      {/* // * ===== Poster Img =====
       */}
      {/* height and width must be provided to the parent of img for the img to load */}
      {/* absolute and z index so that the img is behind the text and on top of the page */}
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        {/* movie?: Optional Chaining, if movie property does't exist returns undefined instead of error */}
        {/* backdrop_path and poster_path are jpg's from movie obj */}
        {/* baseUrl: we need it because the API does't provide the full path to the image, so we need to add it, created in movies.ts */}
        {/* as we use Image Nextjs component we need to update the next.config.js file and add the image src, next will convert the img and lazy load it */}
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
          // priority={true}
        />
      </div>
      {/* // * ===== Movie Title =====
       */}
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      {/* // * ===== Movie Description =====
       */}

      {/* style={{textShadow: "1px 1px black"}} */}
      {/* text-shadow-md is from the library tailwindcss-textshadow, not shure why we need a library for it... above is my solution */}
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      {/* // * ===== Play and More Info Buttons =====
       */}
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            // pass movie to recoil
            setCurrentMovie(movie)
            setShowModal(true)
          }}
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  )
}

export default Banner
