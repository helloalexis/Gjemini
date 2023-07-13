
const mongoose = require("mongoose")

const {Schema} = mongoose;
mongoose.Promise = global.Promise;


const postSchema = new Schema(
  {
    title: {
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


module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);
