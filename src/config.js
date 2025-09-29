const config = {
    dev: {
        API_BASE: import.meta.env.VITE_API_BASE || 'https://api.time.xuxue07.cn/api' // 默认开发环境
    },
    prod: {
        API_BASE: import.meta.env.VITE_API_BASE || 'https://api.time.xuxue07.cn/api' // 默认生产环境
    }
};

export default process.env.NODE_ENV === 'production' ? config.prod : config.dev;
