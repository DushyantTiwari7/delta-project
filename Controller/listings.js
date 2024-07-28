// Project - Phase 3 (Part a)
// MVC for Listings
const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};


module.exports.renderNewForm = (req, res) => {
  // console.log(req.user);
  res.render("listings/new.ejs")
}

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  // try {
  //   const listing = await Listing.findById(id);
  //   if (!listing) {
  //     req.flash("error", "This listing does not exist!");
  //     return res.redirect("/listings");
  //   }
  //   res.render("listings/edit.ejs", { listing });
  // } catch (err) {
  //   console.error("Error fetching listing:", err);
  //   req.flash("error", "Failed to retrieve listing details.");
  //   res.redirect("/listings");
  // }
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload" , "/upload/w_250");
  res.render("listings/edit.ejs", { listing  , originalImageUrl });;
};


module.exports.showListing = async (req, res) => {

  const { id } = req.params;
  try {
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" }
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "This listing does not exist!");
      res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    console.error("Error fetching listing:", err);
    req.flash("error", "Failed to retrieve listing details")
    res.redirect("/listings");
  }

}

module.exports.createListing = async (req, res, next) => {
  // const { title, description, price, location, country } = req.body.listing;
  const { file } = req;

  if (!file) {
    req.flash('error', 'Image is required');
    return res.redirect('/listings/new');
  }

  const image = {
    url: file.path,
    filename: file.filename
  };


  const newListing = new Listing({
    ...req.body.listing,
    image,
    owner: req.user._id
  });

  // newListing.owner = req.user._id;
  await newListing.save();
  req.flash('success', 'New Listing Created!');
  res.redirect('/listings');

  //   // Assuming req.file contains the Cloudinary response
  //   const image = {
  //       url: file.path, // This is Cloudinary URL
  //       filename: file.filename // This is Cloudinary filename
  //   };

  //   const newListing = new Listing({
  //       title,
  //       description,
  //       image,
  //       price,
  //       location,
  //       country,
  //       owner: req.user._id // Add owner from authenticated user
  //   });

};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  // let listing = await Listing.findById(id);
  // if(!listing.owner._id.equals(res.locals.currUser._id)) {
  //   req.flash("error" , "You don't have access to this Page!");
  //   return res.redirect(`/listings/${id}`);
  // }


  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();

  }

  // console.log(url  , ".." , filename);
  // const newListing = new Listing(req.body.listing);
  // newsiting.owner = req.user._id;
  // newListing.image = {url , filename};
  req.flash("success", "New Listing Craeted");
  res.redirect("/listings");
  // listing.image = { url, filename };



  // req.flash("success", "Listing Updated!");
  // res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res, next) => {
  try {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted")
    res.redirect("/listings");
  }
  catch (err) {
    console.log("Error deleting listing", err);
    next(err);
  }
};
