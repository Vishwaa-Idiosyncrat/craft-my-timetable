const fs = await import("fs"); // Dynamic import for file system access

function splitClasses(classes) {
  const splitClasses = [];

  classes.forEach((classItem) => {
    const [startTime, endTime] = classItem.time.split("-");
    const start = new Date(`1970/01/01 ${startTime}`);
    const end = new Date(`1970/01/01 ${endTime}`);
    const diff = (end - start) / (1000 * 60); // difference in minutes

    if (diff > 75) {
      // If class duration is more than 75 minutes
      const midTime = new Date(start.getTime() + 75 * 60000);
      const midTimeString = midTime.toTimeString().slice(0, 5);
      const breakTime = new Date(midTime.getTime() + 15 * 60000);
      const breakTimeString = breakTime.toTimeString().slice(0, 5);

      // Split the class into two
      splitClasses.push({
        ...classItem,
        time: `${startTime}-${midTimeString}`,
      });
      splitClasses.push({
        ...classItem,
        time: `${breakTimeString}-${endTime}`,
      });
    } else {
      splitClasses.push(classItem);
    }
  });

  return splitClasses;
}

// Function to read and update timings.json (assuming it's in the same directory)
async function updateTimings() {
  try {
    // Read the file
    const data = await fs.promises.readFile("timings.json", "utf8");

    // Parse the JSON
    const timings = JSON.parse(data);

    // Split the classes for each day
    Object.keys(timings).forEach((day) => {
      timings[day].classes = splitClasses(timings[day].classes);
    });

    // Stringify the updated JSON
    const updatedData = JSON.stringify(timings, null, 2);

    // Write the updated data back to the file
    await fs.promises.writeFile("timings.json", updatedData, "utf8");

    console.log("File updated successfully");
  } catch (error) {
    console.error("Error updating timings.json:", error);
  }
}

// Execute the function to update timings.json
updateTimings();

// const updatedClasses = {
//   Monday: {
//     classes: splitClasses(myData.Monday.classes),
//   },
//   Tuesday: {
//     classes: splitClasses(myData.Tuesday.classes),
//   },
//   Wednesday: {
//     classes: splitClasses(myData.Wednesday.classes),
//   },
//   Thursday: {
//     classes: splitClasses(myData.Thursday.classes),
//   },
//   Friday: {
//     classes: splitClasses(myData.Friday.classes),
//   },
// };
