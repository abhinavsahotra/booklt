import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import { BookingProvider } from "./context/BookingContext";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/signin" replace />;
    }

    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <BookingProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/detail/:_id"
            element={
              <ProtectedRoute>
                <Detail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
