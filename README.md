# offline-package-webpack-plugin

This plugin helps compress static resources (such as js, css, png...) into a zip package, with a resource mapping json file in it.

Resource Mapping Json:

```json
{
  "packageId": "meeting",
  "items": [
    {
      "packageId": "meeting",
      "version": 1,
      "remoteUrl": "http://192.168.88.88:5000/js/app.630f02ab.js",
      "path": "js/app.630f02ab.js",
      "mimeType": "application/javascript"
    },
    {
      "packageId": "meeting",
      "version": 1,
      "remoteUrl": "http://192.168.88.88:5000/js/chunk-vendors.dca9c05a.js",
      "path": "js/chunk-vendors.dca9c05a.js",
      "mimeType": "application/javascript"
    }
  ]
}
```

Related article:
[Hybrid App 离线包方案实践](https://github.com/mcuking/blog/issues/63)

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
      packageNameKey: 'packageId',
      packageNameValue: 'meeting',
      version: 1,
      baseUrl: 'http://192.168.88.88:5000/',
      fileTypes: ['html', 'js', 'css', 'png']
    })
  ];
}
```

## Options

`options` need to be an object.

### packageNameKey

This option determines the key of package name in the resource mapping json.

Resource mapping json:

```js
{
  "packageId": "meeting",
  "items": [
    ...
  ]
}
```

**Default**: 'packageName'

Config example:

```js
{
  plugins: [
    new OfflinePackagePlugin({
      packageNameKey: 'packageId'
    })
  ];
}
```

### packageNameValue

This option determines the value of package name in the resource mapping json.

Resource mapping json:

```js
{
  "packageNameValue": "meeting",
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
      packageNameValue: 'meeting'
    })
  ];
}
```

### version

This option determines the value of version in the resource mapping json.

Resource mapping json:

```js
{
  ...
  "version": 1
  "items": [
    ...
  ]
}
```

**Default**: 1

Config example:

```js
{
  plugins: [
    new OfflinePackagePlugin({
      version: 2
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
      fileTypes: ['html', 'js', 'css', 'png']
    })
  ];
}
```

### excludeFileName

This options provides control over if add a web resource file into zip file via file name. The options need to be an array. And an empty array means there is no limit of file extension.

**Default**: []

Config example:

```js
{
  plugins: [
    new OfflinePackagePlugin({
      excludeFileName: ['main.js']
    })
  ];
}
```

## Inspiration

[webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin)

## Supplement

The image below is the architecture of offline package. You could learn more about offline package via [mobile-web-best-practice](https://github.com/mcuking/mobile-web-best-practice#%E7%A6%BB%E7%BA%BF%E5%8C%85).

<img src="./assets/offline-architecture.png" width=600/>
