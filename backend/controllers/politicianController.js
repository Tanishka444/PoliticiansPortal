const Politician = require('../models/Politician')

// CREATE OR UPDATE PROFILE
const createOrUpdateProfile = async (req, res) => {

  try {

    console.log('REQ BODY:', req.body)

    const {
      name,
      party,
      location,
      promises,
      achievements,
      contact,
      image,
      slogan,
      partySymbol,
      politicalHistory,
    } = req.body

    // REQUIRED CHECK
    if (!name || !party || !location) {

      return res.status(400).json({
        success: false,
        message: 'Name, party, and location are required.',
      })
    }

    // CONVERT TEXTAREA TO ARRAY
    const parseList = (val) => {

      if (Array.isArray(val)) {
        return val.filter(Boolean)
      }

      if (typeof val === 'string') {

        return val
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)
      }

      return []
    }

    // PARSE POLITICAL HISTORY
let parsedHistory = []

// STRING FORMAT
if (typeof politicalHistory === 'string') {

  parsedHistory = politicalHistory
    .split('\n')
    .map((line) => {

      // SUPPORT "|" FORMAT
      if (line.includes('|')) {

        const parts = line.split('|')

        return {
          year: parts[0]?.trim() || '',
          title: parts[1]?.trim() || '',
          description: parts[2]?.trim() || '',
        }
      }

      // SUPPORT ":" FORMAT
      else if (line.includes(':')) {

        const parts = line.split(':')

        return {
          year: parts[0]?.trim() || '',
          title: parts[1]?.trim() || '',
          description: '',
        }
      }

      return null
    })
    .filter(
      (item) =>
        item &&
        item.year &&
        item.title
    )
}

// ARRAY FORMAT
else if (Array.isArray(politicalHistory)) {

  parsedHistory = politicalHistory.filter(
    (item) => item.year && item.title
  )
}

console.log('PARSED HISTORY:', parsedHistory)

    // SAVE PROFILE
    const profile = await Politician.findOneAndUpdate(

      { userId: req.user._id },

      {
        userId: req.user._id,

        name,
        party,
        location,

        promises: parseList(promises),
        achievements: parseList(achievements),

        slogan: slogan || '',
        partySymbol: partySymbol || '',

        politicalHistory: parsedHistory,

        contact: contact || {},

        image: image || '',
      },

      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    )

    console.log('SAVED HISTORY:', profile.politicalHistory)

    res.status(200).json({
      success: true,
      message: 'Profile saved successfully.',
      profile,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// SEARCH
const searchPoliticians = async (req, res) => {

  try {

    const { name, location } = req.query

    const query = {}

    if (name) {
      query.name = { $regex: name, $options: 'i' }
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' }
    }

    const politicians = await Politician.find(query)
      .select('name party location image slogan partySymbol')
      .limit(50)

    res.status(200).json({
      success: true,
      results: politicians,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// GET SINGLE PROFILE
const getPoliticianById = async (req, res) => {

  try {

    const politician = await Politician.findById(req.params.id)
      .populate('userId', 'username')

    if (!politician) {

      return res.status(404).json({
        success: false,
        message: 'Politician not found.',
      })
    }

    console.log('FETCHED HISTORY:', politician.politicalHistory)

    res.status(200).json({
      success: true,
      politician,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// GET OWN PROFILE
const getMyProfile = async (req, res) => {

  try {

    const politician = await Politician.findOne({
      userId: req.user._id,
    })

    res.status(200).json({
      success: true,
      politician,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  createOrUpdateProfile,
  searchPoliticians,
  getPoliticianById,
  getMyProfile,
}