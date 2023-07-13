const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const contactSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    about:{
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
