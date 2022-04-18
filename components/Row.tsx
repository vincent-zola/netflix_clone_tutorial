// * ========== Imports ==========

import { Movie } from "../typings"


// * ========== TS Types ==========

interface Props {
    title: string
    movies: Movie[]
  }
const Row = ({title, movies}: Props) => {
  return <div>Row</div>
}

export default Row
