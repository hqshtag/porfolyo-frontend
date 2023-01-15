import React from "react";
import { toast } from "react-toastify";
import { MyDropzone } from "../components/partials/Dropzone";
import AuthServices from "../services/AuthServices";
import UserServices from "../services/UserServices";

function SignupForm({ editMode, setEditMode ,closeModal }) {
  const supportedExtentions = "image/jpg , image/jpeg , image/png";
  const [avatar, setAvatar] = React.useState(null);
  const handleOnDrop = (acceptedFile) => {
    const file = acceptedFile[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatar({ src: e.target.result, file, progress: 0 });
    };
    reader.readAsDataURL(file);
    return file;
  };
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
    if(editMode){
      const _id = localStorage.getItem('id#username').split('#')[0];
      const { email, username, password } = formState;
      if(avatar) await UserServices.uploadUserAvatar(avatar)
      await UserServices.updateUserDetails({email, username, password, _id}).then(
        (res) => {
          toast.success(`Profile update complete`, {
            position: "bottom-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      ).catch(err => {
         toast.error(`${err.data.message}`, {
          position: "bottom-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
         })
        
        }).finally(() => {
        closeModal();
      });
    } else {
      await AuthServices.singup(
        formState.email,
        formState.username,
        formState.password
      )
        .then((result) => {
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
        })
        .catch((err) => {
          let errorMessage = err.response.data.message
            .split('"')
            .join("")
            .split("\\")
            .join("");
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
        })
        .finally(() => {
          closeModal();
        });
    }
    setFormState({  
      email: "",
      username: "",
      password: ""});
    setAvatar(null);
  };

  return (
    <div>
      <form>
        {
          editMode &&  (
            <label htmlFor="Avatar">
            <MyDropzone
              onDrop={handleOnDrop}
              accept={supportedExtentions}
              multiple={false}
              maxSize={20}
            />
          </label>
          )
        }
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
        <button onClick={handleRegister}>{editMode ? "Update" : "Login"}</button>
      </form>
    </div>
  );
}

export default SignupForm;
