import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/Layout";
import Edit from "./pages/edit";
import LayoutAuth from "./components/Layout-auth";
import Create from "./pages/create";

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
        path: "/dashboard",
        element: <LayoutAuth />,
        children: [
          {
            path: "/dashboard",
            element: <Create />,
          },
          {
            path: "/dashboard/edit",
            element: <Edit />,
          },
        ],
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
