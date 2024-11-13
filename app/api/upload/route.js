// import { IncomingForm } from 'formidable';
// import { NextResponse } from 'next/server';
// import path from 'path';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false, // Disable the default body parser to allow formidable to handle multipart/form-data
//   },
// };

// export async function POST(req) {
//   try {
//     console.log('Requesttttresdhbgf received'); // Debugging statement

//     const form = new IncomingForm();
//     const uploadDir = path.join(process.cwd(), 'uploads');

//     // Ensure the upload directory exists
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     form.uploadDir = uploadDir; // Set the upload directory
//     form.keepExtensions = true; // Keep file extensions

//     // Customize the filename to include the original file name, upload time, and original extension
//     form.on('fileBegin', (name, file) => {
//       const fileExtension = path.extname(file.name);
//       const originalName = path.basename(file.name, fileExtension);
//       const timestamp = Date.now();
//       file.path = path.join(uploadDir, `${originalName}.${timestamp}${fileExtension}`);
//     });

//     const formParse = () => {
//       return new Promise((resolve, reject) => {
//         console.log('Step4');
//         form.parse(req, (err, fields, files) => {
//           console.log('Step5');
//           if (err) {
//             console.error('Error parsing form:', err); // Debugging statement
//             reject(new Error('Error parsing form'));
//           } else {
//             console.log('Form parsed successfully:', fields, files); // Debugging statement
//             resolve({ fields, files });
//           }
//         });
//       });
//     };

//     const { fields, files } = await formParse(); // Calling formParse and awaiting the result
//     console.log('Files:', files); // Debugging statement to check the files object

//     return NextResponse.json({ message: 'Image sent successfully', fields, files }, { status: 200 });
//   } catch (error) {
//     console.error('Error during request handling:', error); // Debugging statement
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }