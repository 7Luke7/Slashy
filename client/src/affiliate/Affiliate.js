import { Footer } from "../Components/Footer"
import { Header } from "../Components/Header"
import {Helmet} from "react-helmet-async"
import agreement from "../public/agreement.svg"
import howitworks from "../public/howitworks.svg"
import whatisaffiliate from "../public/whatisaffiliate.svg"
import powerofaffiliate from "../public/powerofaffiliate.svg"
import { Link } from "react-router-dom"

export const Affiliate = () => {
    window.scrollTo(0, 0)
    return <div id="closeScroll">
        <Helmet>
            <meta name="description" content="Unlock your earnings potential with our affiliate program. Earn 25% commission on thousands of products. Sign up today!" />
            <meta name="keywords" content="affiliate program, affiliate marketing, commission, online marketing, earn money online" />
            <meta name="author" content="Slashy" />
            <title>Unleash Your Earnings Potential with Our Affiliate Program - Slashy</title>
        </Helmet>
        <Header></Header>
        <div>
                <div className="container w-[80%] mx-auto py-12">
                    <h1 className="xs:text-2xl font-bold text-center xxs:text-lg text-[#1b2559] mb-6">
                        Unleash Your Earnings Potential with Our Affiliate Program:<br/> Earn <strong className="text-[#f97316]">25%</strong> Commission on Thousands of Products
                    </h1>
                    <div className="flex items-center w-full justify-center">
                        <div className="flex-[2] flex items-center justify-center flex-col">
                            <p className="xs:text-base xxs:text-sm text-center text-gray-800 mb-8 px-4">
                                At Slashy, we've launched an exciting affiliate program that lets you earn a generous <strong className="text-[#f97316]">25%</strong> commission on sales by promoting our products online. It's a great way to monetize your online presence and boost your earnings in the digital marketplace.
                            </p>
                                <div className="flex flex-col justify-center items-center">
                                <Link to="/signup" className="bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50 text-gray-100 py-2 xs:px-24 xxs:px-14 rounded shadow-lg transition duration-300 ease-in-out">Sign up now</Link>
                                <p className="text-lg text-gray-800 ml-3">and <strong>make money!</strong></p>
                                </div>
                        </div>
                        <div className="xxs:hidden md:block flex-[2]">
                        <img src={agreement} alt="Affiliate/Partner"></img>
                        </div>
                    </div>
                    <div className="mx-auto">
                        <section className="mb-12 xxs:mt-14 sm:mt-20">
                            <div className="flex items-center justify-center">
                                 <div className="xxs:hidden md:block flex-[2]">
                                    <img src={whatisaffiliate} alt="What is affiliate"></img>
                                </div>
                                <div className="flex-[2] flex items-center flex-col justify-center">
                                    <h2 className="text-xl md:text-2xl font-semibold text-[#1b2559] mb-4">What is Affiliate Marketing?</h2>
                                    <p className="xxs:text-sm xs:text-base text-center text-gray-800 mb-8 px-4">
                                        Affiliate marketing is a performance-based marketing strategy where individuals, known as affiliates, earn a commission for promoting products or services and driving sales through their unique affiliate links. It's a win-win scenario where affiliates leverage their online influence or marketing channels to generate sales for businesses, earning commissions in return.
                                    </p>
                                </div>
                            </div>
                        </section>
                        <section className="w-full mb-12 sm:mt-20">
                            <div className="flex items-center justify-center">
                                 <div className="flex-[2]">
                                    <h2 className="text-xl md:text-2xl font-semibold text-[#1b2559] mb-4">The Power of Our Affiliate Program</h2>
                                    <ul className="list-disc xxs:text-sm xs:text-base list-inside text-lg text-gray-800 px-4">
                                        <li><span className="text-[#f97316]">Thousands of Products:</span> Gain access to our extensive catalog of high-quality products spanning various categories.</li>
                                        <li><span className="text-[#f97316]">Generous Commission Structure:</span> Earn an impressive <strong className="text-[#f97316]">25%</strong> commission on every sale generated through your affiliate link.</li>
                                        <li><span className="text-[#f97316]">Easy Setup and Management:</span> Getting started with our affiliate program is quick and hassle-free.</li>
                                        <li><span className="text-[#f97316]">Marketing Support:</span> Access a wealth of marketing resources and promotional materials to enhance your affiliate efforts.</li>
                                    </ul>
                                </div>
                                <div className="flex-[2] xxs:hidden md:block">
                                    <img src={powerofaffiliate} alt="Power of affiliate"></img>
                                </div>
                            </div>                            
                        </section>
                        <section className="mb-12 xxs:mt-14 sm:mt-20">
                        <div className="flex items-center justify-center">
                                <div className="flex-[2] xxs:hidden md:block">
                                    <img src={howitworks} alt="How affiliate works"></img>
                                </div>
                                 <div className="flex-[2]">
                                 <h2 className="text-xl md:text-2xl font-semibold text-[#1b2559] mb-4">How it Works</h2>
                                    <ol className="list-decimal xxs:text-sm xs:text-base list-inside text-lg text-gray-800 px-4">
                                        <li><span className="text-[#f97316]">Sign Up:</span> Joining our affiliate program is free and easy.</li>
                                        <li><span className="text-[#f97316]">Promote:</span> Share your unique affiliate link across your online platforms.</li>
                                        <li><span className="text-[#f97316]">Earn Commissions:</span> Each time a customer makes a purchase through your affiliate link, you'll earn a generous <strong className="text-[#f97316]">25%</strong> commission.</li>
                                        <li><span className="text-[#f97316]">Track Performance:</span> Monitor your affiliate activities in real-time through our intuitive dashboard.</li>
                                    </ol>
                                </div>
                            </div>                          
                        </section>
                        <div className="flex flex-col justify-center items-center">
                                <Link to="/signup" className="bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50 text-gray-100 py-2 xs:px-24 xxs:px-14 rounded shadow-lg transition duration-300 ease-in-out">Sign up now</Link>
                                <p className="text-lg text-gray-800 ml-3"><strong>make money!</strong></p>
                                <p className="text-xs font-bold">Slashy</p>
                        </div>
                    </div>
                </div>
            </div>
        <Footer></Footer>
    </div>
}