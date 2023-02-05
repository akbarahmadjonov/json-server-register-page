import { Route, Routes } from "react-router-dom";
import { PublicHome } from "../Components/pages/PublicHome/PublicHome";
import { Login } from "../Components/pages/Login/Login";
import { Register } from "../Components/pages/Register/Register";
import { PublicHeader } from "../Components/PublicHeader/PublicHeader";

export const Public = () => {
  return (
    <>
      <PublicHeader />
      <div className="container">
        <Routes>
          <Route index path="/" element={<PublicHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={<h2>The page you are looking is not found?</h2>}
          />
        </Routes>
      </div>
    </>
  );
};
