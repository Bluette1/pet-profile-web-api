const { verifyToken } = require('../middlewares');
const controller = require('../controllers/pet.controller');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const DIR = __dirname +'/uploads/';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const s3 = new aws.S3({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const storage = multerS3({
  acl: 'public-read',
  s3,
  bucket: process.env.S3_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: 'UPLOADING_METADATA' });
  },
  key: function (req, file, cb) {
    cb(null, Date.now().toString());
  },
})

const upload = multer({ storage });

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/pets', controller.getPets);

  app.get('/api/pet', controller.getPet);
  app.post('/api/pets', upload.single('image'), [verifyToken], controller.addPet);
};