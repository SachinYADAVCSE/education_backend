import mongoose from 'mongoose';

const dbConnect = async () => {
    try{

        const result = await mongoose.connect('mongodb://localhost:27017/languageWeb');
        if(result){
            console.log(`✅ Database Connected: ${result.connection.host}`);
        }
    } catch (err){
        console.error('Your database is not Connecting', err);
        process.exit(1);
    }
}

export default dbConnect;