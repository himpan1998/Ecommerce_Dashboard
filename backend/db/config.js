const mongoose=require("mongoose");
// mongoose.set('strictQuery', true);

const connectDb=async()=>{
    try {
         const connect= await  mongoose.connect(process.env.Connection_String);
         console.log("DataBase Conection:",
         connect.connection.host,
         connect.connection.name,

         )
    } catch (error) {
        console.log(error);
        process.exit(1);

        
    }
}


module.exports=connectDb


