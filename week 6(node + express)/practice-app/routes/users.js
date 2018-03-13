var express = require('express');
var router = express.Router();

var fs = require('fs');
var jsonfile = require('jsonfile');
var userFile = __dirname + '/tempFile.json';
var stats = fs.statSync(userFile);

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (stats.size == 0) {
    res.send({
      response: "empty file"
    });
  } else {
    var data = jsonfile.readFileSync(userFile);
    res.send({
      response: data
    });
  }

});

router.post('/', (req, res, next) => {
  let user = {
    userName: `${req.body.username}`,
    userPass: `${req.body.password}`
  };
  let users = [];
  if (stats.size == 0) {
    users.push(user);
  } else {
    users = jsonfile.readFileSync(userFile);
    users.push(user);
  }
  jsonfile.writeFileSync(userFile, users);
  res.send({
    response: users
  });
});

router.delete('/', (req, res, next) => {
  let userName = `${req.body.username}`;
  let users = [];
  if (stats.size == 0) {
    res.send("File already empty");
  } else {
    let count = 0;
    users = jsonfile.readFileSync(userFile);
    let filteredUsers = users.filter((obj) => {
      return obj.userName != userName;
    });
    count = users.length - filteredUsers.length;
    if (count == 0) {
      res.send("No such record available");
    } else {
      jsonfile.writeFileSync(userFile, filteredUsers);
      res.send({
        response: filteredUsers,
        message: `${count} records deleted successfully`
      });
    }
  }

});

router.put('/', (req, res, next) => {
  let userName = `${req.body.username}`;
  let userPass = `${req.body.password}`;
  let users = [];
  if (stats.size == 0) {
    res.send("File already empty");
  } else {
    let count = 0;
    users = jsonfile.readFileSync(userFile);
    for (let index = 0; index < users.length; index++) {
      if (users[index].userName == userName) {
        users[index].userPass = userPass;
        count++;
      }
    }
    if (count == 0) {
      res.send("No such record available");
    } else {
      jsonfile.writeFileSync(userFile, users);
      res.send({
        response: users,
        message: `${count} records updated successfully`
      });
    }
  }

});




module.exports = router;