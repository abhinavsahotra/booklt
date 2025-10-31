const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
    experienceId: {type: String, ref: "Experience",required: true},
    date: {type: Date,required: true},
    time: {type: String, required: true},
    quantity: {type: Number,default: 1},
    total: {type: Number,required: true},
    refId: {type: String,unique: true},
    status: {type: String,enum: ["Pending", "confirmed", "failed"],default: "Pending"},
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);
module.exports = BookingModel;
