import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    // relative: because the Header is "fixed"
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
      </Head>
      <Header/>
      <main>
        <Banner/>
        <section>
          {/* Rows */}
          {/* Rows */}
          {/* Rows */}
          {/* Rows */}
          {/* Rows */}
          {/* Rows */}
        </section>
      </main>
      {/* Modal */}
    </div>
  )
}

export default Home
