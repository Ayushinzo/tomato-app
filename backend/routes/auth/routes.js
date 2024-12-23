import express from 'express'
import { userModel } from '../../database/schema.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

let userAuth = express.Router()

async function createToken(id, username, email) {
    let token = await jwt.sign({ id, username, email }, process.env.JWT_SECRET)
    return token
}

userAuth.post('/login', async (req, res) => {
    const { email, password } = await req.body.body

    try {
        let exist = await userModel.findOne({ email: email })
        if (!exist) {
            return res.json({
                success: false,
                message: "User doesn't exist"
            })
        }
        let result = await bcrypt.compare(password, exist.password)
        if (!result) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            })
        }

        let token = await createToken(exist._id, exist.username, exist.email)

        return res.json({
            success: true,
            message: "login successful",
            token
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

userAuth.post('/register', async (req, res) => {
    try {
        const { username, email, password } = await req.body.body;

        let exist = await userModel.findOne({ email: email })

        if (exist) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter valid email"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Enter the strong password"
            })
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let user = await userModel({
                    username: username,
                    email: email,
                    password: hash
                })

                let newUser = await user.save()

                let token = await createToken(newUser._id, newUser.username, newUser.email)

                return res.json({
                    success: true,
                    token,
                    message: "User added successfully"
                })
            })
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

export { userAuth }