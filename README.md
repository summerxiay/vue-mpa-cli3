# zaozuo-nirvana

vue-cli3 + webpage 构建的多项目一个工程分包打包的多页面应用

## Project setup
```
npm install
```

### development
```
npm install d web
npm install d h5
```
### production
```
npm install b web
npm install b h5
```

### Compiles and hot-reloads for development
```
npm run d web
npm run d h5
```

### Compiles and minifies for production
```
npm run b web
npm run b h5
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 创建新组件
`npm run` 可以用 `yarn` 代替
```
// 全局组件
npm run new:com-g 
// h5组件
npm run new:com-h5
// web组件
npm run new:com-web
```