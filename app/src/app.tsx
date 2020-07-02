import { CssBaseline } from "@material-ui/core";
import React from "react";
import { render } from "react-dom";
import initialState from "./redux/initialState";
import reducer from "./redux/reducer";
import { StateProvider } from "./redux/state";
import Router from "./router";

const initReactFastclick = require("react-fastclick");
initReactFastclick();

const App = () => {
  return (
    <>
      <CssBaseline />
      <StateProvider initialState={initialState} reducer={reducer}>
        <Router />
      </StateProvider>
    </>
  );
};

render(<App />, document.getElementById("app"));
