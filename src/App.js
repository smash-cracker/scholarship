import { useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Home from './authentication/home';
import Login from './authentication/login';
import Signup from './authentication/signup';
import { AuthContext } from "./context/auth_context";
import { userInputs } from "./upload/form_source";
import New from "./upload/new_scholarship";

function App() {
  const {currentUser} = useContext(AuthContext)
  const RequiredAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to={"/login"}/>;
  }
  return (
    <div className='APP'>
      <Router>
      <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={
        <RequiredAuth>
          <Home/>
        </RequiredAuth>
        }
        />
      <Route path="/newScholarship" element={
      <RequiredAuth>
      <New inputs={userInputs} title="Add New User" />
      </RequiredAuth>
      }/>
      <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
    </div>

  );
}

export default App;
