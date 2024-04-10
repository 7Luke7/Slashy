import { useState } from "react";
import {Link, useOutletContext} from "react-router-dom"

export const Account = () => {
  const [message, setMessage] = useState()
  const [clientCode, setClientCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  document.title = "Affiliate Account - Slashy"
  const data = useOutletContext()

  const get_code = async () => {
    try {
      const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/get_code`, {
          method: "GET",
          credentials: "include",
      })

      if (request.status === 429) {
        throw new Error("Your request limit has been reached. try again after 3 minutes.")
      }

      const data = await request.json()

      if (!request.ok) {
        throw new Error(data.message)
      }
      
      setMessage("code sent.")
    } catch (error) {
      setMessage(error.message)
    }
  }

  const verify_code = async (e) => {
    e.preventDefault()
    try {
      const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/verify_code`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({client_code: clientCode}),
          credentials: "include",
      })

      if (request.status === 429) {
        throw new Error("Your request limit has been reached. try again after 3 seconds.")
      }

      const data = await request.json()
      if (!request.ok) {
        throw new Error(data.message)
      }

      setMessage(data.message)
    } catch (error) {
      setMessage(error.message)
    }
  }

  const reset_password = async (e) => {
    e.preventDefault()
    try {
      const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/reset_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({password: newPassword}),
        credentials: "include",
    })

    if (request.status === 429) {
      throw new Error("Your request limit has been reached. try again after 3 seconds.")
    }
    
    const data = await request.json()

    if (!request.ok) {
      throw new Error(data.message)
    }

    setMessage(data.message)
    setClientCode("")
    } catch (error) {
      alert(error.message)
    }
  }

  return <div>
    <div className="flex flex-col h-16 border-b p-2">
            <div className="flex items-center">
                <div className="flex items-center">
                    <Link className="text-[#1b254b] text-xs underline" to="/dashboard/account">dashboard/account</Link>
                </div>
            </div>
            <h1 className="text-[#1b254b] text-lg font-bold">Account</h1>
        </div>
        <div className="w-[90%] mt-5 mx-auto">
  {data && (
    <div className="relative">
      <div className="flex flex-col space-y-3">
        <div>
          <h2 className="text-black text-lg">Email</h2>
          <p className="text-gray-400 mt-1 text-sm font-normal">{data.email}</p>
        </div>
        <div>        
          <h2 className="text-black text-lg">Change Password</h2>
          <p className="text-[12px] text-gray-400">We will send you a verification code to the email you registered with. <br/> Please submit this code to us within <strong>3 minutes</strong> minutes to proceed with changing your password.</p>
          <div className="mt-1">
          {message === "Code valid." ? <form onSubmit={reset_password}>
            <div className="flex items-center">
              <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" className="border px-2 py-1 outline-none"></input>
              <button
                type="submit"
                className="bg-[#242e35] py-1 px-2 text-gray-200"
              >
                Reset password
              </button>
            </div>
            {message && <p className="text-sm text-gray-900">{message}</p>}
          </form> : <form onSubmit={verify_code}>
            <div className="flex items-center">
              <input type="text" maxLength={4} value={clientCode} onChange={(e) => setClientCode(e.target.value)} placeholder="Verify code" className="border px-2 py-1 outline-none"></input>
              <button
                type="button"
                onClick={get_code}
                className="bg-[#242e35] py-1 px-2 text-gray-200"
              >
                Get code
              </button>
            </div>
            {message && <p className="text-sm text-gray-900">{message}</p>}
            <button
              type="submit"
              className="bg-[#242e35] mt-1 py-1 px-2 text-gray-200"
            >
              Submit
            </button>
          </form>}
          </div>
        </div>
      </div>
    </div>
  )}
</div>
</div>
};

