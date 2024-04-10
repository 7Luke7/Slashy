import { Footer } from "../Components/Footer";
import { Fragment, useState } from "react";
import {Helmet} from "react-helmet-async"
import Logo from "../public/slashy_logo.webp"

const Login = () => {
  const [email, setEmail] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [message, setMessage] = useState({
    success: false,
    message: ""
  })

  const SubmitLoginForm = async (e) => {
    e.preventDefault()
    try {
        const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: email,
              password: passwordInput,
            }),
        })
        console.log(request)

        if (request.status === 429) {
          throw new Error("Your request limit has been reached. try again after 5 seconds.")
        }
        const message = await request.json()

        if (!request.ok) {
          throw new Error(message.message)
        }
        
        setMessage({
          success: true,
          message: "successfully signed in"
        })

        window.location.assign("/dashboard")
      } catch (error) {
      setMessage({
        success: false,
        message: error.message
      })
    }
  }

  return (
    <Fragment>
      <Helmet>
        <title>
          Signin - Slashy affiliate
        </title>
      </Helmet>
    <div className="xxs:flex xs:block xxs:items-center xxs:justify-center sm:block p-7">
        <a href="/">
            <img loading="lazy" className="xxs:w-[80px] lg:w-[90px] object-cover xxs:h-[50px] lg:h-[40px]" src={Logo} alt="ლოგო"></img>
        </a>
    </div>
      <section className="flex items-center justify-center">
        <div className="flex h-full flex-[6] flex-col justify-center px-6 py-12 lg:px-8">
          <div className="h-[450px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1 className="mt-10 text-gray-800 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
                Sign in as an affiliate
              </h1>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-3" onSubmit={SubmitLoginForm}>
                <Fragment>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm border outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(237,123,82)] sm:text-sm sm:leading-6"
                    />
                  </div>
                </Fragment>

                <Fragment>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Password
                      </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      onChange={(e) => setPasswordInput(e.target.value)}
                      value={passwordInput}
                      type="password"
                      required
                      className="block px-3 w-full rounded-md py-1.5 text-gray-900 shadow-sm border outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(237,123,82)] sm:text-sm sm:leading-6"
                    />
                  </div>
                </Fragment>

                {message && message.message && <p className={`text-[10px] ${message.success ? "text-green-500" : "text-red-500"} font-semibold`}>{message.message}</p>}
                <Fragment>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[rgb(237,123,82)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[rgb(225,123,70)]"
                  >
                    Sign in
                  </button>
                </Fragment>
              </form>

              <p className="mt-4 text-center text-[13px] text-gray-500">
                Don't have an account?
                <a
                  href="/signup"
                  className="font-semibold leading-6 text-[rgb(237,123,82)] hover:text-[rgb(225,123,70)]"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </Fragment>
  );
};

export default Login;