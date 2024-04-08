const fs = require('fs');

let newEntry = {
  // Add your desired properties here (title, content, etc.)
  title: "New Entry",
  content: "This is a new entry with an automatically generated ID.",
};

// Function to generate a unique ID
function generateID(data) {
  let highestID = 0;
  for (const entry of data) {
    highestID = Math.max(highestID, entry.id);
  }
  return highestID + 1;
}

// Read the existing data from gästebuch.json
fs.readFile('gaestebuch.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the JSON data
  let guestbookData = JSON.parse(data);

  // Generate a unique ID for the new entry
  newEntry.id = generateID(guestbookData);

  // Add the new entry to the data
  guestbookData.push(newEntry);

  // Write the updated data back to gästebuch.json
  fs.writeFile('gaestebuch.json', JSON.stringify(guestbookData, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('New entry added successfully with ID:', newEntry.id);
  });
});