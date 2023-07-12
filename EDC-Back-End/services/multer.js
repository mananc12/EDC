const multer = require('multer')

const memoryStorage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_PATH)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`,
    )
  },
})

module.exports.upload = multer({
  storage: memoryStorage,
})

module.exports.uploadLarge = multer({
  storage: diskStorage,
  fileFilter,
})
