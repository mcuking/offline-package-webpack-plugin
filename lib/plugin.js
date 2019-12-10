const _ = require('lodash');
const JSZip = require('jszip');
const mime = require('mime-types');
const RawSource = require('webpack-sources').RawSource;

const zip = new JSZip();

module.exports = class OfflinePackagePlugin {
  constructor(options) {
    this.options = _.assign(
      {
        packageNameKey: 'packageName',
        packageNameValue: '',
        version: 1,
        folderName: 'package',
        indexFileName: 'index.json',
        baseUrl: '',
        fileTypes: [],
        excludeFileName: [],
        transformExtensions: /^(gz|map)$/i,
        serialize: (manifest) => {
          return JSON.stringify(manifest, null, 2);
        }
      },
      options
    );
  }

  getFileType(str) {
    str = str.replace(/\?.*/, '');
    const split = str.split('.');
    let ext = split.pop();
    if (this.options.transformExtensions.test(ext)) {
      ext = split.pop() + '.' + ext;
    }
    return ext;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'OfflinePackagePlugin',
      (compilation, callback) => {
        const isFileTypeLimit = this.options.fileTypes.length > 0;

        // create index.json
        let content = {
          [this.options.packageNameKey]: this.options.packageNameValue,
          version: this.options.version,
          items: []
        };

        for (const filename in compilation.assets) {
          const fileType = this.getFileType(filename);
          if (isFileTypeLimit) {
            if (
              this.options.fileTypes.includes(fileType) &&
              !this.options.excludeFileName.includes(filename)
            ) {
              content.items.push({
                [this.options.packageNameKey]: this.options.packageNameValue,
                version: this.options.version,
                remoteUrl: this.options.baseUrl + filename,
                path: filename,
                mimeType: mime.lookup(fileType)
              });
            }
          } else {
            content.items.push({
              remoteUrl: this.options.baseUrl + filename,
              path: filename
            });
          }
        }

        const outputFile = this.options.serialize(content);
        compilation.assets[this.options.indexFileName] = {
          source: () => {
            return outputFile;
          },
          size: () => {
            return outputFile.length;
          }
        };

        // create zip file
        const folder = zip.folder(this.options.folderName);

        for (const filename in compilation.assets) {
          const type = this.getFileType(filename);
          if (this.options.fileTypes.length > 0) {
            if (
              this.options.fileTypes.includes(type) ||
              filename === this.options.indexFileName
            ) {
              const source = compilation.assets[filename].source();
              folder.file(filename, source);
            }
          } else {
            const source = compilation.assets[filename].source();
            folder.file(filename, source);
          }
        }

        zip
          .generateAsync({
            type: 'nodebuffer'
          })
          .then((content) => {
            const outputPath = this.options.folderName + '.zip';
            compilation.assets[outputPath] = new RawSource(content);

            callback();
          });
      }
    );
  }
};
