import mongoose from "mongoose";

let userData = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    orders: {
        type: Object,
        default: {}
    }
}, { minimize: true })

let foodSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    filename: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
})

let orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "Being proceed"
    },
    payment: {
        type: Boolean,
        default: false
    }
})

let contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

let userModel = mongoose.models.user || mongoose.model("User", userData)

let foodModel = mongoose.models.food || mongoose.model("Food", foodSchema)

let orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

let contactModel = mongoose.models.contact || mongoose.model("contact", contactSchema)

export { userModel, foodModel, orderModel, contactModel }