import React from "react";
import Routes from "./setup/routes-manager";
import { Provider } from "react-redux";
import store from "./setup/redux-manager/store";

import "./styles/style-desktop.css";
import "./styles/style-tablet.css";
import "./styles/style-mobile.css";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
