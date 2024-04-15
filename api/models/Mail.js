import mongoose from "mongoose";
const emailSchema = new mongoose.Schema({
    to: String, // Only for sent emails
    from: String, // Only for received emails
    subject: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    // Other email fields...
  }, { timestamps: true });

  export default emailSchema;