import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./routes/router"; // טוענים את ה-router שהגדרת
import InitializeAuth from "./auth/InitializeAuth";
import Navbar from "./components/navbar";

function App() {
  return (
    <Provider store={store}>
      <InitializeAuth>
        <RouterProvider router={router}>
          {/* <Navbar /> */}
        </RouterProvider>
      </InitializeAuth>
    </Provider>
  );
}

export default App;
