import mongoose from 'mongoose';

const connectToMongoDB = async()=>{
    try{
        main().catch(err => console.log(err));

        async function main() {
        await mongoose.connect("mongodb+srv://kj317246:india%4011@cluster0.q7gb7je.mongodb.net/chat-app?retryWrites=true&w=majority&appName=Cluster0");
        console.log("connected succesfully");
        }
    }
    catch(error){
        console.log("connection failed");
    }
}



export default connectToMongoDB;

//mongodb+srv://kj317246:india@11@cluster0.q7gb7je.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//mongodb://localhost:27017/chat-app