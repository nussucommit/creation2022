import { Routes, Route, Navigate } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";

import Announcement from "./pages/Announcement";
import Challenges from "./pages/Challenges";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Rules from "./pages/Rules";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Submission from "./pages/Submission";

/**
 * React app for Creation 2022 organized by NUSSU commIT.
 *
 * @version 1.0.0
 * @author [Desmond To](https://github.com/DesmondTo)
 */
export default function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/submission" element={<Submission />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
