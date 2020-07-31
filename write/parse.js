const createCsvWriter = require("csv-writer").createObjectCsvWriter;
var fs = require("fs");
var parse = require("csv-parse");
const csvFile2 = "../data/MOCK_DATA_2.csv";
const txtFile = "../data/test_data.txt";
const txtFile2 = "../data/test_data_2.txt";

/******************* CsvWriter ****************/
//Blows away all Data iin CSV and adds the specified data

const data_to_write = {
  id: 101,
  first_name: "Matt",
  last_name: "Crook",
  email: "matt@me.com",
  gender: "Male",
  job_title: "Software Engineer",
  age: 29,
};
fs.createWriteStream(txtFile2).write(JSON.stringify(data_to_write));

/******************************/
// Read data from a CSV and write it to a txt file
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

const writeData = (err, data) => {
  if (err) {
    console.log(`An error was encountered: ${err}`);
    return;
  }
  data.shift();
  const userList = data.map((row) => new User(...row));
  writeTxtFile(userList);
};

const writeTxtFile = (userList) => {
  const user = JSON.stringify(userList);
  fs.createWriteStream(txtFile).write(user);
};

fs.createReadStream(csvFile2).pipe(parse({ delimiter: "," }, writeData));

/**********************************************************/
const csvWriter = createCsvWriter({
  path: csvFile,
  header: [
    { id: "id", title: "id" },
    { id: "first_name", title: "first_name" },
    { id: "last_name", title: "last_name" },
    { id: "email", title: "email" },
    { id: "gender", title: "gender" },
    { id: "ip_address", title: "ip_address" },
    { id: "age", title: "age" },
  ],
});

const data = [
  {
    id: 101,
    first_name: "Matt",
    last_name: "Crook",
    email: "matt@me.com",
    gender: "Male",
    ip_address: "240.87.31.236",
    age: 29,
  },
];
csvWriter.writeRecords(data).then(() => console.log('CSV was written successfully.'))

/***************** WRITESTREAM **************/

// When handling particularly large files, or files that come in chunks, say from a network connection,
// using streams is preferable to writing files in one go via the above methods that write entire files.
// Streams write small amounts of data at a time. While this has the disadvantage of being slower because data is transferred in chunks,
// it has advantages for RAM performance.
// Stream will write the object in a a string.

const data_obj = {
  id: 101,
  first_name: "Matt",
  last_name: "Crook",
  email: "matt@me.com",
  gender: "Male",
  ip_address: "240.87.31.236",
  age: 29,
};

  let writeStream = fs.createWriteStream("MOCK_Data.csv");
  let streamData = JSON.stringify(data_obj);
  writeStream.write(streamData);
  writeStream.on("finish", () => {
    console.log({ message: "Success writing to csv." });
    console.log(streamData);
  });
  writeStream.end();
