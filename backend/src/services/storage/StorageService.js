const fs = require('fs');
const path = require('path');

class StorageService {
  constructor(folder) {
    this._folder = path.resolve(folder);

    if (!fs.existsSync(this._folder)) {
      fs.mkdirSync(this._folder, { recursive: true });
    }
  }

  async writeFile(file, meta) {
    const safeFilename = meta.filename
      .replace(/[^a-z0-9.-]/gi, '-')
      .toLowerCase();
    const filename = `${Date.now()}-${safeFilename}`;
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
    const filePath = path.join(this._folder, path.basename(filename));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  getFilePath(filename) {
    return path.join(this._folder, path.basename(filename));
  }
}

module.exports = StorageService;
