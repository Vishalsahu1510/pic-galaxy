import { useRef, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { } from "react-transition-group";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store } from "../store/store";
import GsapTransition from "./components/GsapTransition";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <GsapTransition />
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;