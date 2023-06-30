import { useState } from "react"
import "./login.scss"

const Login = () => {
  const [error, setError] = useState(false)
  const handleLogin = (e) =>{
    e.preventDefault()
  }
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input type='email' placeholder="email" />
        <input type='password' placeholder="password" />
        <button type='submit'>Login</button>
        {error && <span>Credential are wrong</span>}
      </form>
    </div>
  )
}

export default Login