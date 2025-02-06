import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Admin from "./components/Auth/Admin";
import Auth from "./components/Auth/Auth";
import Booking from "./components/Bookings/Booking";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AddMovie from "./components/Movies/AddMovie";
import Movies from "./components/Movies/Movies";
import AdminProfile from "./profile/AdminProfile";
import UserProfile from "./profile/UserProfile";
import Footer from "./components/Footer/Footer"; // Footer is imported here

import { adminActions, userActions } from "./store";
// import FootballPage from "./components/FootballPage";
// import CricketPage from "./components/CricketPage";

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          
          {/* Only show admin and auth routes if user is not logged in */}
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </>
          )}
          
          {/* User routes */}
          {isUserLoggedIn && (
            <>
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
            </>
          )}
          
          {/* Admin routes */}
          {isAdminLoggedIn && (
            <>
              <Route path="/add" element={<AddMovie />} />
              <Route path="/user-admin" element={<AdminProfile />} />
            </>
          )}

          {/* Redirect unauthorized users */}
          <Route
            path="/user"
            element={isUserLoggedIn ? <UserProfile /> : <Navigate to="/auth" />}
          />
          <Route
            path="/add"
            element={isAdminLoggedIn ? <AddMovie /> : <Navigate to="/auth" />}
          />
          <Route
            path="/user-admin"
            element={isAdminLoggedIn ? <AdminProfile /> : <Navigate to="/auth" />}
          />
          
          {/* Catch-all for non-existing pages */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </section>
      <Footer /> {/* Footer component here */}
    </div>
  );
}

export default App;
