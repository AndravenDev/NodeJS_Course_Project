const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
        productData: { type: Object, required: true },
        qty: { type: Number, required: true }
    }],
    user:{
        name: {type: String, required: true},
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
    }
});

module.exports = mongoose.model('Order', orderSchema);