import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  create(file: Express.Multer.File) {
    const response = {
      filename: file.filename,
    };
    return response;
  }
}

export const editFileName = (
  req: any,
  file: { originalname: string },
  callback: (arg0: any, arg1: string) => void,
) => {
  const fileExtName = extname(file.originalname);
  callback(null, `${String(uuidv4())}${fileExtName}`);
};
