const express = require("express");
const PromoCode = require("../models/promocode")
const promoRouter = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");

// Create a promo code (admin only)
promoRouter.post("/create", verifyAdmin, async (req, res) => {
  try {
    const { code, type, value, expiryDate, minOrderValue } = req.body;

    const existing = await PromoCode.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: "Promo code already exists" });
    }

    const promo = new PromoCode({
      code: code.toUpperCase(),
      type,
      value,
      expiryDate,
      minOrderValue,
    });

    await promo.save();
    res.status(201).json({ success: true, message: "Promo created successfully", promo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error while creating promo" });
  }
});

// Get all promos (admin only)
promoRouter.get("/", verifyAdmin, async (req, res) => {
  try {
    const promos = await PromoCode.find().sort({ createdAt: -1 });
    res.json({ success: true, data: promos });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching promos" });
  }
});

// Delete promo by code (admin only)
promoRouter.delete("/:code", verifyAdmin, async (req, res) => {
  try {
    const promo = await PromoCode.findOneAndDelete({ code: req.params.code.toUpperCase() });
    if (!promo) return res.status(404).json({ success: false, message: "Promo not found" });
    res.json({ success: true, message: "Promo deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting promo" });
  }
});


// Validate promo (public — used by users at checkout)
promoRouter.post("/validate", async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) 
        return res.status(400).json({ 
        success: false, message: "Promo code required" 
    });

    if (typeof subtotal !== "number") {
      return res.status(400).json({ 
        success: false, message: "Subtotal must be provided as number" 
    });
    }

    const promo = await PromoCode.findOne({ code: code.trim().toUpperCase() });

    if (!promo) {
      return res.status(404).json({ success: false, message: "Promo code not found" });
    }

    if (!promo.isActive) {
      return res.status(400).json({ success: false, message: "Promo code is not active" });
    }

    if (promo.expiryDate && new Date() > promo.expiryDate) {
      return res.status(400).json({ success: false, message: "Promo code has expired" });
    }

    if (promo.minOrderValue && subtotal < promo.minOrderValue) {
      return res.status(400).json({
        success: false,
        message: `Promo requires minimum order value of ₹${promo.minOrderValue}`,
      });
    }

    let discountAmount = 0;
    if (promo.type === "percentage") {
      discountAmount = +(subtotal * (promo.value / 100)); // e.g. 0.1 * subtotal
    } else {
      discountAmount = promo.value;
    }

    // Make sure discount is not greater than subtotal
    if (discountAmount > subtotal) discountAmount = subtotal;

    const newTotal = +(subtotal - discountAmount); 

    return res.json({
      success: true,
      message: "Promo applied",
      data: {
        code: promo.code,
        type: promo.type,
        value: promo.value,
        discountAmount: Number(discountAmount.toFixed(2)),
        newTotal: Number(newTotal.toFixed(2)),
      },
    });
  } catch (err) {
    console.error("Promo validate error:", err);
    return res.status(500).json({ 
        success: false, message: "Server error validating promo" 
    });
  }
});

module.exports = {
    promoRouter: promoRouter
};
