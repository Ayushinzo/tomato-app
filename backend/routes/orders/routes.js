import express from 'express'
import { foodModel, orderModel } from '../../database/schema.js'
import Stripe from 'stripe'
import jwt from 'jsonwebtoken'

let orderRouter = express.Router()

let stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

orderRouter.post('/place-order', async (req, res) => {
    const { token, address, items, amount } = await req.body

    try {
        let decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

        let order = new orderModel({
            userId: decodedToken.id,
            items: items,
            amount: amount,
            address: address
        })

        let newOrder = await order.save()

        let line_items = items.map((item) => (
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,
                        description: item.description
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            }
        ))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        })

        let session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: line_items,
            success_url: `${process.env.FRONTEND_URL}/pages/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/pages/verify?success=false&orderId=${newOrder._id}`
        })

        return res.json({
            success: true,
            message: "Order placed successfully",
            session_url: session.url
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

orderRouter.post('/verify', async (req, res) => {
    const { success, orderId } = await req.body

    try {
        if (success) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })

            return res.json({
                success: true,
                message: "order placed successfully"
            })
        } else {
            await orderModel.findByIdAndDelete(orderId)

            return res.json({
                success: false,
                message: "payment cancelled"
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

orderRouter.post('/fetch-orders', async (req, res) => {
    try {
        let data = await jwt.verify(req.headers.token, process.env.JWT_SECRET)

        let fetchItems = await orderModel.find({ userId: data.id })

        return res.json({
            success: true,
            data: fetchItems
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

orderRouter.get('/get-order', async (req, res) => {
    try {
        let orders = await orderModel.find({})

        return res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

orderRouter.post("/accept", async (req, res) => {
    try {
        let { id } = await req.body

        let update = await orderModel.findByIdAndUpdate(id, {status: "Order Accepted"})

        return res.json({
            success: true,
            message: "Order Accepted"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

export default orderRouter