const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const projectsCategory = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Category || mongoose.model("Category", projectsCategory);
