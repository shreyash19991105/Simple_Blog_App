import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import CreatePostPage from "./pages/CreatePostPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import EditPostPage from "./pages/EditPostPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/registration" element={<RegistrationPage />}></Route>
        <Route
          path="/createpost"
          element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/editpost"
          element={
            <ProtectedRoute>
              <EditPostPage />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
