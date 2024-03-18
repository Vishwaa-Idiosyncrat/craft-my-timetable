import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PersistentDrawerLeft from "./drawer.jsx";
import Upload from "./Upload.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const centerDivStyle = {
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
};

const titleBar = {
  display: "grid",
  width: "auto",
  height: "auto",
  textAlign: "center",
  justifyContent: "center",
  marginTop: "175px",
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <div className="main" id="main-main">
          <Router>
            <PersistentDrawerLeft />
            <Switch>
              <Route path="/upload">
                <Upload />
              </Route>
              <Route path="/">
                <div style={titleBar}>
                  <h1 className="title">Welcome to Craft my Time Table</h1>
                  <h2 className="access">
                    Access the Navigation Bar for more information.
                  </h2>
                  <h2>
                    Go to upload section in Navigation and UPload the necessary
                    details.
                  </h2>
                  <h2>Your Time Table will be in Create section.</h2>
                </div>
              </Route>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
