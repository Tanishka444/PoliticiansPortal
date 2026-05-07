const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const generateToken = (id) =>
  jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

// SIGNUP
const signup = async (req, res) => {
  try {

    const { username, password, role } = req.body

    console.log('Signup username:', username)
    console.log('Signup password:', password)

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      })
    }

    const existingUser = await User.findOne({ username })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 12)

    console.log('HASHED PASSWORD:', hashedPassword)

    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    })

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// LOGIN
const login = async (req, res) => {
  try {

    const { username, password } = req.body

    console.log('Received username:', username)
    console.log('Received password:', password)

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    console.log('DB HASH:', user.password)

    // COMPARE PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    console.log('PASSWORD MATCH:', isMatch)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  signup,
  login,
}