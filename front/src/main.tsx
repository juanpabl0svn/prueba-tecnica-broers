import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/create";
import Layout from "./components/Layout";
import Edit from "./pages/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create",
        element: <Dashboard />,
      },
      {
        path: "/edit",
        element: <Edit />,
      },
    ],
  },
  // {
  //   path: "/",
  //   element: <Root />,
  //   loader: rootLoader,
  //   children: [
  //     {
  //       path: "team",
  //       element: <Team />,
  //       loader: teamLoader,
  //     },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
