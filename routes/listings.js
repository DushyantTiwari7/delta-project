const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema  /*reviewSchema */ } = require("../Schema.js");
// const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// Project (Phase c) - Part a
// Store Files
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Project - Phase c (Part a)
// MVC for Listings
const listingController = require("../Controller/listings.js")

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });


// const validateListing = (req , res , next) => {
//     let {error} = listingSchema.validate(req.body);
//     console.log(error);
//     if(error) {
//       let errMsg = error.details.map(el => el.message).join(",");
//       throw new ExpressError(400 , errMsg);
//     } else {
//       next();
//     }
//   }

// Project - Phase 3 (Part a)
// Router.route
// Project (Phase c) - Part a
// Save Link in Mongo
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,

    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing));
// .post( , (req , res) => {
//   res.send(req.file);
// })
// .post( upload.single('listing[image]'), (req , res) => {
//   res.send(req.file);
// })

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm)

router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing))
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing))




// Index Route
// router.get("/" , wrapAsync (listingController.index));




// //Show Route
// router.get("/:id", wrapAsync (listingController.showListing));

// Create Route
// router.post("/" ,isLoggedIn ,  
//   validateListing ,  
//   wrapAsync (listingController.createListing));

// Edit Route
router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm));

// Update Route
 router.put(
  "/:id" ,
  isLoggedIn,
  isOwner ,
  upload.single("listing[image]"),
  validateListing , 
   wrapAsync (listingController.updateListing)) 

// Delete Route
//  router.delete("/:id" ,
//    isLoggedIn,
//    isOwner,
//      wrapAsync (listingController.deleteListing));

router.get("/new-test", (req, res) => {
  res.render("listings/new.ejs");
});

module.exports = router;
