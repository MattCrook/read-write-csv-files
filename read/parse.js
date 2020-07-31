var fs = require("fs");
var parse = require("csv-parse");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvFile = "../data/MOCK_DATA.csv";

// Defining the shape of our Users (https://www.mockaroo.com/)
// Reading the CSV using fs (which comes with Node) and piping the output into csv-parse
// Shifting the array (removing the CSV headings)
// Mapping each entry in the array entries into a User object

class User {
  constructor(id, first_name, last_name, email, gender, ip_address, age) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.gender = gender;
    this.ip_address = ip_address;
    this.age = age;
  }
}

const processData = (err, data) => {
  if (err) {
    console.log(`An error was encountered: ${err}`);
    return;
  }
  data.shift();
  const userList = data.map((row) => new User(...row));
  analyzeUsers(userList);
  namesOfUsersAbove25(userList);
};
fs.createReadStream(csvFile).pipe(parse({ delimiter: "," }, processData));

// Now, we are free to process our list of users in our analyseUsers function.
// For example, we can find the average age of our users, or all users with last name starting in C.

const analyzeUsers = (userList) => {
  const sumOfAllAges = userList.reduce((acc, val) => {
    const accumulator = parseInt(acc);
    const currentValue = parseInt(val.age);
    return accumulator + currentValue;
  }, 0);
  const averageAge = sumOfAllAges / userList.length;
  console.log({ averageAge });

  // Most common last name.
  let commonLastNameDict = new Map();
  userList.forEach((user) => {
    let lastNameEntry = commonLastNameDict.get(user.last_name);
    const newVal = lastNameEntry === undefined ? 0 : lastNameEntry + 1;
    commonLastNameDict.set(user.last_name, newVal);
  });
  let maxEntry = ["", Number.MIN_SAFE_INTEGER];

  for (let entry of commonLastNameDict.entries()) {
    if (entry[1] > maxEntry[1]) {
      maxEntry = entry;
    }
  }
  console.log("maxEntry", maxEntry);
};


// Search for names and age of users above 40. Create custom object and map to output.
const namesOfUsersAbove25 = (userList) => {
    let users = []
    userList.forEach(user => {
        if (user.age > 40) {
            const fullName = user.first_name + " " + user.last_name;
            userObj = {
                name: fullName,
                age: user.age
            }
            users.push(userObj)
        }
    })
    const sortResult = users.sort((a, b) => b.age - a.age);
    console.log(sortResult);
};
