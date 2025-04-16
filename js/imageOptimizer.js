// 图片尺寸配置
const IMAGE_SIZES = {
    thumbnail: { width: 150, height: 150 },
    small: { width: 300, height: 300 },
    medium: { width: 600, height: 600 },
    large: { width: 1200, height: 1200 }
};

// 图片质量配置
const QUALITY_SETTINGS = {
    thumbnail: 0.7,
    small: 0.8,
    medium: 0.85,
    large: 0.9
};

// 图片格式配置
const FORMAT_SETTINGS = {
    thumbnail: 'webp',
    small: 'webp',
    medium: 'webp',
    large: 'jpeg'
};

// 图片优化工具
const imageOptimizer = {
    // 获取优化后的图片URL
    getOptimizedImageUrl(originalUrl, size = 'medium') {
        const basePath = '../images/';
        const optimizedPath = '../images/optimized/';
        
        // 如果是外部URL，返回原始URL
        if (originalUrl.startsWith('http')) {
            return originalUrl;
        }

        // 获取文件名和扩展名
        const fileName = originalUrl.split('/').pop();
        const [name, ext] = fileName.split('.');
        
        // 构建优化后的文件名
        const optimizedName = `${name}-${size}.${FORMAT_SETTINGS[size]}`;
        
        // 返回优化后的URL
        return `${optimizedPath}${optimizedName}`;
    },

    // 获取响应式图片srcset
    getResponsiveSrcSet(originalUrl) {
        return Object.keys(IMAGE_SIZES).map(size => {
            const url = this.getOptimizedImageUrl(originalUrl, size);
            const width = IMAGE_SIZES[size].width;
            return `${url} ${width}w`;
        }).join(', ');
    },

    // 获取响应式图片sizes属性
    getResponsiveSizes() {
        return '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw';
    },

    // 生成图片占位符背景
    getPlaceholderBackground(width, height, color = '#F3F4F6') {
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='${width}' height='${height}' fill='${color.replace('#', '%23')}' /%3E%3C/svg%3E`;
    },

    // 生成响应式图片HTML
    generateResponsiveImage(originalUrl, alt, className = '', size = 'medium') {
        const optimizedUrl = this.getOptimizedImageUrl(originalUrl, size);
        const srcset = this.getResponsiveSrcSet(originalUrl);
        const sizes = this.getResponsiveSizes();
        const placeholder = this.getPlaceholderBackground(
            IMAGE_SIZES[size].width,
            IMAGE_SIZES[size].height
        );

        return `
            <img src="${optimizedUrl}"
                 srcset="${srcset}"
                 sizes="${sizes}"
                 alt="${alt}"
                 class="${className}"
                 loading="lazy"
                 style="background: url(${placeholder}) no-repeat center center; background-size: cover;"
                 onerror="imageUtils.handleImageError(this)">
        `;
    }
};

// 导出工具
window.imageOptimizer = imageOptimizer; 