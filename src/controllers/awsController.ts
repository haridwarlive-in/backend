import { Request, Response } from "express";
const AWS = require('aws-sdk');

// Configure AWS SDK to use the instance's IAM role
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,  // Ensure the region is set
});

export const generatePresignedUrl = async (req: Request, res: Response) => {
  const { fileName, fileType } = req.body;

  const key = `${Date.now()}-${fileName}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,  // S3 bucket name
    Key: key,                           // The file name to be uploaded
    Expires: 60,                             // URL expiration time in seconds
    ContentType: fileType                    // MIME type of the file
  };

  try {
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    res.status(200).json({ uploadURL, key });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    res.status(500).json({ error: 'Failed to generate pre-signed URL' });
  } 
};


