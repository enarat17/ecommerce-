const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title_AR: {
      type: String,
      trim: true,
      required: [true, "a blog must have an arabic name"]
    },
    title_EN: {
      type: String,
      trim: true,
      required: [true, "a blog must have an english name"]
    },
    description_AR: {
      type: String,
      required: [true, "a blog must have an arabic description"]
    },
    description_EN: {
      type: String,
      required: [true, "a post must have an english description"]
    },
    file: {
      type: String,
      required: true
    },
    views: { type: Number, default: 0 },
    category: {
      type: String,
      required: true
    },
    coverImage: {
      type: String,
      required: true
    },
    slug: String,
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

blogSchema.index({ slug: 1 });

blogSchema.pre("save", function(next) {
  this.slug = slugify(this.title_EN, { lower: true });
  next();
});

blogSchema.methods.incrementViews = async function() {
  this.views += 1;
  await this.save();
};

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
