import React from 'react'
import { toast } from 'react-toastify';
import AuthServices from "../services/AuthServices";

function SignupForm({closeModal}) {
    const [formState, setFormState] = React.useState({
        email: "",
        username: "",
        password: "",
      });
    
      const handleChange = (e) => {
        setFormState((previouState) => {
          return {
            ...previouState,
            [e.target.name]: e.target.value,
          };
        });
      };
    
      const handleRegister = async (e) => {
        e.preventDefault();
    
        await AuthServices.singup(formState.email, formState.username,formState.password).then((result) => {
          toast.success(`Inscription complete`, {
            position: "bottom-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }).catch((err) => {
          let errorMessage = err.response.data.message.split('"').join('').split("\\").join('');
          toast.error(errorMessage, {
            position: "bottom-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }).finally(()=>{
          closeModal()
        })
    };
    
      return (
        <div>
          <form>
            <label htmlFor="email">
              Email
              <input
                name="email"
                type="text"
                value={formState.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="username">
              Username
              <input
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                name="password"
                type="text"
                value={formState.password}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleRegister} >Login</button>
          </form>
        </div>
      );
}

export default SignupForm