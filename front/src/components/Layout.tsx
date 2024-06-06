import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Toaster />
      <main className="relative grid place-content-center">
        <Outlet />
      </main>
    </>
  );
}
