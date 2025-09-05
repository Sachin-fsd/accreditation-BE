import { Router } from 'express';
import multer from 'multer';
import uploadToS3, { s3 } from '../utils/s3';
import auth from '../middleware/auth';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get('/upload', auth, async (req: any, res) => {
  const { fileName, fileType } = req.query;

  if (!fileName || !fileType) {
    return res.status(400).json({ error: "Missing fileName or fileType" });
  }

  const key = `${Date.now()}_${fileName}`;

  const params = {
    Bucket: process.env.S3_BUCKET!,
    Key: key,
    ContentType: fileType as string,
  };

  const uploadUrl = s3.getSignedUrl("putObject", params);
  const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  res.json({ uploadUrl, fileUrl });
});

export default router;
