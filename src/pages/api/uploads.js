import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';

// アップロード先ディレクトリとファイル名設定
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

apiRoute.use(upload.single('file')); // 'file'はフロントエンドで送信するフィールド名

apiRoute.post((req, res) => {
  res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
});

export default apiRoute;

// Next.jsでの`bodyParser`を無効化
export const config = {
  api: {
    bodyParser: false,
  },
};