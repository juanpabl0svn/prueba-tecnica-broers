import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { POST } from "../utils/functions";

export default function LayoutAuth() {
  const location = useLocation();
  const router = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user-crud");

    if (!user) {
      router("/");
    }

    POST("/user/verify", { token: user })
      .then((res) => {
        if (res.error) {
          localStorage.removeItem("user-crud");
          return router("/");
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <header className="absolute top-0 w-full  h-16 flex justify-center bg-opacity-60 backdrop-blur-md shadow-lg px-4  left-0 right-0">
        <Link
          className={`w-24 justify-center flex items-center h-full transition-all ease-in-out duration-200  text-white ${
            location.pathname === "/dashboard/"
              ? "bg-gray-100/30"
              : "hover:bg-gray-100/30"
          }`}
          to="/dashboard/"
        >
          Create
        </Link>
        <Link
          to="/dashboard/edit"
          className={`w-24 justify-center flex items-center h-full transition-all ease-in-out duration-200  text-white ${
            location.pathname === "/dashboard/edit"
              ? "bg-gray-100/30"
              : "hover:bg-gray-100/30"
          }`}
        >
          Edit
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("user-crud");
            router("/");
          }}
          className="bg-gray-800 absolute right-5 top-5 rounded-md py-1 px-3 text-white opacity-80 hover:opacity-100"
        >
          Log Out
        </button>
      </header>

      <Outlet />
    </>
  );
}
