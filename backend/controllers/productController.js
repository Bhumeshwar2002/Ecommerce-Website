const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander");

const catchAsyncErrors = require("../middleware/catchAsyncError");
const Apifeatuers = require("../utils/apifeatures");

//create products --Admin
exports.createproduct = catchAsyncErrors(async (req, res, next) => {
	req.body.user = req.user.id;

	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
});

// get all products
exports.getAppProducts = catchAsyncErrors(async (req, res) => {
	
	const resultPerPage = 8;
	const productCount = await Product.countDocuments();

	const apifeature = new Apifeatuers(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resultPerPage);
	const products = await apifeature.query;

	res.status(200).json({
		success: true,
		products,
		productCount,
		resultPerPage
	});
});

//update products --admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("product not found", 404));
	}
	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindandModify: false,
	});

	res.status(200).json({
		success: true,
		product,
	});
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("product not found", 404));
	}
	await product.deleteOne();
	res.status(200).json({
		success: true,
		message: "product Deleted Successfully",
	});
});

//get single product / product detail

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	

	if (!product) {
		return next(new ErrorHandler("product not found", 404));
	}
	res.status(200).json({
		success: true,
		product,
		
		
	});
});

// create a new review or update the revew
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
	const { rating, comment, productId } = req.body;
	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};

	const product = await Product.findById(productId);
	const isReviewed = product.reviews.find(
		(rev) => rev.user.toString() === req.user._id.toString()
	);
	if (isReviewed) {
		product.reviews.forEach((rev) => {
			if ((rev) => rev.user.toString() === req.user._id.toString()) {
				(rev.rating = rating), (rev.comment = comment);
			}
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length
	}


	let avg =0;
	product.reviews.forEach(rev=>{
		avg+=rev.rating
	})

	product.ratings=avg/product.reviews.length;

	await product.save({validateBeforeSave:false});
	res.status(200).json({
		success:true
	})
});



// get all reviews of product
exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
	const product = await Product.findById(req.query.id);

	if(!product){
		return next(new ErrorHandler("Product not found",404));
	}

	res.status(200).json({
		success:true,
		reviews:product.reviews
	})

})

// delete Review
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
	const product = await Product.findById(req.query.productId);

	if(!product){
		return next(new ErrorHandler("Product not found",404));
	}

	const reviews = product.reviews.filter((rev)=> rev._id.toString() !== req.query.id.toString())

	let avg =0;
	reviews.forEach(rev=>{
		avg+=rev.rating
	})

	const ratings=avg/reviews.length;

	const numOfReviews = reviews.length;

	await Product.findByIdAndUpdate(req.query.productId, {
		reviews,
		ratings,
		numOfReviews
	},
	{
		new:true,
		runValidators:true,
		useFindandModify:false
	})


	res.status(200).json({
		success:true,
		
	})

})



