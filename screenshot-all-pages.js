// screenshot-all-pages.js
// 用法：node screenshot-all-pages.js
// 依赖：npm install puppeteer
// 请确保已启动本地HTTP服务（如 http-server），如 http://localhost:8080/

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 1. 配置本地服务根路径（请根据实际端口修改）
const BASE_URL = 'http://localhost:8080/';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

// 2. 页面入口数据（与index.html一致，可根据实际页面调整）
const pageEntries = [
    {title: '登录', src: 'pages/login.html'},
    {title: '注册', src: 'pages/register.html'},
    {title: '个人中心', src: 'pages/profile.html'},
    {title: '设置', src: 'pages/settings.html'},
    {title: '我的收藏', src: 'pages/favorites.html'},
    {title: '账号安全', src: 'pages/account_security.html'},
    {title: '我的钱包', src: 'pages/wallet.html'},
    {title: '密码重置', src: 'pages/password_reset.html'},
    {title: '通知设置', src: 'pages/notification_settings.html'},
    {title: '首页', src: 'pages/home.html'},
    {title: '活动列表', src: 'pages/activity_list.html'},
    {title: '活动详情', src: 'pages/activity.html'},
    {title: '活动管理', src: 'pages/activity_manage.html'},
    {title: '活动创建', src: 'pages/activity_create.html'},
    {title: '活动编辑', src: 'pages/activity_edit.html'},
    {title: '活动数据统计', src: 'pages/activity_stats.html'},
    {title: '活动报名', src: 'pages/activity_register.html'},
    {title: '活动签到', src: 'pages/activity_checkin.html'},
    {title: '活动评价', src: 'pages/activity_feedback.html'},
    {title: '活动订单管理', src: 'pages/activity_order.html'},
    {title: '退款申请', src: 'pages/activity_refund.html'},
    {title: '活动日历', src: 'pages/activity_calendar.html'},
    {title: '活动讨论', src: 'pages/activity_discussion.html'},
    {title: '联系主办方', src: 'pages/activity_contact.html'},
    {title: '酒店搜索', src: 'pages/hotel_search.html'},
    {title: '酒店详情', src: 'pages/hotel.html'},
    {title: '房型选择', src: 'pages/hotel_room.html'},
    {title: '酒店预订确认', src: 'pages/hotel_booking_confirm.html'},
    {title: '酒店评价', src: 'pages/hotel_review.html'},
    {title: '酒店地图', src: 'pages/hotel_map.html'},
    {title: '酒店相册管理', src: 'pages/hotel_album.html'},
    {title: '酒店设施管理', src: 'pages/hotel_facilities_manage.html'},
    {title: '房型管理', src: 'pages/room_manage.html'},
    {title: '酒店活动管理', src: 'pages/hotel_promotions.html'},
    {title: '酒店评论管理', src: 'pages/hotel_review_manage.html'},
    {title: '订单列表', src: 'pages/order_list.html'},
    {title: '订单详情', src: 'pages/order_detail.html'},
    {title: '支付', src: 'pages/payment.html'},
    {title: '统一支付', src: 'pages/unified_payment.html'},
    {title: '发票信息', src: 'pages/invoice.html'},
    {title: '帮助中心', src: 'pages/help_center.html'},
    {title: '意见反馈', src: 'pages/feedback.html'},
    {title: '关于我们', src: 'pages/about.html'},
    {title: '隐私政策', src: 'pages/privacy_policy.html'},
    {title: '消息中心', src: 'pages/message.html'},
    {title: '支付结果', src: 'pages/payment_result.html'},
    {title: '酒店对比', src: 'pages/hotel_compare.html'},
    {title: '高级筛选', src: 'pages/hotel_filter.html'},
    {title: '预订政策', src: 'pages/hotel_policy.html'},
];

// 3. 工具函数：文件名安全化
function safeFileName(name) {
    return name.replace(/[\\/:*?"<>|\s]/g, '_');
}

(async () => {
    if (!fs.existsSync(SCREENSHOT_DIR)) {
        fs.mkdirSync(SCREENSHOT_DIR);
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });

    for (const entry of pageEntries) {
        const url = BASE_URL + entry.src;
        const fileName = safeFileName(entry.title) + '.png';
        const filePath = path.join(SCREENSHOT_DIR, fileName);
        console.log(`正在截图: ${entry.title} -> ${filePath}`);
        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
            await page.waitForTimeout(800); // 可根据页面复杂度调整等待时间
            await page.screenshot({ path: filePath });
        } catch (e) {
            console.error(`截图失败: ${entry.title} (${url})`, e);
        }
    }
    await browser.close();
    console.log('全部页面截图完成，图片保存在 screenshots/ 目录下。');
})(); 