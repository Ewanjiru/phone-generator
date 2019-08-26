const fs = require("fs");
const util = require('util');
const readFile = util.promisify(fs.readFile);
const path = require('path');

const baseDir = path.join(__dirname, "/../files");

const generator = () => Math.floor(Math.random() * 900000000 + 100000000);

const phoneGenerator = async (req, res) => {
  try {
    const phoneNumberCount = req.body.totalPhoneNumbers;
    if (phoneNumberCount > 10000 || phoneNumberCount < 1) return res.status(400).json({
      message: 'Number of generated phone numbers should be between 1 to 10000'
    });

    const phones = [];
    for (let i = 0; i < phoneNumberCount; i++) {
      const newPhone = generator();
      phones.push('0'.concat(newPhone));
    }

    const dataToWrite = phones.join() + ',';
    fs.open(`${baseDir}/phones.txt`, 'a', (err, fd) => {
      if (err) return res.send({ message: err });
      fs.appendFile(fd, dataToWrite, 'utf8', (err) => {
        if (err) return res.send({ message: err });
        res.status(201).send({ Total: phoneNumberCount, phoneNumbers: phones });
        fs.close(fd, (err) => {
          if (err) res.send({ message: err });
        });
      });
    })
  } catch (error) {
    return res.status(500).send(error);
  }
}

const getAllPhones = async (req, res) => {
  try {
    const phoneNumbers = await readFile(`${baseDir}/phones.txt`, 'utf8');
    if (!req.query.sort) {
      let newPhoneArray = phoneNumbers.split(',');
      newPhoneArray.pop();
      return res.status(200).send({
        numbers: newPhoneArray,
        totalCount: newPhoneArray.length
      });
    }

    const sortedNumbers = await sortPhoneNumbers(req.query.sort, phoneNumbers);
    const totalCount = sortedNumbers.length;
    const maxNumber = '0' + Math.max.apply(null, sortedNumbers);
    const minNumber = '0' + Math.min.apply(null, sortedNumbers);
    const results = {
      totalCount,
      maxNumber,
      minNumber,
      sortedNumbers: sortedNumbers.map(number => '0' + number)
    };
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
}

const sortPhoneNumbers = async (sortBy, phoneNumbers) => {
  let sortedPhoneNumbers;
  if (sortBy === 'asc' || sortBy === 'desc') {
    let newArray = phoneNumbers.split(',');
    newArray.pop();
    newArray = newArray.map(phone => parseInt(phone));
    if (sortBy === 'asc') {
      sortedPhoneNumbers = newArray.sort((a, b) => a - b);
    } else {
      sortedPhoneNumbers = newArray.sort((a, b) => b - a);
    }
  }

  return sortedPhoneNumbers;
}

module.exports = {
  phoneGenerator,
  getAllPhones,
  sortPhoneNumbers
};