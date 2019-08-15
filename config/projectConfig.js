const projectName = require('./project')

let pageWebMethod = require('../scripts/getWebPages.js'),
    pagesWeb = pageWebMethod.pages();

let pageH5Method = require('../scripts/getH5Pages.js'),
    pagesH5 = pageH5Method.pages();

const config = {
    // pc端
    web: {
        pagesWeb
    },
    // 移动端
    h5: {
        pagesH5
    }
}

const configObj = config[projectName.name]
module.exports = configObj
