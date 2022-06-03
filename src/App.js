import { lazy, Suspense } from "react";
import { Route, Routes, Navigate, useLocation} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Style
import "./App.css";

// Views
import Tasks from "./components/views/Tasks/Tasks";
import Login from "./components/views/auth/Login/Login";
import Register from "./components/views/auth/Register/Register";
import Registered from "./components/views/Registered/Registered";

const Error404 =  lazy(() => import("./components/views/Error404/Error404"));

function RequiredAuth({ children }) {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <RequiredAuth>
             <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Tasks />
              </motion.div>
            </RequiredAuth>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/register"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Register />
            </motion.div>
          }
        />
        <Route
          path="/registered/:teamID"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Registered />
            </motion.div>
          }
        />
        <Route 
          path="*" 
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Suspense fallback="..." >
                <Error404 />
              </Suspense>
            </motion.div>
        } 
        />
      </Routes>
    </AnimatePresence>
  );
}
