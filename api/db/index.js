import mongoose from "mongoose";

//connect to mongo database
 const connect = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("database connected sucessfully")
    })
    .catch((error) => console.log(`${error} did not connect`));
};
export default connect 