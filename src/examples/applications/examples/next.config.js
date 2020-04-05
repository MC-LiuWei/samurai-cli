const withImages = require('next-images');
const nextMultimedia = require('next-multimedia');
const withMultimedia = nextMultimedia({ test: /\.(mp3|otf)(\?.*)?$/ });

module.exports = withImages(withMultimedia({
    generateEtags: true,
    // （不常用）页面内容缓存配置，只针对开发环境
    onDemandEntries: {
        // 内容在内存中缓存的时长（ms）
        maxInactiveAge: 25 * 1000,
        // 最多同时缓存多少个页面
        pagesBufferLength: 2,
    },
}));