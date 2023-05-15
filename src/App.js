import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';

function RootLayout(props) {
  return (
    <>
      <Navbar />
      <Alert alert={props.alert} />
      <div className="container" style={{ minWidth: '600px' }}>
        <Outlet />
      </div>

    </>
  );
}
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, typ) => {
    setAlert({
      message: msg,
      type: typ
    });
    setTimeout(() => {
      setAlert(null);
    }, 6000);
  };


  const router = createBrowserRouter([

    {
      path: "/",
      element: <RootLayout alert={alert} />,
      children: [
        {
          path: '/',
          element: <Home key="home" showAlert={showAlert} />
        },
        {
          path: "/about",
          element: <About key="about" />
        },
        {
          path: "/login",
          element: <Login showAlert={showAlert} />
        },
        {
          path: "/signup",
          element: <SignUp showAlert={showAlert} />
        }
      ]
    }
  ]);
  return (
    <>
      <NoteState>
        <RouterProvider router={router} />
      </NoteState>
    </>
  );
}

export default App