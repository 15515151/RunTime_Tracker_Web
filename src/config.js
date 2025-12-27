const config = {
    dev: {
        API_BASE: import.meta.env.VITE_API_BASE || 'https://api.time.xuxue07.cn/api', // 默认开发环境
        ADMIN_URL: import.meta.env.VITE_ADMIN_URL || 'https://runtimeadmin.edgeone.app/',
        SITE_TITLE: import.meta.env.VITE_SITE_TITLE || 'RunTime Tracker'
    },
    prod: {
        API_BASE: import.meta.env.VITE_API_BASE || 'https://api.time.xuxue07.cn/api', // 默认生产环境
        ADMIN_URL: import.meta.env.VITE_ADMIN_URL || 'https://runtimeadmin.edgeone.app/',
        SITE_TITLE: import.meta.env.VITE_SITE_TITLE || 'RunTime Tracker'
    }
};

export default process.env.NODE_ENV === 'production' ? config.prod : config.dev;
