const mongoose=require('mongoose')


const dataSchema=new mongoose.Schema({
    name:String,
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
      }
})

module.exports=mongoose.model('Cases',dataSchema)