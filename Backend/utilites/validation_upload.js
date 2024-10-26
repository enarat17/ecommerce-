const imageValidation = (images) => {
  let imagetable = [];
  if (Array.isArray(images)) {
    imagetable = images;
  } else {
    imagetable.push(images);
  }

  if (imagetable.length > 3) {
    return { error: "You can upload only 3 images" };
  }

  for (let i = 0; i < imagetable.length; i++) {
    const image = imagetable[i];
    if (image.size > 1000000)
      return { error: "Image size should be less than 1MB" };

    // const filetype = /png|jpg|jpeg|PNG/;
    // const mimeType = filetype.test(image.mimetype);
    // if (!mimeType)
    //   return { error: "You can upload only jpeg and png images and jpg" };

    if (
      image.mimetype !== "image/jpeg" &&
      image.mimetype !== "image/png" &&
      image.mimetype !== "image/jpg"
    ) {
      return { error: "You can upload only jpeg and png images" };
    }
  }
  return { error: false };
};

module.exports = imageValidation;
