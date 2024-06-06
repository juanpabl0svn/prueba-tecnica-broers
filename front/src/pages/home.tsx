import { useEffect, useState } from "react";
import EyeClose from "../svg/eye-close";
import EyeOpen from "../svg/eye-open";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { handleSpaces } from "../utils/functions";
import { POST } from "../utils/config";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user-crud");

    if (user) {
      router("/create");
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.remove();

    const form = e.currentTarget;

    const { email, password } = Object.fromEntries(new FormData(form));

    if (!(email as string).trim() || !(password as string).trim()) {
      toast.error("Por favor, rellene todos los campos sin espacios", {
        position: "top-center",
      });
      return;
    }

    const user = await POST("/user/auth", { email, password });

    console.log(user);
    if (user?.error) {
      return toast.error("Usuario o contraseña incorrectos");
    }

    localStorage.setItem("user-crud", user.token);

    toast.success("Inicio de sesión exitoso");

    router("/create");
  };

  return (
    <>
      <h1 className="absolute top-28 left-1/2 -translate-x-1/2 text-4xl text-white font-light">
        Welcome to <span className="font-bold">CRUD</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-10 mt-10">Login</h2>
        <div className="special-input">
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleSpaces}
            required
          />
          <label htmlFor="email">Email</label>
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
