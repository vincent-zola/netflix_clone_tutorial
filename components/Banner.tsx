// * ========== Imports ==========

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'

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

  console.log(movie)

  // * ========== HTML ==========
  return (
    <div>
        {/* height and width must be provided to the parent of img for the img to load */}
      <div className="absolute top-0 left-0 h-[95vh] w-screen" >
        {/* movie?: Optional Chaining, if movie property does't exist returns undefined instead of error */}
        {/* backdrop_path and poster_path are jpg's from movie obj */}
        {/* baseUrl: we need it because the API does't provide the full path to the image, so we need to add it, created in movies.ts */}
        {/* as we use Image Nextjs component we need to update the next.config.js file and add the image src, next will convert the img and lazy load it */}
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit='cover'
        />
      </div>
    </div>
  )
}

export default Banner
