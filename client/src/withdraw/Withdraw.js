import { useEffect, useState } from 'react';

export const Withdraw = () => {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [user, setUser] = useState()
    const [useEmail, setUseEmail] = useState(true)
    const [phone, setPhone] = useState("")

    useEffect(() => {
        document.title = "Affiliate Withdraw Funds - Slashy"
        const verifyAffiliate = async () => {
            try {
                const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/get_affiliate`, {
                    method: "GET",
                    credentials: "include",
                    cache: "no-cache"
                })

                const data = await request.json()

                if (!request.ok) {
                    throw new Error(data.message)
                }
                
                setUser(data)
            } catch (error) {
                if (error.message === "Client has no authority to access the page") {
                    return window.location.assign("/")
                }
                alert(error.message)
            }
        }

        verifyAffiliate()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/withdraw`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    option: useEmail ? "EMAIL" : "PHONE",
                    credential: email || phone,
                    amount: amount
                })
            })
            
            if (request.status === 429) {
                throw new Error("Limit reacehed try again in 3 seconds.")
            }

            const data = await request.json()

            if (!request.ok) {
                throw new Error(data.message)
            }

            alert("Funds withdrawn.")
        } catch (error) {
            alert(error.message)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-500 text-white">
            <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h1 className="text-3xl font-bold text-orange-500 mb-4">Withdraw Funds</h1>
            <p className="text-gray-800 text-xs font-bold">Balance: {user && user.amount && "$" + user.amount.toFixed(2)}</p>
            <form onSubmit={handleSubmit}>
                <div>
                <div className='flex xxs:flex-col xs:flex-row xxs:items-start xxs:justify-center xxs:mb-1 justify-between xs:space-x-10 items-center'>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-2">{useEmail ? "Paypal email" : "Paypal phone number"}</label>
                <button onClick={() => {
                    setUseEmail(prev => !prev)
                    setPhone("")
                    setEmail("")
                }} className="px-2 py-1 bg-[#1b2559] rounded">{useEmail ? "Use phone" : "Use email"}</button>
                </div>
                    {useEmail ? <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border text-gray-700 px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-orange-500"
                        placeholder="Enter paypal email"
                        required
                    /> : <input
                    type="number"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border text-gray-700 px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-orange-500"
                    placeholder="Enter paypal phone"
                    required
                />}
                </div>
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-lg text-gray-800 font-semibold mb-2">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        max={user && user.amount && user.amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 border-gray-300 focus:outline-none focus:border-orange-500"
                        placeholder="Amount to withdraw"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-orange-500 w-full text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:bg-orange-600"
                >
                    Withdraw Funds
                </button>
            </form>
            </div>
        </div>
    );
};
