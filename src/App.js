import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter basename="/Kid-Guard">
      {/* <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes> */}
      <Routes>
  {/* 🟢 صفحات الـ Landing */}
  <Route element={<Layout />}>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Route>

  {/* 🔵 صفحات الداشبورد (من غير Layout) */}
  <Route path="/dashboard" element={<Dashboard />} />
  {/* <Route path="/location" element={<Location />} />
  <Route path="/alerts" element={<Alerts />} />
  <Route path="/children" element={<Children />} /> */}
</Routes>
    </BrowserRouter>
  );
}

export default App;
