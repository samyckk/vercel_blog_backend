import mongoose from "mongoose"


const Connection = async () =>{
    const URL = `mongodb+srv://samyck:1234@blog-app.ywqvnes.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`
    try {
        console.log("trying to connect to mongoose");
        await mongoose.connect(URL);
        console.log("Connect Succcessfully to Database");
    } catch (error) {
        console.log("Error connecting to database", error);
    }

}

export default Connection;