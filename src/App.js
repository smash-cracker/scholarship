import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Home from './authentication/home';
import Login from './authentication/login';
import Signup from './authentication/signup';

function App() {

  const currentUser = true;
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
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
    </div>

  );
}

export default App;
