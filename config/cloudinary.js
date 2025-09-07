import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
cloud_name: 'dbejiekd6', //process.env.CLOUDINARY_CLOUD_NAME,
api_key: 964925715164373,//process.env.CLOUDINARY_API_KEY,
api_secret: 't39ZM331wmt5rJG6w79uI5lBpWk', //process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;


// cloud_name: 'dbejiekd6', //process.env.CLOUDINARY_CLOUD_NAME,
// api_key: 964925715164373,//process.env.CLOUDINARY_API_KEY,
// api_secret: 't39ZM331wmt5rJG6w79uI5lBpWk', //process.env.CLOUDINARY_API_SECRET,