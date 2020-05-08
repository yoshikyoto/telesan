# Webpack + Electron + Typescript + React + Mobx

## ダウンロード

Mac の場合

- TODO: システム環境設定

## usage

```sh
npm install
cd node_modules/iconv && 
npm run dev
```

注意点

- main.ts を変更した場合は tsc を実行する必要があります

## リリース方法

package.json のバージョンを書き換える

`v<バージョン番号>` のタグを作成する。 

```sh
git tag v0.1.1
```

タグを push する

```sh
git push --tags
```
