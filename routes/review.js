// Project Phase 2 (Part b)
// restructuring Reviews
const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
// const { /*listingSchema  , */ reviewSchema} = require("../Schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview , isLoggedIn , isReviewAuthor  } = require("../middlewares.js");

const reviewController = require("../Controller/reviews.js");

//Phase 2 Part a (Validation for Reviews)
// const validateReview = (req , res , next) => {
//     let {error} = reviewSchema.validate(req.body);
//     console.log(error);
//     if(error) {
//       let errMsg = error.details.map(el => el.message).join(",");
//       throw new ExpressError(400 , errMsg);
//     }else {
//       next();
//     }
//   }
  

//Reviews
//Post Route
router.post(
  "/" ,
  isLoggedIn , 
  validateReview, 
  wrapAsync(reviewController.createReview));
 
 // Deleteing Reviews
 // Delete Route
 router.delete("/:reviewId" ,
  isLoggedIn,
  isReviewAuthor,
   wrapAsync(reviewController.deleteReview))


 module.exports = router;
