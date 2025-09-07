import mongoose from 'mongoose';

// just install the driver
// Add the MONGODB_URI here
const MONGODB_URI = process.env.MONGO_URI
console.log("This coming from db.js, for URI", MONGODB_URI);

const dbConnect = async () => {
    try{
        const result = await mongoose.connect(MONGODB_URI);
        if(result){
            console.log(`✅ Database Connected: ${result.connection.host}`);
        }
    } catch (err){
        console.error('Your database is not Connecting', err);
        process.exit(1);
    }
}

export default dbConnect;