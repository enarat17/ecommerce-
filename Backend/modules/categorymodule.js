const mongoose = require("mongoose");
const categoryschema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: {
    type: String,
    default: "category discription any speeach yoy want",
  },
  image: { type: String, default: "/images/cam.jpg" },
  attrs: [{ key: { type: String }, value: [{ type: String }] }],
});

categoryschema.index({ name: 1, description: 1 });

const category = mongoose.model("category", categoryschema);

module.exports = category;
