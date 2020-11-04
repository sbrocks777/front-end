const faker = require("faker");
const _ = require("lodash");
const categories = ["dance", "music", "art"];
const payment = ["online", "offline"];
const firebase = require("firebase");
require("firebase/database");

const app = firebase.initializeApp({
  apiKey: "AIzaSyAtklKJe3H91UW6QDNi1YaMEIc6rr2zfgQ",
  authDomain: "mini-project-d804d.firebaseapp.com",
  databaseURL: "https://mini-project-d804d.firebaseio.com",
  projectId: "mini-project-d804d",
  storageBucket: "mini-project-d804d.appspot.com",
  messagingSenderId: "87144960262",
  appId: "1:87144960262:web:8235e44ad0fb5ed1ff8e87",
  measurementId: "G-F9DRH4WN2Q",
});

const db = firebase.firestore(app);

const ref = db.collection("events");

for (let i = 0; i < 50; i++) {
  var eventName = faker.commerce.productName();
  var eventDescription = faker.commerce.productDescription();
  var eventCategory = _.sample(categories);
  var eventStartDate = faker.date.between(new Date(), "1-1-2021");
  var eventEndDate = faker.date.between(new Date(), "1-1-2021");
  var eventStartTime = faker.time.recent();
  var eventEndTime = faker.time.recent();
  var eventSeatsLimit = faker.random.number();
  var eventTicketPrice = faker.commerce.price();
  var eventCity = faker.address.city();

  var eventOrganizerName = faker.name.findName();
  var eventOrganizerEmail = faker.internet.email();
  var eventOrganizerPhoneNumber = faker.phone.phoneNumber();
  var eventThumbnail = faker.image.imageUrl();
  var eventBanner = faker.image.imageUrl();
  var eventPaymentOption = _.sample(payment);

  ref
    .add({
      eventName,
      eventDescription,
      eventCategory,
      eventStartDate,
      eventEndDate,
      eventStartTime,
      eventEndTime,
      eventSeatsLimit,
      eventTicketPrice,
      eventCity,

      eventOrganizerEmail,
      eventOrganizerName,
      eventOrganizerPhoneNumber,
      eventThumbnail,
      eventBanner,
      eventPaymentOption,
      uid: "YqpCKAfmROVAVeCM0bDq4HQhJL43",
      isActive: false,
      isFeatured: false
    })
    .then(
      () => console.log("Data is Added!"),
      (err) => console.log(err)
    );
}
