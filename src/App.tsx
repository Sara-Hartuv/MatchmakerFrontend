import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./routes/router"; // טוענים את ה-router שהגדרת
import InitializeAuth from "./auth/InitializeAuth";

function App() {
  return (
    <Provider store={store}>
      <InitializeAuth>
          <RouterProvider router={router}/>
      </InitializeAuth>
    </Provider>
  );
}

export default App;
