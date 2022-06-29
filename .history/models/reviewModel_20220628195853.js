
const { func } = require("joi");
const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please provide rating"],
  },
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide title"],
  },
  comment: {
    type: String,
    required: [true, "Please provide a comment"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
},
{timestamps:true},


);

ReviewSchema.index({product:1,user:1},{unique:true})

ReviewSchema.post('save',async function(){
  console.log('post save hppk');
})

ReviewSchema.post('remove',async function(){

  console.log('post remove hppk');


})

module.exports =mongoose.model('Reviews',ReviewSchema)
