const fs = require("fs");

const jsonFilePath = "./data/service1.json"; // Replace with the path to your JSON file

// Read the JSON file
fs.readFile(jsonFilePath, "utf-8", (error, data) => {
  if (error) {
    console.error("Error reading JSON file:", error.message);
    return;
  }

  try {
    // Parse the JSON data into a JavaScript object
    const jsonObject = JSON.parse(data);

    // Now, you can use the `jsonObject` in your code
    console.log("JavaScript Object:", jsonObject);
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError.message);
  }
});
