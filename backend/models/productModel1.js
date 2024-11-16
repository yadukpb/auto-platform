import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true
    },
    sellerContact: {
      type: String,
      required: true
    },
    sellerLocation: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
    brand: {
      type: String,
      required: true,
      enum: [
        'Maruti Suzuki',
        'Tata Motors',
        'Mahindra',
        'Hyundai',
        'Honda',
        'Toyota',
        'Kia',
        'MG',
        'Skoda',
        'Volkswagen',
        'BMW',
        'Mercedes'
      ]
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    mileage: {
      type: Number,
      required: true,
      default: 0
    },
    seats: {
      type: Number,
      required: true,
      default: 0
    },
    ownership: {
      type: Number,
      required: true,
      default: 1
    },
    fuelType: {
      type: String,
      required: true,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']
    },
    modelYear: {
      type: Number,
      required: true
    },
    transmissionType: {
      type: String,
      required: true,
      enum: ['Manual', 'Automatic']
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
