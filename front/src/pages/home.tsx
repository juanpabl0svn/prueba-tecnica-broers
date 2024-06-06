import { useEffect, useState } from "react";
import EyeClose from "../svg/eye-close";
import EyeOpen from "../svg/eye-open";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { handleSpaces } from "../utils/functions";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useNavigate();


  useEffect(()=> {
    const user = localStorage.getItem("user-crud");

    if (user) {
      router("/dashboard");
    }
  
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.remove();

    const form = e.currentTarget;

    const { username, password } = Object.fromEntries(new FormData(form));

    if (!(username as string).trim() || !(password as string).trim()) {
      toast.error("Por favor, rellene todos los campos sin espacios", {
        position: "top-center",
      });
      return;
    }

    try {
      const req = await fetch("http://localhost:3001/login");

      if (!req.ok) {
        return toast.error("Usuario o contraseña incorrectos");
      }

      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      return toast.error("Error al iniciar sesión");
    }

    router("/dashboard");
  };

  return (
    <>
      <h1 className="absolute top-28 left-1/2 -translate-x-1/2 text-4xl text-white font-light">
        Welcome to <span className="font-bold">CRUD</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-5">Login</h2>
        <div className="special-input">
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleSpaces}
            required
          />
          <label htmlFor="username">Username</label>
        </div>

        <div className="special-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            onChange={handleSpaces}
            required
          />
          <label htmlFor="password">Password</label>

          <span
            className="cursor-pointer absolute  right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeClose /> : <EyeOpen />}
          </span>
        </div>

        <button className="bg-blue-400  self-center rounded-md px-6 py-1 text-blue-200 hover:text-white transition-all duration-200 ease-in-out">
          Ingresar
        </button>
      </form>
    </>
  );
}
