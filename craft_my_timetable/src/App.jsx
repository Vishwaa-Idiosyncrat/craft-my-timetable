import axios from "axios";
import "./App.css";
import React, { Component } from "react";
import MultipleSelectCheckmarks from "./CourseSelector";
import BatchSelect from "./BatchSelector";
import BranchSelect from "./BranchSelector";
import InputFileUpload from "./fileUpload";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const centerDivStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // height: '100vh'
};

class App extends Component {
  // state = {
  //   // Initially, no file is selected
  //   selectedFile: null,
  // };

  // // On file select (from the pop up)
  // onFileChange = (event) => {
  //   // Update the state
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //   });
  // };

  // // On file upload (click the upload button)
  // onFileUpload = () => {
  //   // Create an object of formData
  //   const formData = new FormData();

  //   // Update the formData object
  //   formData.append(
  //     "myFile",
  //     this.state.selectedFile,
  //     this.state.selectedFile.name
  //   );

  //   // Details of the uploaded file
  //   console.log(this.state.selectedFile);

  //   // Request made to the backend api
  //   // Send formData object
  //   axios.post("api/uploadfile", formData);
  // };

  // // File content to be displayed after
  // // file upload is complete
  // fileData = () => {
  //   if (this.state.selectedFile) {
  //     return (
  //       <div>
  //         <h2>File Details:</h2>
  //         <p>File Name: {this.state.selectedFile.name}</p>

  //         <p>File Type: {this.state.selectedFile.type}</p>

  //         <p>
  //           Last Modified:{" "}
  //           {this.state.selectedFile.lastModifiedDate.toDateString()}
  //         </p>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <br />
  //         <h4>Choose before Pressing the Upload button</h4>
  //       </div>
  //     );
  //   }
  // };

  // BatchSelector = () => {
  //   let Batches = [
  //     "BTech 1st year",
  //     "BTech 2nd year",
  //     "BTech 3rd year",
  //     "BTech 4th year",
  //     "Mtech 1st year",
  //     "Mtech 2nd year",
  //     "Msc 1st year",
  //     "Msc 2nd year",
  //     "PhD",
  //   ];

  //   return (
  //     <div className="BatchSelector">
  //       <h3>Batch</h3>
  //       <form action="/create">
  //         <select className="Batches" id="Batches">
  //           {Batches.map((item) =>
  //           <option value={item} onClick={() => console.log(item)}>
  //             {item}
  //           </option>)}
  //         </select>
  //       </form>
  //     </div>
  //   );
  // };

  // BranchSelector = () => {
  //   let Branches = [
  //     "EE",
  //     "CSE",
  //     "CE",
  //     "DS",
  //     "ME"
  //   ];

  //   return (
  //     <div className="BranchSelector">
  //       <h3>Branch</h3>
  //       <form action="/create">
  //         <select className="Branches" id="Branches">
  //           {Branches.map((item) =>
  //           <option value={item} onClick={() => console.log(item)}>
  //             {item}
  //           </option>)}
  //         </select>
  //       </form>
  //     </div>
  //   );
  // };

  // CourseSelector = () => {
  //   const courses = [
  //     "MA1011",
  //     "PH1030",
  //     "ME1030",
  //     "MA1020",
  //     "CE1020",
  //     "CY1040",
  //     "Random course",
  //     "OLEP",
  //   ];

  //   let Selected = new Set([]);

  //   let Course
  //   return (
  //     <div className="CourseSelector">
  //       <h3>Courses</h3>
  //       <form action="/create">
  //         <select className="Courses" id="Courses">
  //           {courses.map((item, index) => (
  //             <option value={item} onClick={() => Selected.add(item) && console.log(Selected)}>
  //               {item}
  //             </option>
  //           ))}
  //         </select>
  //       </form>
  //     </div>
  //   );
  // };

  render() {
    return (
      <div className="main" id="main-main">
        <body>
          <div className="title">
            <div style={centerDivStyle}>
              <img
                className="logo"
                src="https://www.iitpkd.ac.in/sites/default/files/inline-images/IIT_PKD_short%20logo_RGB.jpg"
                alt="IIT Palakkad"
                width={147.5}
                height={131.125}
                loading="true"
              />
              <h1 className="title">Craft my Time Table</h1>
            </div>
          </div>
        </body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <div style={centerDivStyle}>
            <h3>Upload the time table</h3>
          </div>
          <div style={centerDivStyle}>
            <InputFileUpload />
          </div>
          <div style={centerDivStyle}>
            <BatchSelect />
            <BranchSelect />
          </div>
          <div style={centerDivStyle}>
            <MultipleSelectCheckmarks />
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
