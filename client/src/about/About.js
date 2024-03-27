import { useEffect } from "react"
import { Footer } from "../Components/Footer"
import { Header } from "../Components/Header"

const About = () => {
    useEffect(() => {
        document.title = "about us - Slashy"
    }, [])
    return <div className="">
        <Header></Header>
        <div className="h-[80vh] flex justify-center items-center">
            About us
        </div>
        <Footer></Footer>
    </div>
}

export default About