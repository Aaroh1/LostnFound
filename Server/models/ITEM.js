const mongoose= require('mongoose');
// const uniqueValid= require('mongoose-unique-validator');

const schema= mongoose.Schema({
    desc:String,
    type:String,
    date:Date,
    location:String,
    item:String,
});
// schema.plugin(uniqueValid);

module.exports= mongoose.model("Item",schema);