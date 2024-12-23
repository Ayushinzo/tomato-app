import express from 'express'
import { contactModel } from '../../database/schema.js'
import jwt from 'jsonwebtoken'

let formRouter = express.Router()

formRouter.post('/send', async (req, res) => {
    try {
        const { name, description } = await req.body.body

        let email = await jwt.verify(req.body.token, process.env.JWT_SECRET)
        email = email.email

        // let item = await contactModel.findOne({ email: email })

        // if (item) {
        //     return res.json({
        //         success: false,
        //         message: "You have already sent a feedback"
        //     })
        // }

        let contact = new contactModel({
            name: name,
            email: email,
            description: description
        })

        await contact.save()

        return res.json({
            success: true,
            message: "Sent Successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

formRouter.post('/get-feedback', async (req, res) => {
    try {
        let { page, limit } = req.body
        let feedbackCount = await contactModel.find({}).countDocuments()
        let feedback = await contactModel.find({}).skip((page) * limit).limit(limit)

        if (!feedback.length) {
            return res.json({
                success: false,
                data: "no feedback available"
            })
        }

        return res.json({
            success: true,
            data: feedback,
            total: feedbackCount
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

formRouter.post("/delete", async (req, res) => {
    try {
        const { id } = await req.body

        await contactModel.findByIdAndDelete(id)

        return res.json({
            success: true,
            message: "Feedback deleted successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

formRouter.post('/searchFeedback', async (req, res) => {
    try {
        const { email } = await req.body

        let feedback = await contactModel.find({ email: email })

        if (!feedback.length) {
            return res.json({
                success: false,
                message: "User doesn't exist"
            })
        }
        else {
            return res.json({
                success: true,
                data: feedback
            })
        }

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

export { formRouter }