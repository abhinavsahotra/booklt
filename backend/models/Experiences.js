const mongoose = require("mongoose");
const Counter = require("./Counter")

const ExperienceSchema = new mongoose.Schema({
    _id: String, 
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
  },{ timestamps: true }
);

ExperienceSchema.pre('save', async function(next) {
  if (this.isNew) {   // Only assign ID for new documents
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'experienceId' }, // the "counter document" for Experience IDs
      { $inc: { seq: 1 } },    // increment seq by 1
      { new: true, upsert: true } // create document if it doesn't exist
    );
    this._id = counter.seq;    // assign the incremented number to this Experience
  }
  next();
});


const Experience = mongoose.model("Experience", ExperienceSchema);
module.exports = Experience
