// models/user.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  professionalName: String,
  //firstName: String,
  nameLink: {
    firstName: String,
    url: String
  },
  base64Image: String,
  firstName: String,
  primaryDescription: String,
  workDescription1: String,
  workDescription2: String,
  linkTitleText: String,
  linkedInLink: {
    text: String,
    link: String
  },
  githubLink: {
    text: String,
    link: String
  },
  contactText: String
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

