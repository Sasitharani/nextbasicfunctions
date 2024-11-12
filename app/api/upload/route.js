import { promises as fs } from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const form = new IncomingForm();
  const uploadDir = path.join(process.cwd(), 'uploads');

  // Ensure the upload directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  return new Promise((resolve, reject) => {
    form.parse(request, async (err, fields, files) => {
      if (err) {
        reject(new Response(JSON.stringify({ message: 'Failed to upload file' }), { status: 500 }));
        return;
      }

      const file = files.file;
      const filePath = path.join(uploadDir, file.originalFilename);

      try {
        await fs.rename(file.filepath, filePath);
        resolve(new Response(JSON.stringify({ message: 'File uploaded successfully' }), { status: 200 }));
      } catch (error) {
        reject(new Response(JSON.stringify({ message: 'Failed to save file' }), { status: 500 }));
      }
    });
  });
}