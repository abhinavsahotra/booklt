const mongoose = require("mongoose");

const promoCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },   
    type: { type: String, enum: ["percentage", "flat"], required: true },
    value: { type: Number, required: true },                
    isActive: { type: Boolean, default: true },
    expiryDate: { type: Date },                             
    minOrderValue: { type: Number, default: 0 }             
  },
  { timestamps: true }
);

const PromoCode = mongoose.model("PromoCode", promoCodeSchema);

module.exports = PromoCode;
