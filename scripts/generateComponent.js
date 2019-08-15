const chalk = require('chalk'),
      path = require('path'),
      fs = require('fs'),
      resolve = (...file) => path.resolve(__dirname, ...file),
      log = msg => console.log(chalk.green(`${msg}`)),
      successLog = msg => console.log(chalk.blue(`${msg}`)),
      errorLog = err => console.log(chalk.red(`${err}`)),
      dirKey = process.argv[process.argv.length - 1],
      { vueTemplate, comEntryTemplate } = require('./template');

// 组件目录路径
const dirArr = {
    global: '../src/components',
    h5: '../src/views/h5/components',
    web: '../src/views/web/components'
};

const generateFile = (path, data) => {
    if(fs.existsSync('path')) {
        errorLog(`${path}文件已存在`);
        return;
    }
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf-8', err => {
            if(err) {
                errorLog(err.message);
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}
log('请输入要生成的组件名称、如需生成全局组件，请加 global/ 前缀');
let componentName = '';
process.stdin.on('data', async chunk => {
    const inputName = String(chunk).trim().toString();
    // 组件目录路径
    const componentDirectory = resolve(dirArr[dirKey], inputName)
    // vue组件路径
    const componentVueName = resolve(componentDirectory, 'index.vue')
    // 入口文件路径
    const entryComponentName = resolve(componentDirectory, 'index.js')

    const hasComponentDirectory = fs.existsSync(componentDirectory)
    if(hasComponentDirectory) {
        errorLog(`${inputName}组件目录已存在，请重新输入`);
        return;
    } else {
        log(`正在生成 component 目录 ${componentDirectory}`);
        await dotExistDirectoryCreate(componentDirectory);
    }
    try {
        if(inputName.includes('/')) {
            const inputArr = inputName.split('/');
            componentName = inputArr[inputArr.length - 1];
        } else {
            componentName = inputName;
        }
        log(`正在生成 vue 文件 ${componentVueName}`);
        await generateFile(componentVueName, vueTemplate(componentName));
        log(`正在生成 entry 文件 ${entryComponentName}`);
        await generateFile(entryComponentName, comEntryTemplate);
        successLog('生成成功');
    } catch(e) {
        errorLog(e.message);
    }

    process.stdin.emit('end');
})
process.stdin.on('end', () => {
    log('exit');
    process.exit();
})
function dotExistDirectoryCreate(directory) {
    return new Promise((resolve) => {
        mkdirs(directory, function() {
            resolve(true);
        });
    });
}
// 递归创建目录
function mkdirs(directory, callback) {
    let exists = fs.existsSync(directory);
    if(exists) {
        callback();
    } else {
        mkdirs(path.dirname(directory), function() {
            fs.mkdirSync(directory);
            callback();
        });
    }
}