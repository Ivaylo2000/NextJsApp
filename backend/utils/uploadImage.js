const { v4: uuidv4 } = require("uuid");
const bucket = require("../firebase");

const uploadImageToFirebase = async (file) => {
  const uniqueFileName = `${uuidv4()}`;
  const filePath = `products/${uniqueFileName}`;
  const firebaseFile = bucket.file(filePath);

  await firebaseFile.save(file.buffer, {
    metadata: { contentType: file.mimetype },
  });

  return uniqueFileName;
};

module.exports = uploadImageToFirebase;
