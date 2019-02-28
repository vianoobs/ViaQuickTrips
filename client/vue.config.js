const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                ws: true,
                changeOrigin: true
            },
        }
    },
    configureWebpack: {
        plugins: [
            new VuetifyLoaderPlugin(),
        ]
    }
};
