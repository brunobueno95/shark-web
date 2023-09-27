import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home.jsx";

import Shark from "./pages/sharkPage/Shark.jsx";
import LoginAdmin from "./pages/loginAdmin/LoginAdmin.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AdminSharkPage from "./pages/adminWeb/adminSharkPage/AdminSharkPage.jsx";

import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import AdminHome from "./pages/adminWeb/adminHome/AdminHome.jsx";
import CreateShark from "./pages/adminWeb/createShark/CreateShark.jsx";
import EditShark from "./pages/adminWeb/editShark/EditShark.jsx";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/shark/:id" element={<Shark />} />
          <Route path="/adminLog" element={<LoginAdmin />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/adminHome" element={<AdminHome />} exact />
            <Route path="/adminHome/shark/:id" element={<AdminSharkPage />} />
            <Route path="/createShark" element={<CreateShark />} />
            <Route path="/editShark/:id" element={<EditShark />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
