// * ========== Imports ==========

import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'

// * ========== TS Types ==========

interface Inputs {
  email: string
  password: string
}

// *========== Variables & Functions ==========

const Login = () => {
  // use useAuth to import the State from useAuth component and extract the values
  const { signIn, signUp } = useAuth()
  //check if log in or sign up button was pressed
  const [login, setLogin] = useState(false)
  // these form variables are from the library: react-hook-form, which let us validate the input from the user before the submit happened
  const {
    // register is for input element
    register,
    // handleSubmit is for form element
    handleSubmit,
    // formState gives us custom Error messages for the user and could be put in label element
    formState: { errors },
  } = useForm<Inputs>()
  // onSubmit Fn. checks our Email and Password and is used in form element
  // we getting email and password because we invoked register in our input
  // : SubmitHandler<Inputs> is the type of onSubmit
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    // check if user clicked on the Sign In button
    if (login) {
      // setLogin(true)
      await signIn(email, password)
    } else {
      // setLogin(false)
      await signUp(email, password)
    }
  }

  // * ========== HTML ==========

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="./netflix_thumbnail.ico" />
      </Head>
      {/* // * ========== Background Img ========== */}
      <Image
        src="https://rb.gy/p2hphi"
        // changed the bg to local
        // src="/login_background.jpg"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      {/* // * ========== Logo ========== */}

      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      {/* // * ========== Form ========== */}
      {/* space-y: space between children */}
      {/* added text-black because in global.css we specified white... */}
      <form
        // "handleSubmit" will validate your inputs before invoking "onSubmit"
        // onSubmit= is method of React and (onSubmit) is our custom Fn. declared at the top
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14  "
      >
        <h1 className="text-4xl font-semibold ">Sign In</h1>

        {/* // * ========== Email ========== */}

        <div className=" space-y-4 ">
          <label className="inline-block w-full ">
            <input
              type="email"
              placeholder="Email"
              className="input"
              // register your input into the hook by invoking the "register" function
              // required: true: email will be required
              {...register('email', { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>

          {/* // * ========== Password ========== */}

          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register('password', { required: true })}
            />

            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        {/* // * ========== Button Sign In ========== */}

        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold "
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>

        {/* // * ========== Button Sign up now ========== */}

        <div className="text-[gray]">
          New to Netflix?{' '}
          <button
            type="submit"
            className="text-white hover:underline "
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
