const multerS3 = require('multer-s3');
const crypto = require('crypto');
const aws = require('aws-sdk');

const storageType = multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err) cb(err);

            const fileName = `${hash.toString('hex')}-${file.originalname}`;

            cb(null, fileName);
        })
    }
});

module.exports = {
    dest: __dirname + '../../temp/',
    storage: storageType,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
}