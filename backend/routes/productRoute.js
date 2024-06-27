const express = require("express");
const {
	getAppProducts,
	createproduct,
	updateProduct,
	deleteProduct,
	getProductDetails,
	createProductReview,
	getProductReviews,
	deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { logout } = require("../controllers/userController");

const router = express.Router();

router.route("/products").get(getAppProducts);
router
	.route("/admin/products/new")
	.post(isAuthenticatedUser, authorizeRoles("admin"), createproduct);
router
	.route("/admin/product/:id")
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
	.route("/reviews")
	.get(getProductReviews)
	.delete(isAuthenticatedUser, deleteReview);

module.exports = router;
