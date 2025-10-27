import mongoose from "mongoose";

const dashboardschema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  title : {
    type: String,
    required: true
  },
  notes : {
    type: String,
    required: true
  },
}, {timestamps : true})


const dashboard = mongoose.model("dashboard", dashboardschema)

export default dashboard