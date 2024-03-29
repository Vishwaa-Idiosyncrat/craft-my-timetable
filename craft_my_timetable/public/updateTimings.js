const fs = await import("fs");

function splitClasses(classes) {
  const splitClasses = [];

  classes.forEach((classItem) => {
    const [startTime, endTime] = classItem.time.split("-");
    const start = new Date(`1970/01/01 ${startTime}`);
    const end = new Date(`1970/01/01 ${endTime}`);
    const diff = (end - start) / (1000 * 60);

    if (diff > 75) {
      const midTime = new Date(start.getTime() + 75 * 60000);
      const midTimeString = midTime.toTimeString().slice(0, 5);
      const breakTime = new Date(midTime.getTime() + 15 * 60000);
      const breakTimeString = breakTime.toTimeString().slice(0, 5);

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

async function updateTimings() {
  try {
    const data = await fs.promises.readFile("timings.json", "utf8");

    const timings = JSON.parse(data);

    Object.keys(timings).forEach((day) => {
      timings[day].classes = splitClasses(timings[day].classes);
    });

    const updatedData = JSON.stringify(timings, null, 2);

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
