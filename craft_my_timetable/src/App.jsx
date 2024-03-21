import axios from "axios";
import "./App.css";
import React, { Component } from "react";
import MultipleSelectCheckmarks from "./CourseSelector";
import BatchSelect from "./BatchSelector";
import BranchSelect from "./BranchSelector";
import InputFileUpload from "./fileUpload";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Input } from "@mui/material";
import PersistentDrawerLeft from "./drawer.jsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

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
  gridTemplateColumns: "1fr 1fr",
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/upload" element={<InputFileUpload />} />
      <Route path="/create" element={<BatchSelect />} />
    </Route>
  )
);

class App extends Component {
  render() {
    return (
      <div className="main" id="main-main">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <body>
            <PersistentDrawerLeft />
          </body>
          <RouterProvider router={router} />
          {/* <div style={centerDivStyle}> */}
          {/* <h3>Upload the time table</h3> */}
          {/* </div> */}
          <div style={centerDivStyle}>{/* <InputFileUpload /> */}</div>
          {/* <div style={centerDivStyle}>
            <BatchSelect />
            <BranchSelect />
          </div> */}
          {/* <div style={centerDivStyle}>
            <MultipleSelectCheckmarks />
          </div> */}
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
