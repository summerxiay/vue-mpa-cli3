const glob = require('glob')
let views = {}

module.exports.pages = function (){
    glob.sync( './src/views/h5/pages/*/index.js').forEach(filepath =>
    {
        let fileList = filepath.split('/');
        let fileName = fileList[fileList.length-2];
        views[fileName] = {
            entry: `src/views/h5/pages/${fileName}/index.js`,
            title: ' ',
            // 模板来源
            template: `src/views/h5/pages/${fileName}/index.html`,
            // 在 dist/index.html 的输出
            filename: process.env.NODE_ENV === 'development'?`${fileName}.html`:`${fileName}/${fileName}.html`,
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', fileName]
        }
    })
    return views
};