import { createBrowserRouter } from "react-router";
import App from "./App";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/leader-board", element: <h1>leader board.</h1> }],
  },
]);

export default routes;
