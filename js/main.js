/**
 * 页面状态管理
 */
let currentPage = 'splash-screen';

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', () => {
    // 初始化页面状态
    initializePageState();
    
    // 3秒后自动切换到信息采集页
    setTimeout(() => {
        showPage('info-collection');
    }, 3000);

    // 绑定事件监听器
    bindEventListeners();
});

/**
 * 初始化页面状态
 */
function initializePageState() {
    // 隐藏所有页面
    document.querySelectorAll('[id^="page-"]').forEach(page => {
        page.classList.add('hidden');
    });
    
    // 显示启动页
    document.getElementById('splash-screen').classList.remove('hidden');
}

/**
 * 绑定事件监听器
 */
function bindEventListeners() {
    // 性别选择按钮
    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.gender-btn').forEach(b => {
                b.classList.remove('bg-black', 'text-white');
                b.classList.add('border', 'border-black', 'text-black');
            });
            btn.classList.remove('border', 'border-black', 'text-black');
            btn.classList.add('bg-black', 'text-white');
        });
    });

    // 健康状况标签
    document.querySelectorAll('.health-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('bg-green-100');
            tag.classList.toggle('text-green-600');
        });
    });

    // 开始按钮
    const startButton = document.querySelector('.start-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            if (validateForm()) {
                showPage('data-tracking');
            }
        });
    }

    // 底部导航栏
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const targetPage = item.dataset.page;
            showPage(targetPage);
        });
    });

    // 返回按钮
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back();
        });
    }
}

/**
 * 显示指定页面
 * @param {string} pageId - 页面ID
 */
function showPage(pageId) {
    // 隐藏当前页面
    document.getElementById(currentPage).classList.add('hidden');
    
    // 显示目标页面
    document.getElementById(pageId).classList.remove('hidden');
    
    // 更新当前页面
    currentPage = pageId;
    
    // 更新导航栏状态
    updateNavigationState(pageId);
    
    // 添加页面切换动画
    document.getElementById(pageId).classList.add('animate__animated', 'animate__fadeIn');
}

/**
 * 更新导航栏状态
 * @param {string} activePage - 当前活动页面
 */
function updateNavigationState(activePage) {
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.dataset.page === activePage) {
            item.classList.remove('text-gray-400');
            item.classList.add('text-green-600');
        } else {
            item.classList.remove('text-green-600');
            item.classList.add('text-gray-400');
        }
    });
}

/**
 * 表单验证
 * @returns {boolean} 验证是否通过
 */
function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
        }
    });

    if (!isValid) {
        showToast('请填写所有必填项');
    }

    return isValid;
}

/**
 * 显示提示消息
 * @param {string} message - 提示消息
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg text-sm animate__animated animate__fadeInUp';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('animate__fadeInUp');
        toast.classList.add('animate__fadeOutDown');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

/**
 * 更新进度条
 * @param {string} elementId - 进度条元素ID
 * @param {number} percentage - 进度百分比
 */
function updateProgressBar(elementId, percentage) {
    const progressBar = document.querySelector(`#${elementId} .progress-bar-fill`);
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
}

/**
 * 页面切换动画
 * @param {string} pageId - 页面ID
 * @param {string} direction - 切换方向
 */
function pageTransition(pageId, direction = 'right') {
    const currentPage = document.getElementById(currentPage);
    const targetPage = document.getElementById(pageId);
    
    currentPage.classList.add(`animate__slideOut${direction}`);
    targetPage.classList.remove('hidden');
    targetPage.classList.add(`animate__slideIn${direction}`);
    
    setTimeout(() => {
        currentPage.classList.add('hidden');
        currentPage.classList.remove(`animate__slideOut${direction}`);
        targetPage.classList.remove(`animate__slideIn${direction}`);
        currentPage = pageId;
    }, 300);
}

/**
 * 检查是否在二级页面
 * @returns {boolean} 是否在二级页面
 */
function isSubPage() {
    return window.location.pathname.includes('/pages/');
}

/**
 * 返回上一页
 */
function goBack() {
    if (isSubPage()) {
        window.history.back();
    }
} 