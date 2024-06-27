const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal server error";

	// wrong mongodb id error
	if (err.name === "CastError") {
		const message = `message not found. Invalid: ${err.path}`;
		// err=new ErrorHandler(message,400);
		return next(new ErrorHandler(message, 400));
	}

	// mongoose duplicate key error
	if (err.code === 11000) {
		const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
		err = new ErrorHandler(message, 400);
	}

    // wrong jwt error
	if (err.code === "JsonWebTokenError") {
		const message = `Json Web Token is invalid, Try again`;
		err = new ErrorHandler(message, 400);
	}

    // JWT expire error
	if (err.code === "JsonWebTokenError") {
		const message = `Json Web Token is expired, Try again`;
		err = new ErrorHandler(message, 400);
	}

	res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};
