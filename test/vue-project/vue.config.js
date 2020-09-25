const OfflinePackage = require('../../lib/plugin');

module.exports = {
  configureWebpack: () => {
    return {
      plugins: [
        new OfflinePackage({
          packageNameKey: 'packageId',
          packageNameValue: 'meeting',
          version: 1,
          baseUrl: 'http://192.168.88.88:5000/',
          fileTypes: ['html', 'js', 'css', 'png']
        })
      ]
    };
  }
};
