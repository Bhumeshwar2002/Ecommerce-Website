const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorhander");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");


// create new order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
	const {
		shippingInfo,
		orderItems,
		paymentInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

    const order = await Order.create({
        shippingInfo,
		orderItems,
		paymentInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
        paidAt:Date.now(),
        user:req.user._id,

    })

    res.status(201).json({
        success:true,
        order
    })

});

// get single order

exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
	const order = await Order.findById(req.params.id).populate("user","name email");
	if(!order){
		return next(new ErrorHandler("order not found with this id",404))
	}

	res.status(200).json({
		success:true,
		order,
	})
})


// get logged in user orders

exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
	const orders = await Order.find({user: req.user._id});
	

	res.status(200).json({
		success:true,
		orders,
	})
})


// get all orders

exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
	const orders = await Order.find();
	
	let totalAmount =0;

	orders.forEach(order => {
		totalAmount+=order.totalPrice;
	});

	res.status(200).json({
		success:true,
		totalAmount,
		orders,
	})
})


// deleteOrders --admin


exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
	const order = await Order.findById(req.params.id);

	if(!order){
		return next(new ErrorHandler("order not found with this id",404))
	}
	
	await order.deleteOne()

	res.status(200).json({
		success:true,
		
	})
})


// update order status --admin

exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
	const order = await Order.findById(req.params.id);
	
	if(!order){
		return next(new ErrorHandler("order not found with this id",404))
	}

	if(order.orderStatus==="Delivered"){
		return next(new ErrorHandler("you have delivered this order",400))
	}

	order.orderItems.forEach(async(o)=>{
		await updateStock(o.product,o.quantity);
	})
	
	order.orderStatus = req.body.status;

    order.orderStatus = "Delivered";

	if(req.body.status==="Delivered"){
    order.deliveredAt = Date.now();
	}

    // Save the updated order
    await order.save({validateBeforeSave: false});


	res.status(200).json({
		success:true,
		
	})
})


async function updateStock(id,quantity){
	const product= await Product.findById(id)

	product.Stock -=quantity;
	await product.save({validateBeforeSave:false});
}

