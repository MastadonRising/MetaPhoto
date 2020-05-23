import Amplify, { Storage } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

export default {
  getOneFromStorage: async function (file) {
    Storage.get(file.key)
      .then((result) => result)
      .catch((err) => console.log(err));
  },

  uploadToS3andRetrieve: async function (file) {
    try {
      const upload = await Storage.put(`${Date.now()}-${file.name}`, file, {
        contentType: "image/png",
      });
      return await Storage.get(upload.key);
    } catch (err) {
      throw err;
    }
  },
};
