import { createBrowserRouter } from "react-router";
import App from "./App";

 

const routes=createBrowserRouter([
    {
        path:"/",
        element:<App/>
    },
    {
        path:"/test",
        element:<h1>test</h1>
    }
])


export default routes