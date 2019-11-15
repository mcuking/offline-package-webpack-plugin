# offline-package-webpack-plugin

This plugin helps compress static resources (such as js, css, png...) into a zip package, with a resource mapping json file in it.

Resource Mapping Json

```json
{
  "packageName": "meeting",
  "items": [
    {
      "remoteUrl": "http://192.168.10.11:6174/img/logo.82b9c7a5.png",
      "path": "img/logo.82b9c7a5.png"
    },
    {
      "remoteUrl": "http://192.168.10.11:6174/js/about.9d81a00f.js",
      "path": "js/about.9d81a00f.js"
    },
    {
      "remoteUrl": "http://192.168.10.11:6174/css/app.4776214a.css",
      "path": "css/app.4776214a.css"
    }
  ]
}
```

## Usage

```bash
npm install offline-package-webpack-plugin -D
```

or

```bash
yarn add offline-package-webpack-plugin -D
```

Via `webpack.config.js` or any other webpack config file.

```js
{
  plugins: [
    new OfflinePackagePlugin({
      packageName: 'meeting',
      baseUrl: 'http://192.168.10.11:6174/',
      fileTypes: ['js', 'css', 'png']
    })
  ];
}
```
