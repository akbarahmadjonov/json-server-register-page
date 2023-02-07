import { Route, Routes } from "react-router-dom";
import { Posts } from "../Components/pages/Posts/Posts";
import { PrivateHome } from "../Components/pages/PrivateHome/PrivateHome";
import { Users } from "../Components/pages/Users/Users";
import { PrivateHeader } from "../Components/PrivateHeader/PrivateHeader";

export const Private = () => {
  return (
    <>
      <PrivateHeader />
      <div className="container">
        <Routes>
          <Route path="/" element={<PrivateHome />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="*"
            element={<h2>The page you are looking for was not found?</h2>}
          />
        </Routes>
      </div>
    </>
  );
};
