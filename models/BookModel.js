var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({  title: {    type: String,     default: "",      required: true    },  imgUrl: {    type: String,     default: "",      required: true    },  owner: {    type: mongoose.Schema.Types.ObjectId,    ref: 'User'  },  beneficiary: {    type: mongoose.Schema.Types.ObjectId,    ref: 'User'  },  requesters: [{    type: mongoose.Schema.Types.ObjectId,    ref: 'User'  }]});
BookSchema.methods.isFree = function(){
  return this.owner === null;
};

BookSchema.methods.giveToUser = function(user){
  console.log(typeof this.requesters);
  var index = this.requesters.indexOf(user);
  if (index > -1) {
    this.beneficiary = this.requesters.splice(index,1);
    return true;
  }
  return false;
};

BookSchema.methods.returnBook = function(){
  this.owner = null;
};


module.exports = mongoose.model('Book', BookSchema);
