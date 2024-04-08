import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from "./components/LoginPage";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import NewTaskPage from "./components/NewTaskPage";
import EditTaskPage from "./components/EditTaskPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>не нашел</div>,
        children: [
            {
                path: "/tasks/:task_id",
                element: <EditTaskPage/>,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
        path: "/new_task",
        element: <NewTaskPage/>,
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

