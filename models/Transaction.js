const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userSend : [{type: Schema.Types.ObjectId, ref:'Account', required: true}],
  userGet : [{type: Schema.Types.ObjectId, ref:'Account', required: true}],
  amount : {type: Number, required: true}
});

module.exports = mongoose.model('Transaction', transactionSchema);
