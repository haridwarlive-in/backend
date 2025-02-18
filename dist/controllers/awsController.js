"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePresignedUrl = void 0;
const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();
// Configure AWS SDK to use the instance's IAM role
const s3 = new AWS.S3({
    region: process.env.AWS_REGION, // Ensure the region is set
});
const generatePresignedUrl = async (req, res) => {
    const { fileName, fileType } = req.body;
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME, // S3 bucket name
        Key: fileName, // The file name to be uploaded
        Expires: 60, // URL expiration time in seconds
        ContentType: fileType // MIME type of the file
    };
    try {
        const uploadURL = await s3.getSignedUrlPromise('putObject', params);
        res.status(200).json({ uploadURL });
    }
    catch (error) {
        console.error('Error generating pre-signed URL:', error);
        res.status(500).json({ error: 'Failed to generate pre-signed URL' });
    }
};
exports.generatePresignedUrl = generatePresignedUrl;
module.exports = router;
