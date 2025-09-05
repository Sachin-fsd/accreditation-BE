import AWS from 'aws-sdk';

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export default async function uploadToS3(file:any){
  const params = {
    Bucket: process.env.S3_BUCKET || '',
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };

  return new Promise((resolve,reject) => {
    s3.upload(params, (err:any,data:any) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};
