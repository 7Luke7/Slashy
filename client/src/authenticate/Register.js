import { Footer } from "../Components/Footer";
import { Fragment, useState } from "react";
import check from "../public/check.svg"
import {Helmet} from "react-helmet-async"
import Logo from "../public/slashy_logo.webp"
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [message, setMessage] = useState({
    success: false,
    message: ""
  })
  window.scrollTo(0, 0)

  const SubmitRegForm = async (e) => {
      e.preventDefault()
      try {
          const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/sign_up`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              credentials: "include",
              body: JSON.stringify({
                  email: email.trim(),
                  password: passwordInput.trim(),
              }),
          })

          if (request.status === 429) {
            throw new Error("Your request limit has been reached. try again after 5 seconds.")
          }

          const message = await request.json()

          if (!request.ok) {
            throw new Error(message.message)
          }
          
          setMessage({
            success: true,
            message: "successfully signed up"
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
      <meta
          name="description"
          content="Affiliate, Affiliate program, Signup affiliate program, Register affiliate program, Register slashy affiliate program, Signup slashy affiliate program"
        />
        <meta
          name="keywords"
          content="Affiliate, Affiliate program, signup, register, Slashy,"
        />
        <title>
          Affiliate signup - Slashy
        </title>
      </Helmet>
    <div className="xxs:flex xs:block xxs:items-center xxs:justify-center sm:block p-7">
        <Link to="/">
          <img loading="lazy" className="xxs:w-[80px] lg:w-[90px] object-cover xxs:h-[50px] lg:h-[40px]" src={Logo} alt="Logo"></img>
        </Link>
    </div>
      <section className="flex sm:mb-0 xxs:w-[95%] sm:w-[95%] lg:w-[80%] m-auto justify-between">
        <div className="h-full xxs:hidden sm:block flex-[6]">
        <ul className="flex gap-4 pl-5 flex-col justify-center h-[450px]">
            <div className="flex flex-col space-y-3">
                <li className="pl-3 text-sm text-gray-800 font-semibold">
                    Sign Up
                    <div className="flex">
                        <img decoding="lazy" src={check} alt="Checkmark" />
                        <p className="pl-2 w-full text-xs font-normal">
                            Joining our affiliate program is simple and free. Sign up through our website and get access to your unique affiliate dashboard.
                        </p>
                    </div>
                </li>
                <li className="pl-3 text-sm text-gray-800 font-semibold">
                    Promote
                    <div className="flex">
                        <img decoding="lazy" src={check} alt="Checkmark" />
                        <p className="pl-2 w-full text-xs font-normal">
                            Once you've signed up, you'll receive a unique affiliate link. Promote this link across your website, blog, social media, or email newsletters to drive traffic to our products.
                        </p>
                    </div>
                </li>
                <li className="pl-3 sm:hidden xl:block text-sm text-gray-800 font-semibold">
                    Earn Commissions
                    <div className="flex">
                        <img decoding="lazy" src={check} alt="Checkmark" />
                        <p className="pl-2 w-full text-xs font-normal">
                            Every time someone makes a purchase through your affiliate link, you'll earn a commission as high as <strong>25%</strong>. Our commission structure ensures you get rewarded for your efforts, with commissions paid out regularly.
                        </p>
                    </div>
                </li>
                <li className="pl-3 text-gray-800 text-sm font-semibold">
                    Track Performance
                    <div className="flex">
                        <img src={check} decoding="lazy" alt="Checkmark" />
                        <p className="pl-2 w-full text-xs font-normal">
                            Monitor your affiliate activities and track your performance through our intuitive dashboard. Get real-time insights into clicks, conversions, and earnings, allowing you to optimize your promotional strategies for better results.
                        </p>
                    </div>
                </li>
            </div>
        </ul>
        </div>
        <div className="flex h-full flex-[6] flex-col justify-center px-6 py-12 lg:px-8">
          <div className="h-[450px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1 className="mt-10 text-gray-800 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
                Sign up as an affiliate
              </h1>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-2" onSubmit={SubmitRegForm}>
                <Fragment>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  <div>
                    <input
                      id="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      name="password"
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
                    Sign up
                  </button>
                </Fragment>
              </form>

              <p className="mt-4 text-center text-[13px] text-gray-500">
                Already have an account?
                <Link to="/signin"
                  className="font-semibold leading-6 text-[rgb(237,123,82)] hover:text-[rgb(225,123,70)]"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </Fragment>
  );
};

export default Register;