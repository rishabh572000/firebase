import { useContext, useState } from "react"
import "./login.scss"
import { signInWithEmailAndPassword  } from "firebase/auth";
import {auth} from '../../firebase'
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)
  const [error, setError] = useState(false)

  
  const onSubmit = (data) =>{
    // e.preventDefault()
    
    signInWithEmailAndPassword (auth, data?.email, data?.password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    dispatch({type:"LOGIN",  payload: user})
    navigate('/')

    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(data, errorMessage)
    setError(true)
    });
  }
  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          type='email'
          placeholder="email"
          {...register("email")} 
        />
        <input
          type='password'
          placeholder="password" 
          {...register("password")} 
        />
        <button type='submit'>Login</button>
        {error && <span>Credential are wrong</span>}
      </form>
    </div>
  )
}

export default Login