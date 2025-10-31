const express = require('express');
const { experienceRouter } = require('./experience');
const { authRouter } = require('./auth');
const { bookingRouter } = require('./booking');
const { promoRouter } = require('./promoValidate');
const router = express.Router();

router.use("/auth", authRouter)
router.use("/", experienceRouter);
router.use("/booking", bookingRouter);
router.use("/promo", promoRouter);

module.exports = router;