module.exports = {
    publicPath            : '',
    productionSourceMap   : false,
    transpileDependencies : [
        '@bryntum/grid',
        '@bryntum/grid-vue'
    ],
    configureWebpack : {
        performance : {
            hints : false
        }
    }
};
