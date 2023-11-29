const mongoose = require("mongoose");
module.exports = async (server) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo connection successful..".yellow.underline.bold);
    await server.listen(process.env.PORT || 3500, () =>
      console.log(
        `server running on ${process.env.NODE_ENV} mode, port ${process.env.PORT}..`
          .cyan.bold
      )
    );
  } catch (error) {
    console.log("mongo connection failed..".red);
    console.log(error);
    process.exit(1);
  }
};
