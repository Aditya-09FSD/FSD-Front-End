import React from "react";
import Navs from "./navs";
import { AuthProvider } from "./context";
function App() {
  return (
    <AuthProvider>
      <Navs />
    </AuthProvider>
  );
}

export default App;
