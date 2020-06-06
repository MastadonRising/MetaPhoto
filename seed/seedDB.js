

const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/reactMetaPhotodb"
);

const resourceSeed = [
  {
    name: "REI",
    url: "https://www.rei.com/h/climbing",
    photo: "https://satchel.rei.com/media/img/header/rei-co-op-logo-black.svg",
    desc: "Great source of outdoor gear",
  },
  {
    name: "Rock and Ice Climbing Terminology",
    url: "https://rockandice.com/how-to-climb/climbing-terminology/",
    photo:
      "https://d1vs4ggwgd7mlq.cloudfront.net/wp-content/uploads/2017/09/HTC-1-e1506543271799-943x563.jpg",
    desc: "Glossary of common rock climbing terms",
  },
  {
    name: "CRAGS Climbing Resource Advocates for Greater Sacramento",
    url: "https://norcalcrags.org/",
    photo:
      "https://scontent.fsac1-1.fna.fbcdn.net/v/t1.0-9/23561592_10156120267134467_3629986482978573633_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=chbTsgultYYAX8nR839&_nc_ht=scontent.fsac1-1.fna&oh=4dd80ab2dcea4a183633ffab4e50309b&oe=5EEF3233",
    desc: "Glossary of common rock climbing terms",
  },
]

db.Resources
  .remove({})
  .then(() => db.Resources.collection.insertMany(resourceSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
