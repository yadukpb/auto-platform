import asyncHandler from "express-async-handler";
import Product from '../models/productModel1.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // const pageSize = 10;
  // const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    // .limit(pageSize)
    // .skip(pageSize * (page - 1));

    // res.json({ products, page, pages: Math.ceil(count / pageSize) })
    res.json({ products })
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    images:"/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    
    if (!product) {
      res.status(404)
      throw new Error('Product not found')
    }

    // Log incoming data
    console.log('Incoming update data:', req.body)

    // Preserve existing values if not provided in update
    const updatedData = {
      name: req.body.name || product.name,
      price: req.body.price || product.price,
      description: req.body.description || product.description,
      image: req.body.image || product.image,
      images: req.body.images || product.images,
      brand: req.body.brand || product.brand,
      category: req.body.category || product.category,
      mileage: req.body.mileage || product.mileage,
      seats: req.body.seats || product.seats,
      ownership: req.body.ownership || product.ownership,
      fuelType: req.body.fuelType || product.fuelType || 'Petrol',
      modelYear: req.body.modelYear || product.modelYear || new Date().getFullYear(),
      transmissionType: req.body.transmissionType || product.transmissionType || 'Manual',
      user: req.body.user || product.user
    }

    // Update using findByIdAndUpdate to avoid validation issues
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )

    res.json(updatedProduct)
  } catch (error) {
    console.error('Update error:', error)
    res.status(400).json({
      message: error.message,
      details: error.errors ? Object.values(error.errors).map(e => e.message) : []
    })
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

 
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
};
