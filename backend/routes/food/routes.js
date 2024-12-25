import express from 'express'
import { foodModel } from "../../database/schema.js";
import multer from 'multer';
import fs from 'fs'

let foodList = express.Router()

let storage = multer.diskStorage({
    destination: "/tmp",

    filename: (req, file, cb) => {
        return cb(null, `${Date.now() + '-' + file.originalname}`)
    }
})

const upload = multer({ storage: storage })

foodList.post('/insert', upload.single("image"), async (req, res) => {

    const { name, description, category, price } = await req.body

    try {
        let food = new foodModel({
            name,
            filename: req.file?.filename,
            description,
            category,
            price
        })

        await food.save()

        return res.json({
            success: true,
            message: "Food added successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

foodList.get('/get', async (req, res) => {
    try {
        let itemData = await foodModel.find({})

        return res.json({
            success: true,
            data: itemData
        })
    }
    catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

foodList.post('/delete', async (req, res) => {
    try {
        let deleteItem = await foodModel.findByIdAndDelete(req.body.id)

        if (!deleteItem) {
            return res.json({
                success: false,
                message: "Item doesn't exists"
            })
        }

        fs.rm(`tmp/${deleteItem.filename}`, (err) => { })

        return res.json({
            success: true,
            message: "Item deleted successfully"
        })
    } catch (error) {
        return res.json({
            success: true,
            message: error.message
        })
    }
})

export { foodList }