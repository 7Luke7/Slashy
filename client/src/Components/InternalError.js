export const InternalError = () => {
    return <main className="flex mt-8 flex-col items-center gap-2 justify-center">
        <h1>წარმოიშვა შეცდომა სცადეთ მოგვიანებით</h1>
        <button onClick={() => window.history.back()} className='bg-[rgb(252,112,55)] text-white font-semibold text-md rounded px-3 py-2 w-[160px]'>დაბრუნდი უკან</button>
    </main>
}