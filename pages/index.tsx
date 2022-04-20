// * ========== Imports ==========

import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typings'
import requests from '../utils/requests'

// * ========== TS Types ==========

// define TS Props
interface Props {
  // assign our type Prop from typings.d.ts to our variable
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

// *========== Variables & Functions ==========

// : Props: means we assign a type with TS to our variable
const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  // use useAuth to import the State from useAuth component and extract the values
  const { logout, loading } = useAuth()
  // ! I suppose we need to add a loading screen, lol
  if (loading) return null

  // * ========== HTML ==========
  return (
    // relative: because the Header is "fixed"
    // bg-gradient-to-b is custom defined at tailwind.config.js
    <div className="relative h-screen bg-gradient-to-b  lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="./netflix_thumbnail.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List Component*/}

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {/* Modal */}
    </div>
  )
}

export default Home

// * ========== ServerSide Rendering ==========

// naming is important, next.js will know by the use of the word ServerSide to render it on the server
export const getServerSideProps = async () => {
  // create variables array and assign different api endpoints to each variable
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
    // Promise.all: Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected. Basically so that we don't have to use await for every fetch operation.
  ] = await Promise.all([
    // fetch(variable created in requests.ts) than convert res(response, you can call it whatever you want) from api in to json and store it in netflixOriginals
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    // in ServerSideRendering, if you return props, they can be used in our components
    props: {
      // .results is just an key of the obj which we are getting from the api, the other ones should be page, total_results and so on...
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}
