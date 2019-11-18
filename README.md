# offline-package-webpack-plugin

This plugin helps compress static resources (such as js, css, png...) into a zip package, with a resource mapping json file in it.

Resource Mapping Json:

```json
{
  "packageName": "meeting",
  "items": [
    {
      "remoteUrl": "http://192.168.10.88/img/logo.82b9c7a5.png",
      "path": "img/logo.82b9c7a5.png"
    },
    {
      "remoteUrl": "http://192.168.10.88/js/about.9d81a00f.js",
      "path": "js/about.9d81a00f.js"
    },
    {
      "remoteUrl": "http://192.168.10.88/css/app.4776214a.css",
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
      baseUrl: 'http://192.168.10.88/',
      fileTypes: ['js', 'css', 'png']
    })
  ];
}
```

## Options

`options` need to be an object.

### packageName

This option determines the value of packageName in the resource mapping json.

Resource mapping json:

```js
{
  "packageName": "meeting",
  "items": [
    ...
  ]
}
```

**Default**: ''

Config example:

```js
{
  plugins: [
    new OfflinePackagePlugin({
      packageName: 'meeting'
    })
  ];
}
```

### folderName

This option determines the name of the output zip file.

**Default**: 'package'

Config example:

```js
{
  plugins: [
    new OfflinePackagePlugin({
      folderName: 'package'
    })
  ];
}
```

### indexFileName

This option determines the name of the resource mapping json.

**Default**: 'index.json'

Config example:

```js
{
  plugins: [
    new OfflinePackagePlugin({
      indexFileName: 'index.json'
    })
  ];
}
```

### baseUrl

This option determines the base url of remoteUrl in the resource mapping json.

Resource mapping json:

```js
{
  ...
  "items": [
    {
      "remoteUrl": `${baseUrl}/about.9d81a00f.js`,
      "path": "js/about.9d81a00f.js"
    }
  ]
}
```

**Default**: ''

Config example:

```js
{
  plugins: [
    new OfflinePackagePlugin({
      indexFileName: 'index.json'
    })
  ];
}
```

### fileTypes

This options provides control over if add a web resource file into zip file via file extension. The options need to be an array. And an empty array means there is no limit of file extension.

**Default**: []

Config example:

```js
{
  plugins: [
    new OfflinePackagePlugin({
      fileTypes: ['js', 'css', 'png']
    })
  ];
}
```

## Inspiration

[webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin)
