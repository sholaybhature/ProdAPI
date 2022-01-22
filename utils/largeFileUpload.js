import fs from "fs";

const fileName = "../files/output.txt";

fs.readFile(fileName, (err, data) => {
  if (err) throw err;
  console.log(data);
});
