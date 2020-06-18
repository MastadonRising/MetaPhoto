const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://user:password1@ds031948.mlab.com:31948/heroku_tmwz9gv0"
);

const PhotoSeed = [
  {
    _id: ObjectId("5ee550a2847950363c2d9c51"),
    routes: [
      {
        id: 105812282,
        name: "Knapsack Crack",
        type: "Trad",
        rating: "5.4",
        stars: 3.4,
        starVotes: 319,
        pitches: 3,
        location: [
          "California",
          "Lake Tahoe",
          "Highway 50 Corridor",
          "Lover's Leap",
          "Hogsback",
          "North Face",
        ],
        url: "https://www.mountainproject.com/route/105812282/knapsack-crack",
        imgSqSmall:
          "https://cdn2.apstatic.com/photos/climb/107765845_sqsmall_1494210136.jpg",
        imgSmall:
          "https://cdn2.apstatic.com/photos/climb/107765845_small_1494210136.jpg",
        imgSmallMed:
          "https://cdn2.apstatic.com/photos/climb/107765845_smallMed_1494210136.jpg",
        imgMedium:
          "https://cdn2.apstatic.com/photos/climb/107765845_medium_1494210136.jpg",
        longitude: -120.1356,
        latitude: 38.8051,
      },
    ],
    handle: "3oozQVcKRly4lWD7iRmO",
    url: "https://cdn.filestackcontent.com/3oozQVcKRly4lWD7iRmO",
    userID: "5edc264e94b7f74940f19c4c",
    routeID: "105812282",
    likes: [],
    date: ISODate("2020-06-13T22:18:10.919Z"),
    __v: 0,
    exifdata:
      '{"Make":"Apple","Model":"iPhone X","Orientation":6,"XResolution":72,"YResolution":72,"ResolutionUnit":2,"Software":"13.1.3","DateTime":"2019:10:23 16:27:03","YCbCrPositioning":1,"ExifIFDPointer":206,"GPSInfoIFDPointer":1924,"ExposureTime":0.006024096385542169,"FNumber":2.2,"ExposureProgram":"Normal program","ISOSpeedRatings":20,"ExifVersion":"0231","DateTimeOriginal":"2019:10:23 16:27:03","DateTimeDigitized":"2019:10:23 16:27:03","undefined":24,"ComponentsConfiguration":"YCbCr","ShutterSpeedValue":7.3731478544564775,"ApertureValue":2.2750070476914215,"BrightnessValue":7.655920457969268,"ExposureBias":0,"MeteringMode":"Pattern","Flash":"Flash did not fire, auto mode","FocalLength":2.87,"MakerNote":"","SubsecTimeOriginal":"529","SubsecTimeDigitized":"529","FlashpixVersion":"0100","ColorSpace":65535,"PixelXDimension":3088,"PixelYDimension":2320,"SensingMethod":"One-chip color area sensor","SceneType":"Directly photographed","ExposureMode":0,"WhiteBalance":"Auto white balance","FocalLengthIn35mmFilm":32,"SceneCaptureType":"Standard","GPSLatitudeRef":"N","GPSLatitude":[38,48,18.26],"GPSLongitudeRef":"W","GPSLongitude":[120,8,5.43],"GPSAltitudeRef":0,"GPSAltitude":1884.307917888563,"GPSSpeedRef":"K","GPSSpeed":0.914566696030153,"GPSImgDirectionRef":"T","GPSImgDirection":222.1219598167078,"GPSDestBearingRef":"T","GPSDestBearing":42.1219596942321,"thumbnail":{"Compression":6,"XResolution":72,"YResolution":72,"ResolutionUnit":2,"JpegIFOffset":2268,"JpegIFByteCount":9735,"blob":{}}}',
  },
  {
    _id: ObjectId("5ee54c0c847950363c2d9c50"),
    routes: [
      {
        id: 105812282,
        name: "Knapsack Crack",
        type: "Trad",
        rating: "5.4",
        stars: 3.4,
        starVotes: 319,
        pitches: 3,
        location: [
          "California",
          "Lake Tahoe",
          "Highway 50 Corridor",
          "Lover's Leap",
          "Hogsback",
          "North Face",
        ],
        url: "https://www.mountainproject.com/route/105812282/knapsack-crack",
        imgSqSmall:
          "https://cdn2.apstatic.com/photos/climb/107765845_sqsmall_1494210136.jpg",
        imgSmall:
          "https://cdn2.apstatic.com/photos/climb/107765845_small_1494210136.jpg",
        imgSmallMed:
          "https://cdn2.apstatic.com/photos/climb/107765845_smallMed_1494210136.jpg",
        imgMedium:
          "https://cdn2.apstatic.com/photos/climb/107765845_medium_1494210136.jpg",
        longitude: -120.1356,
        latitude: 38.8051,
      },
    ],
    handle: "WuZ4AbB4QiyUH4vFwroS",
    url: "https://cdn.filestackcontent.com/WuZ4AbB4QiyUH4vFwroS",
    userID: "5edc264e94b7f74940f19c4c",
    routeID: "105812282",
    likes: [],
    date: ISODate("2020-06-13T21:58:36.626Z"),
    __v: 0,
    exifdata:
      '{"Make":"Apple","Model":"iPhone X","Orientation":1,"XResolution":72,"YResolution":72,"ResolutionUnit":2,"Software":"13.1.3","DateTime":"2019:10:23 17:55:21","YCbCrPositioning":1,"ExifIFDPointer":206,"GPSInfoIFDPointer":2016,"ExposureTime":0.006172839506172839,"FNumber":1.8,"ExposureProgram":"Normal program","ISOSpeedRatings":20,"ExifVersion":"0231","DateTimeOriginal":"2019:10:23 17:55:21","DateTimeDigitized":"2019:10:23 17:55:21","undefined":12.001812415043045,"ComponentsConfiguration":"YCbCr","ShutterSpeedValue":7.3402799872733056,"ApertureValue":1.6959938128383605,"BrightnessValue":6.851657106437221,"ExposureBias":0,"MeteringMode":"Pattern","Flash":"Flash did not fire, auto mode","FocalLength":4,"SubjectArea":[2015,1511,2217,1330],"MakerNote":"","SubsecTimeOriginal":"969","SubsecTimeDigitized":"969","FlashpixVersion":"0100","ColorSpace":65535,"PixelXDimension":4032,"PixelYDimension":3024,"SensingMethod":"One-chip color area sensor","SceneType":"Directly photographed","ExposureMode":0,"WhiteBalance":"Auto white balance","FocalLengthIn35mmFilm":28,"SceneCaptureType":"Standard","GPSLatitudeRef":"N","GPSLatitude":[38,48,16.92],"GPSLongitudeRef":"W","GPSLongitude":[120,8,1.64],"GPSAltitudeRef":0,"GPSAltitude":1888.2114164904863,"GPSSpeedRef":"K","GPSSpeed":0.05815033238424972,"GPSImgDirectionRef":"T","GPSImgDirection":69.06057737813535,"GPSDestBearingRef":"T","GPSDestBearing":69.06057737813535,"thumbnail":{"Compression":6,"XResolution":72,"YResolution":72,"ResolutionUnit":2,"JpegIFOffset":2360,"JpegIFByteCount":6597,"blob":{}}}',
  },
];

db.Photos.remove({})
  .then(() => db.Photos.collection.insertMany(PhotoSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
