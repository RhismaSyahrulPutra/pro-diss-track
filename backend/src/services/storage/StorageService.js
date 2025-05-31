const fs = require('fs');
const path = require('path');

class StorageService {
  constructor(folder) {
    this._folder = path.resolve(folder);

    if (!fs.existsSync(this._folder)) {
      fs.mkdirSync(this._folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    const filename = `${Date.now()}-${meta.filename}`;
    const filePath = path.join(this._folder, filename);

    return new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(filePath);

      fileStream.on('error', (error) => reject(error));
      file.on('error', (error) => reject(error));

      file.pipe(fileStream);

      fileStream.on('finish', () => resolve(filename));
    });
  }

  deleteFile(filename) {
    const filePath = path.join(this._folder, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

module.exports = StorageService;
