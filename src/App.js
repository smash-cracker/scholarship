import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./authentication/home";
import Login from "./authentication/login";
import { AuthContext } from "./context/auth_context";
import FetchScholarships from "./data/fetch_scholarships";
import UpdateScholarship from "./data/update_scholarship";
import { userDetails, userInputs } from "./source/form_source";
import New from "./data/new_scholarship";
import Details from "./authentication/signup";
import EligibleScholarships from "./data/elible_scholarships";
import RealEligibleScholarships from "./data/elible_scholarships";
import About from './pages/about';
import Contact from "./pages/about";
import SupportAdmin from "./SupportAdmin/index"

function App() {
  const { currentUser } = useContext(AuthContext);
  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to={"/login"} />;
  };
  
  return (
    <div className="APP">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequiredAuth>
                <Home />
                </RequiredAuth>
            }
          />
          <Route
            path="/about"
            element={
                <About />
            }
          />
          <Route
            path="/updateScholarship"
            element={
              <RequiredAuth>
                <UpdateScholarship inputs={userInputs} title="Add New User" />
              </RequiredAuth>
            }
          />
          <Route
            path="/newScholarship"
            element={
              <RequiredAuth>
                <New inputs={userInputs} title="Add New User" />
              </RequiredAuth>
            }
          />
          <Route path="/signup" element={<Details inputs={userDetails} />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/viewScholarships"
            element={
              <RequiredAuth>
                <FetchScholarships />
              </RequiredAuth>
            }
          />
          <Route
            path="/eligibleScholarships"
            element={
              <RequiredAuth>
                <RealEligibleScholarships />
              </RequiredAuth>
            }
          />
          <Route
            path="/support"
            element={
              <RequiredAuth>
                <SupportAdmin />
              </RequiredAuth>
            }
          />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
