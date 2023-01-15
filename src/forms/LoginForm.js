import React from "react";
import { toast } from "react-toastify";
import AuthServices from "../services/AuthServices";
import { Button, Container, Form, Label } from "../components/FormComponents";

function LoginForm({closeModal}) {
  const [formState, setFormState] = React.useState({
    email: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();

    await AuthServices.login(formState.email, formState.password)
      .then((result) => {
        const { username, id, "auth-token": token } = result.data;
        localStorage.setItem("auth-token", token);
        localStorage.setItem("id#username", `${id}#${username}`);

        toast.success(`Bienvenu ${result.data.username}`, {
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
      }).finally(()=>{
        closeModal()
      })
  };

  return (
    <Container>
      <Form>
        <Label htmlFor="email">
          Email
          <input
            name="email"
            type="text"
            value={formState.email}
            onChange={handleChange}
          />
        </Label>
        <Label htmlFor="password">
          Password
          <input
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
        </Label>
        <Button onClick={handleLogin}>Login</Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
