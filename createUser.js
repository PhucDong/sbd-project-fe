const { faker } = require("@faker-js/faker");
const fs = require("fs");

const createUser = (noOfUsers, overwrite) => {
  if (!noOfUsers) {
    console.log("Please input number: ");
    return;
  }

  noOfUsers = parseInt(noOfUsers);
  console.log("Creating users");

  // turn current database from JSON to JS object
  let usersData = JSON.parse(fs.readFileSync("db.json"));
  if (overwrite) {
    usersData.users = [];
  }

  for (let i = 0; i < noOfUsers; i++) {
    const user = {
      id: faker.string.uuid(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    };
    console.log("Created", user.fullName, user.email, user.avatar);
    console.log("------");
    usersData.users.push(user);
  }
  fs.writeFileSync("db.json", JSON.stringify(usersData));
  console.log(`Create ${noOfUsers} success`);
};

const noOfUserInput = process.argv.slice(2)[0];
const overwriteInput = process.argv.slice(2)[1];
createUser(noOfUserInput, overwriteInput);
