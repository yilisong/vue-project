# Usage

### Development

> Start a local development server with Dlls and HMR, all files are stored in memory.

```sh
$ yarn
$ npm run dev
```

### Local Production

> Start a local production server for quick preview testing.

```sh
$ yarn
$ npm run build
$ npm run local
```

### Publish

```sh
$ git checkout publish
$ git fetch
$ git merge origin/publish
$ git merge your_feature_branch
$ git push
```

### Online Production

#### 1. Install global dependencies

```sh
$ npm install lerna pm2 -g --registry=https://registry.npm.taobao.org
```

#### 2. Install Yarn

https://yarnpkg.com/zh-Hans/docs/install#linux-tab

#### 3. Build

```sh
$ yarn && npm run build
```

#### 4. Start the production server

Test environment:

```sh
$ npm run stage
```

Pre-release environment:

```sh
$ npm run pre
```

Release environment:

```sh
$ npm run release
```

