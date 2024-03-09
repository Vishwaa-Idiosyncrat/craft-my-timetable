import axios from "axios";

import React, { Component } from "react";

import { useState } from "react";

class App extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  BatchSelector = () => {
    let Batches = [
      "BTech 1st year",
      "BTech 2nd year",
      "BTech 3rd year",
      "BTech 4th year",
      "Mtech 1st year",
      "Mtech 2nd year",
      "Msc 1st year",
      "Msc 2nd year",
      "PhD",
    ];

    let Selected = [];
    return (
      <div className="BatchSelector">
        <h3>Batch selector</h3>
        <form action="/create">
          <select className="Batches" id="Batches">
            {Batches.map((item, index) => (
              <option
                value={item}
                onClick={() => Selected.push(item) && console.log(Selected)}
              >
                {item}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  };

  CourseSelector = () => {
    let courses = [
      "MA1011",
      "PH1030",
      "ME1030",
      "MA1020",
      "CE1020",
      "CY1040",
      "Random course",
      "OLEP",
    ];

    let Selected = [];

    return (
      <div className="CourseSelector">
        <h3>Course selector</h3>
        <form action="/create">
          <select className="Courses" id="Courses">
            {courses.map((item, index) => (
              <option
                value={item}
                onClick={() => Selected.push(item) && console.log(Selected)}
              >
                {item}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h1>Upload the time table</h1>
        <h3>File Upload using React</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
        {this.BatchSelector()}
        {this.CourseSelector()}
      </div>
    );
  }
}

export default App;
