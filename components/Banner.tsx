// * ========== Imports ==========

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'

// * ========== TS Types ==========

interface Props {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: Props) => {
  // *========== Variables & Functions ==========

  // stores the random Movie selected in useEffect
  // <Movie | null> TS type either Movie or null
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    //   get the random Movie from the netflixOriginals which contains 20 of them
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length + 1)]
    )
  }, [netflixOriginals])


  

  // * ========== HTML ==========
  return (
    //   ! text on lg screen needs adjustments
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
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
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      {/* style={{textShadow: "1px 1px black"}} */}
      {/* text-shadow-md is from the library tailwindcss-textshadow, not shure why we need a library for it... above is my solution */}
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black"  >
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button className="bannerButton bg-[gray]/70">
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  )
}

export default Banner
