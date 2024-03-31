import loading from "../public/loading-loader.svg"

export const MainLoading = () => {
    return <div className="flex items-center min-h-screen justify-center">
    <img className="animate-spin" src={loading}></img>
</div>
}