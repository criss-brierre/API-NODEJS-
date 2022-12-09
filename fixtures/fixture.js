let userModel = require('../models/userModel');
const groupsSchema = require('../models/groupModel');
const faker = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const connection = require('../database');
var ObjectId = require('mongodb').ObjectId;


const Roles = [['ROLE_ADMIN'], ['ROLE_USER']];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let result;
let done;
let users;
let isLoaded = async (res,) => {
    users = await connection.connection.collection('users').find({}).toArray().then(done = true);

}


if (done = true) {
    if (users === null || users === undefined) {
        for (var i = 0; i <= 30; i++) {
            result = async () => {
                let idgroupe;
                if (i <= 5) {
                    idgroupe = new ObjectId();
                    groupsSchema.create({
                        "_id": idgroupe,
                        "name": faker.faker.internet.userName(),
                        "createdAt": faker.faker.date.past(),
                        "updatedAt": faker.faker.date.past()
                    })
                }
                userModel.create({
                    "email": faker.faker.internet.email(),
                    "password": await bcrypt.hash("password", 10),
                    "roles": Roles[getRandomInt(2)],
                    "firstname": faker.faker.internet.userName(),
                    "lastname": faker.faker.internet.userName(),
                    "createdAt": faker.faker.date.past(),
                    "updatedAt": faker.faker.date.past(),
                    "groups_id": idgroupe
                })

            }
            result();
        }
        console.log("fixture ajouté !")

    } else {
        console.log("fixture déjà load ! ")
    }
}








