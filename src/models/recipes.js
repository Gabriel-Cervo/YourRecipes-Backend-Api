const mongoose = require('mongoose');
const aws = require('aws-sdk');
const s3 = new aws.S3();

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    imgKey: { type: String, required: true },
    description: { type: String, required: true },
    steps: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

recipeSchema.pre('findOneAndUpdate', async function() {
    this.set({ updatedAt: new Date() });
  });

recipeSchema.pre('remove', function() {
    return s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: this.imgKey
    }).promise()
})

module.exports = mongoose.model('recipes', recipeSchema);