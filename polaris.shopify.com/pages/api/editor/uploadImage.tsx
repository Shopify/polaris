import type {NextApiResponse, NextApiRequest} from 'next';
import formidable from 'formidable';
import sizeOf from 'image-size';
import {ImageFile} from '../../../src/components/Editor/types';
import {nanoid} from 'nanoid';

export const config = {
  api: {bodyParser: false},
};

export type UploadImageResponse =
  | {
      status: 'success';
      image: ImageFile;
    }
  | {status: 'error'; message: string};

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
        allowEmptyFiles: false,
        filter: function ({mimetype}) {
          return !!(mimetype && mimetype.includes('image'));
        },
        filename(_, ext) {
          uploadedFileName = `${nanoid()}${ext}`;
          return uploadedFileName;
        },
      });

      form.parse(req, () => {
        let width = -1;
        let height = -1;
        sizeOf(
          `./public/uploads/${uploadedFileName}`,
          function (err, dimensions) {
            if (err) {
              const response: UploadImageResponse = {
                status: 'error',
                message: err.message,
              };
              return res.status(500).json(response);
            }

            if (dimensions && dimensions.width && dimensions.height) {
              width = dimensions.width;
              height = dimensions.height;
            }
            const response: UploadImageResponse = {
              status: 'success',
              image: {
                fileName: uploadedFileName,
                width,
                height,
              },
            };
            return res.status(200).json(response);
          },
        );
      });
      break;
  }
};

export default handler;
