const axios = require("axios");
const FormData = require("form-data");

const uploadToImgBB = async (buffer, originalname) => {
  const form = new FormData();
  form.append("image", buffer.toString("base64"));
  form.append("name", originalname);

  console.log(form);

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    form,
    { headers: form.getHeaders() }
  );

  return {
    url: response.data.data.url,
  };
};

module.exports = uploadToImgBB;
