import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />;
    }
    return children;
  };
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <BrowserRouter>
      <div className='max-w-sm'>
        <Routes path='/'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
