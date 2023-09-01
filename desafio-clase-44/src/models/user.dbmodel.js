

import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'users_integradora3';

const schema = new mongoose.Schema({
    autoId: String,
    name: String,
    email: String,
    pass: String,
    avatar: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    orders: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'orders_integradora3' }]
});

const userModel = mongoose.model(collection, schema);

export default userModel;