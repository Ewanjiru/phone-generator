[![Coverage Status](https://coveralls.io/repos/github/Ewanjiru/phone-generator/badge.svg?branch=dev)](https://coveralls.io/github/Ewanjiru/phone-generator?branch=dev) [![CircleCI](https://circleci.com/gh/Ewanjiru/phone-generator.svg?style=svg)](https://circleci.com/gh/Ewanjiru/phone-generator)

__**Phone Generator**__

This is a node.js app use to randomly generate phone numbers and write them to files.It's built using below technologies.

- Express.js: A Fast, opinionated, minimalist web framework for node which was used in routing this application.

- BodyParser: This module was used to collect search data sent from the client side to the routing page.

**Pre requisites**

Install (if not installed)
- nodejs

**Installation**

- Cd into your folder
- Clone this repository.
- Create a .env and add NODE_ENV variable.
- npm install to install all dependencies.
- npm start: to start the app.
- npm test: to runs all the tests

**Features of the API**

A user can:
- generate phone numbers given a limit not above 10,000
- retrieve all phonenumbers
- sort phonenumbers ascending or descending
- view maximum and minimum phonemnumbers

**API Documentation**
```
POST limit /api/phoneNumbers
Request
{
	"totalPhoneNumbers": 2
}
Response
{
    "Total": 2,
    "phoneNumbers": [
        "0808703629",
        "0420173514"
    ]
}

GET all phoneNumber /api/phoneNumbers
Response
{
    "numbers": [
        "0905770439",
        "0503990186",
        "0891074075",
        "0497076044",
        "0901317699",
        "0812348407",
        "0364617124",
        "0227056412",
        "0259375022",
        "0408616666",
        "0808703629",
        "0420173514"
    ],
    "totalCount": 12
}

GET all and sort by descending /api/phoneNumbers?sort=asc
{
    "totalCount": 12,
    "maxNumber": "0905770439",
    "minNumber": "0227056412",
    "sortedNumbers": [
        "0227056412",
        "0259375022",
        "0364617124",
        "0408616666",
        "0420173514",
        "0497076044",
        "0503990186",
        "0808703629",
        "0812348407",
        "0891074075",
        "0901317699",
        "0905770439"
    ]
}

GET all and sort by descending /api/phoneNumbers?sort=desc
{
    "totalCount": 12,
    "maxNumber": "0905770439",
    "minNumber": "0227056412",
    "sortedNumbers": [
        "0905770439",
        "0901317699",
        "0891074075",
        "0812348407",
        "0808703629",
        "0503990186",
        "0497076044",
        "0420173514",
        "0408616666",
        "0364617124",
        "0259375022",
        "0227056412"
    ]
}
```
