import { useEffect, useState } from "react";
import EyeClose from "../svg/eye-close";
import EyeOpen from "../svg/eye-open";

import { handleSpaces } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import { POST } from "../utils/config";

import toast from "react-hot-toast";

export default function Create() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    let { fullName, email, password, active } = Object.fromEntries(
      new FormData(form)
    );

    if (
      !(fullName as string).trim() ||
      !(email as string).trim() ||
      !(password as string).trim()
    ) {
      return toast.error("Fill all the fields without spaces");
    }

    email = (email as string).toLowerCase();

    fullName = (fullName as string).toLowerCase();

    const isCreated = await POST("/user", {
      fullName,
      email,
      password,
      active: active === "true" ? true : false,
    });

    if (isCreated.error) {
      return toast.error(
        Array.isArray(isCreated.error) ? isCreated.error[0] : isCreated.error
      );
    }

    toast.success("User created successfully");

    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <h1 className="absolute top-28 left-1/2 -translate-x-1/2 text-4xl text-white font-light ">
        Create
      </h1>

      <form onSubmit={handleSubmit} className="w-[350px] h-[440px]">
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
        <div className="flex justify-center gap-5">
          <div>
            <input type="radio" name="active" value="true" id="true" checked />
            <label htmlFor="true">Activo</label>
          </div>
          <div>
            <input type="radio" name="active" value="false" id="false" />
            <label htmlFor="false">Inactivo</label>
          </div>
        </div>

        <button className="bg-blue-400  self-center rounded-md px-6 py-1 text-blue-200 hover:text-white transition-all duration-200 ease-in-out">
          Crear
        </button>
      </form>
    </>
  );
}
