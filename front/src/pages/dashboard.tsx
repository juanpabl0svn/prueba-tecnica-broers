import { useEffect, useState } from "react";
import EyeClose from "../svg/eye-close";
import EyeOpen from "../svg/eye-open";

import { handleSpaces } from "../utils/functions";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useNavigate();

  //   useEffect(() => {
  //     const user = localStorage.getItem("user-crud");

  //     if (!user) {
  //       router("/")
  //     }

  //     fetch("http://localhost:3001/dashboard", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ user }),
  //     })
  //       .then((res) => res.json())
  //       .then((valid) => {
  //         if (!valid.active) {
  //           router("/");
  //         }
  //       });
  //   }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="absolute top-28 left-1/2 -translate-x-1/2 text-4xl text-white font-light">
        Dashboard
      </h1>

      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-5">Create</h2>
        <div className="special-input">
          <input type="text" id="fullName" name="fullName" required />
          <label htmlFor="fullName">Full name</label>
        </div>
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
          <label htmlFor="password">Contraseña</label>

          <span
            className="cursor-pointer absolute  right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeClose /> : <EyeOpen />}
          </span>
        </div>

        <button className="bg-blue-400  self-center rounded-md px-6 py-1 text-blue-200 hover:text-white transition-all duration-200 ease-in-out">
          Crear
        </button>
      </form>
    </>
  );
}
