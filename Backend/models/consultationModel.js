const mongoose = require("mongoose");
const slugify = require("slugify");

const consultationSchema = new mongoose.Schema(
  {
    title_AR: {
      type: String,
      trim: true,
      required: [true, "a consultation must have an arabic title"]
    },
    title_EN: {
      type: String,
      trim: true,
      required: [true, "a consultation must have an english title"]
    },
    description_AR: {
      type: String,
      required: [true, "an consultation must have an arabic description"]
    },
    description_EN: {
      type: String,
      required: [true, "an consultation must have an english description"]
    },
    body_AR: {
      type: String,
      required: [true, "an consultation must have an arabic body"]
    },
    body_EN: {
      type: String,
      required: [true, "an consultation must have an english body"]
    },
    category: {
      type: String,
      required: true
    },
    views: { type: Number, default: 0 },
    slug: String,
    coverImage: {
      type: String,
      required: [true, "a consultation must have an image"]
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

consultationSchema.index({ slug: 1 });

consultationSchema.pre("save", function(next) {
  this.slug = slugify(this.title_EN, { lower: true });
  next();
});

const Consultation = mongoose.model("Consultation", consultationSchema);

module.exports = Consultation;
