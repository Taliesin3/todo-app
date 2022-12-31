const mongoose = require("mongoose");

// Mongoose DB connection
const uri = process.env.ATLAS_URI;  // get from Atlas dashboard
mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true ,
  useFindAndModify: false
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));