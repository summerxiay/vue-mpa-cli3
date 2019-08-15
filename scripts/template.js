module.exports = {
    vueTemplate: componentName => {
        return `<template>
    <div class="${componentName}">
        ${componentName}组件
    </div>
</template>
<script>
    export default {
        name: '${componentName}',
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>
    .${componentName} {

    }
</style>
        `;
    },
    comEntryTemplate: `import Index from './index.vue'
export default Index`,
    viewEntryTemplate: componentName => {
        return `import 'ASSETS/css/common.less';
import Vue from 'vue';
import App from './${componentName}.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');`;
    },
    htmlTemplate: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <link rel="icon" href="/favicon.ico">
    <% for(var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.css) { %>
        <link href="<%=htmlWebpackPlugin.options.cdn.css[i]%>" rel="preload" as="style">
        <link rel="stylesheet" href="<%=htmlWebpackPlugin.options.cdn.css[i]%>" as="style">
    <% } %>
    <% for(var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
        <link href="<%=htmlWebpackPlugin.options.cdn.js[i]%>" rel="preload" as="script">
    <% } %>
</head>

<body>
    <noscript>
        <strong>We're sorry but pages doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <% for(var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
        <script src="<%=htmlWebpackPlugin.options.cdn.js[i]%>"></script>
    <% } %>
    <!-- built files will be auto injected -->
</body>

</html>`
}