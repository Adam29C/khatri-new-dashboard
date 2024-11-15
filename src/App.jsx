import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Components/Router/Main_Router";
import 'react-toastify/dist/ReactToastify.css';

const App = () => <RouterProvider router={router} />;

export default App;
