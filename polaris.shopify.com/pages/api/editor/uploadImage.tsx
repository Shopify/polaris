import type {NextApiResponse, NextApiRequest} from 'next';
import formidable from 'formidable';
import sizeOf from 'image-size';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(500).end();
  }
  switch (req.method) {
    case 'POST':
      let uploadedFileName = '';

      const form = formidable({
        uploadDir: './public/uploads',
        multiples: true,
        keepExtensions: true,
        filter: function ({name, originalFilename, mimetype}) {
          return !!(mimetype && mimetype.includes('image'));
        },
        filename(name, ext, part, form) {
          uploadedFileName = `${name}${ext}`;
          return uploadedFileName;
        },
      });

      form.parse(req, () => {
        let width = -1;
        let height = -1;
        sizeOf(
          `./public/uploads/${uploadedFileName}`,
          function (err, dimensions) {
            if (dimensions && dimensions.width && dimensions.height) {
              width = dimensions.width;
              height = dimensions.height;
            }
            res.status(200).json({
              status: 'success',
              fileName: uploadedFileName,
              width,
              height,
            });
          },
        );
      });
      break;
  }
};

export default handler;
