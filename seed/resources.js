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
    level: 1,
  },
  {
    name: "Rock and Ice Climbing Terminology",
    url: "https://rockandice.com/how-to-climb/climbing-terminology/",
    photo:
      "https://d1vs4ggwgd7mlq.cloudfront.net/wp-content/uploads/2017/09/HTC-1-e1506543271799-943x563.jpg",
    desc: "Glossary of common rock climbing terms",
    level: 1,
  },
  {
    name: "CRAGS Climbing Resource Advocates for Greater Sacramento",
    url: "https://norcalcrags.org/",
    photo:
      "https://scontent.fsac1-1.fna.fbcdn.net/v/t1.0-9/23561592_10156120267134467_3629986482978573633_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=chbTsgultYYAX8nR839&_nc_ht=scontent.fsac1-1.fna&oh=4dd80ab2dcea4a183633ffab4e50309b&oe=5EEF3233",
    desc: "Local Advocacy group for sacramento",
    level: 1,
  },
  {
    name: "How To Warm Up Properly For Climbing",
    url:
      "https://rockandice.com/rock-climbing-training/how-to-warm-up-properly-for-climbing/",
    photo:
      "https://secureservercdn.net/50.62.194.30/9ac.3b5.myftpupload.com/wp-content/uploads/2016/11/Grotto_1.jpg",
    desc: "Good advice for staying uninjured",
    level: 2,
  },
  {
    name: "Your First 7 Climbing Partners",
    url: "https://www.climbing.com/people/your-first-7-climbing-partners/",
    photo:
      "https://www.climbing.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_860/MTU1NTI1MDI4Mjc0OTcxNzc5/insta_sender.webp",
    desc: " Freindly heads up about the people you trust with your life",
    level: 1,
  },
  {
    name: "How to become a terrible Trad Climber",
    url:
      "https://www.climbing.com/skills/the-6-best-tips-for-becoming-the-worst-trad-climber/",
    photo:
      "https://www.climbing.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_860/MTY2MjQ0MzMxNjg0ODk4NzYz/080_cl_jul19jpg.webp",
    desc: "What not to do",
    level: 2,
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