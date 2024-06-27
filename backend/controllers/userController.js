const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
// const catchAsyncError = require("../middleware/catchAsyncError");
const sendEmail = require("../utils/sendEmail");

// Register a user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: "this is a sample id",
			url: "profilepicurl",
		},
	});

	sendToken(user, 201, res);
});

// Login user login credentials

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;
	// checking if user has given password and email both
	if (!email || !password) {
		return next(new ErrorHandler("Please Enter Email & Password", 400));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new ErrorHandler("Invalid email or password", 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!user) {
		return next(new ErrorHandler("Invalid email or password", 401));
	}
	// console.log(isPasswordMatched)

	if (isPasswordMatched) {
		sendToken(user, 200, res);
	} else {
		return next(new ErrorHandler("Invalid email or password", 401));
	}
	// sendToken(user, 200, res);
});

// Logout User

exports.logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: "Logged Out",
	});
});

// forgot password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHandler("user not found", 404));
	}

});

// Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
});

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");

	const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("old password is incorrect", 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHandler("Password does not matched", 400));
	}
	user.password = req.body.newPassword;
	await user.save();

	sendToken(user, 200, res);
});

// Update User Profile  --admin
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		// role: req.body.role,
	};

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		// newuserData
	});
});

// get list of all users (admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});

// get single users details(admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(
			new ErrorHandler(`user does not exist with id: ${req.body.params}`)
		);
	}



	res.status(200).json({
		success: true,
		user,
	});
});
 


// delete user
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

	// we will remove cloudnary
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(
			new ErrorHandler(`user does not exist with id: ${req.body.params}`)
		);
	}

	await user.deleteOne();

	res.status(200).json({
		success: true,
		message:"user deleted successfully"
	});
});


