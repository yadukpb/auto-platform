import mongoose from 'mongoose'
const CouponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: true,
      minlength: [6, 'Too short'],
      maxlength: [12, 'Too long'],
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      requred: true,
    },
  },
  {
    timestamps: true,
  }
)
const Coupon = mongoose.model('Coupon', CouponSchema)

export default Coupon