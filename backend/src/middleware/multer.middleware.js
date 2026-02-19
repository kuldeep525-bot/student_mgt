//multer ek middleware hai jo file upload handle karta hai in Node.js + Express.
import multer from "multer";

// File kahan aur kaise save hogi
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); //Uploaded PDF pehle server ke is folder me save hogi (mtlb mera pc me)
  },
  //create a unqiue file to save the server
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

//yeh middleware hai
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // set limit 5MB
  fileFilter(req, file, cb) {
    //only pdf allowed
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
});
