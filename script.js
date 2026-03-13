// 优化后的JavaScript代码

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化变量
    const navItems = document.querySelectorAll('.nav-item');
    const navIndicator = document.querySelector('.nav-indicator');
    const contentItems = document.querySelectorAll('.content-item');
    const contentWrapper = document.querySelector('.content-wrapper');
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    const searchResults = document.getElementById('search-results');
    const searchResultsList = document.getElementById('search-results-list');
    const closeSearch = document.querySelector('.close-search');
    const themeToggle = document.getElementById('theme-toggle');
    const footerLinks = document.querySelectorAll('.footer-link');
    const downloadItems = document.querySelectorAll('.download-item');
    const downloadButtons = document.querySelectorAll('.download-button');
    
    let currentIndex = 0;

    // 配置项
    const config = {
        animationDuration: 600, // 动画持续时间
        rotationAngle: 90, // 旋转角度
        downloadLinks: window.appData ? window.appData.downloadLinks : {
            'voxel-skin': 'https://pan.baidu.com/s/1lfLNQ1u6Ueftg5GTYIIsdg?pwd=0000', // 体素蒙皮
            'auto-rig': 'https://pan.baidu.com/s/1jQ4qB2MfwY4xZg0CZponFQ?pwd=0000', // 自动绑骨
            'strategy-master': '#', // 策略大师
            'game-resources': '#' // 游戏开发资源包
        }
    };

    // 搜索数据（从外部数据文件加载）
    const searchData = window.appData ? window.appData.searchData : [
        { title: '独立游戏开发经验分享', content: '分享我在独立游戏开发过程中的经验和教训', category: '游戏博客' },
        { title: 'Ue游戏引擎使用技巧', content: 'Unreal Engine的高级使用技巧和最佳实践', category: '游戏博客' },
        { title: '游戏美术设计心得', content: '游戏美术设计的基本原则和创意方法', category: '游戏博客' },
        { title: '《艾尔登法环》设计理念分析', content: '分析FromSoftware游戏的设计哲学', category: '游戏博客' },
        { title: '独立游戏开发讨论', content: '与其他开发者交流独立游戏开发经验', category: '游戏交流' },
        { title: '游戏引擎选择指南', content: '如何选择适合自己项目的游戏引擎', category: '游戏交流' },
        { title: '游戏设计思路分享', content: '分享游戏设计的创新思路和方法', category: '游戏交流' },
        { title: '玩家心得交流', content: '与其他玩家交流游戏体验和心得', category: '游戏交流' },
        { title: '《冒险之旅》 - 2D平台游戏', content: '一款充满挑战的2D平台游戏', category: '游戏下载' },
        { title: '《太空探索》 - 科幻模拟游戏', content: '体验太空探索的无限可能', category: '游戏下载' },
        { title: '《策略大师》 - 回合制策略游戏', content: '考验策略思维的回合制游戏，包含多种兵种和战术。版本：1.2.0，平台：Windows, macOS，文件大小：150MB', category: '游戏下载' },
        { title: '游戏开发资源包', content: '包含各种游戏开发所需的资源，包括3D模型、纹理、音效等。版本：3.0，格式：FBX, PNG, WAV，文件大小：500MB', category: '游戏下载' },
        { title: '体素蒙皮 - blender插件', content: '这是一个用于Blender的体素蒙皮插件，可以帮助开发者快速为体素模型创建蒙皮权重。版本：1.0.0，适用软件：Blender 3.0+，文件大小：15MB', category: '游戏下载' },
        { title: '自动绑骨 - blender插件', content: '自动为3D模型生成骨骼绑定系统，支持人形和非人形模型。版本：2.1.0，适用软件：Blender 2.93+，文件大小：22MB', category: '游戏下载' }
    ];

    // 设置导航指示器位置
    function setNavIndicator() {
        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) {
            navIndicator.style.left = activeItem.offsetLeft + 'px';
            navIndicator.style.width = activeItem.offsetWidth + 'px';
        }
    }

    // 更新内容位置和高度
    function updateContentPosition(index) {
        contentItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                // 调整内容容器高度
                setTimeout(() => {
                    const contentHeight = item.offsetHeight;
                    contentWrapper.style.height = contentHeight + 'px';
                }, 300);
            } else {
                item.classList.remove('active');
            }
        });
    }

    // 3D旋转切换内容
    function rotateContent(targetIndex) {
        // 计算旋转方向
        const direction = targetIndex > currentIndex ? 1 : -1;
        const angle = direction * config.rotationAngle;

        // 隐藏页脚
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.classList.remove('show');
        }

        // 应用旋转动画
        contentWrapper.style.transition = `transform ${config.animationDuration}ms ease`;
        contentWrapper.style.transform = `rotateY(${angle}deg)`;

        // 动画结束后更新内容状态
        setTimeout(() => {
            contentWrapper.style.transform = 'rotateY(0deg)';
            updateContentPosition(targetIndex);
            currentIndex = targetIndex;
            
            // 显示页脚，添加动画
            if (footer) {
                setTimeout(() => {
                    footer.classList.add('show');
                }, 100);
            }
            
            // 页面切换完成后调用高亮函数
            setTimeout(highlightSearchTerms, 100);
        }, config.animationDuration);
    }

    // 切换到指定页面的函数
    function switchToPage(index) {
        if (index !== currentIndex) {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            navItems[index].classList.add('active');
            setNavIndicator();
            rotateContent(index);
        }
        // 滚动到页面顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // 延迟执行高亮，确保内容已经更新
        setTimeout(highlightSearchTerms, 500);
    }

    // 执行搜索
    function performSearch(query) {
        if (!query.trim()) return [];
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) || 
            item.content.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        
        return results;
    }

    // 显示搜索结果
    function showSearchResults(results) {
        searchResultsList.innerHTML = '';
        
        if (results.length === 0) {
            searchResultsList.innerHTML = '<p style="text-align: center; color: #666;">没有找到相关结果</p>';
        } else {
            results.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <h4>${item.title}</h4>
                    <p>${item.content}</p>
                    <p style="font-size: 12px; color: #999; margin-top: 5px;">${item.category}</p>
                `;
                
                // 添加点击事件
                resultItem.addEventListener('click', function() {
                    // 存储搜索关键词到localStorage
                    const searchQuery = searchInput.value;
                    localStorage.setItem('searchQuery', searchQuery);
                    
                    // 根据类别跳转到相应页面
                    let pageIndex = 0; // 默认跳转到首页
                    
                    switch(item.category) {
                        case '游戏博客':
                            pageIndex = 1;
                            break;
                        case '游戏交流':
                            pageIndex = 2;
                            break;
                        case '游戏下载':
                            pageIndex = 3;
                            break;
                        default:
                            pageIndex = 0;
                    }
                    
                    // 关闭搜索结果弹窗
                    searchResults.classList.remove('show');
                    // 跳转到相应页面
                    switchToPage(pageIndex);
                });
                
                searchResultsList.appendChild(resultItem);
            });
        }
        
        searchResults.classList.add('show');
    }

    // 高亮显示搜索关键词
    function highlightSearchTerms() {
        const searchQuery = localStorage.getItem('searchQuery');
        
        // 清除之前的高亮
        document.querySelectorAll('.highlight').forEach(el => {
            const text = el.textContent;
            el.outerHTML = text;
        });
        
        // 如果没有搜索关键词，直接返回
        if (!searchQuery) return;
        
        // 高亮新的关键词
        const regex = new RegExp(`(${searchQuery})`, 'gi');
        
        // 处理论坛话题列表中的项目
        const forumTopics = document.querySelectorAll('.forum-topics li');
        forumTopics.forEach(item => {
            if (regex.test(item.textContent)) {
                const newHtml = item.textContent.replace(regex, '<span class="highlight">$1</span>');
                item.innerHTML = newHtml;
            }
        });
        
        // 处理下载列表中的项目
        const downloadItems = document.querySelectorAll('.download-item');
        downloadItems.forEach(item => {
            const title = item.querySelector('.download-title');
            if (title && regex.test(title.textContent)) {
                const newHtml = title.textContent.replace(regex, '<span class="highlight">$1</span>');
                title.innerHTML = newHtml;
            }
            
            const content = item.querySelector('.download-content');
            if (content) {
                const paragraphs = content.querySelectorAll('p');
                paragraphs.forEach(para => {
                    if (regex.test(para.textContent)) {
                        const newHtml = para.textContent.replace(regex, '<span class="highlight">$1</span>');
                        para.innerHTML = newHtml;
                    }
                });
            }
        });
    }

    // 更新内容高度，确保页脚位置正确
    function updateContentHeight() {
        setTimeout(() => {
            const currentContentItem = document.querySelector('.content-item.active');
            if (currentContentItem) {
                // 计算整个内容项的实际高度
                const contentHeight = currentContentItem.offsetHeight + 50; // 加上一些额外空间
                contentWrapper.style.height = contentHeight + 'px';
            } else {
                // 没有展开项时，恢复默认高度
                contentWrapper.style.height = 'auto';
            }
            
            // 显示页脚
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.classList.remove('show');
                setTimeout(() => {
                    footer.classList.add('show');
                }, 100);
            }
        }, 300);
    }

    // 初始化主题
    function initTheme() {
        // 检查本地存储中的主题偏好
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        }
    }

    // 绑定事件监听器
    function bindEventListeners() {
        // 导航点击事件
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                if (index !== currentIndex) {
                    // 更新导航状态
                    navItems.forEach(navItem => navItem.classList.remove('active'));
                    this.classList.add('active');
                    setNavIndicator();
                    
                    // 执行3D旋转动画
                    rotateContent(index);
                }
            });
        });

        // 页脚链接点击事件
        if (footerLinks.length > 0) {
            footerLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const index = parseInt(this.dataset.index);
                    switchToPage(index);
                });
            });
        }

        // 搜索图标点击事件
        if (searchIcon) {
            searchIcon.addEventListener('click', function() {
                const query = searchInput.value;
                if (query.trim() === '') {
                    // 清空搜索框时，清除高亮
                    localStorage.removeItem('searchQuery');
                    highlightSearchTerms();
                    return;
                }
                const results = performSearch(query);
                showSearchResults(results);
            });
        }

        // 搜索输入框回车事件
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const query = this.value;
                    if (query.trim() === '') {
                        // 清空搜索框时，清除高亮
                        localStorage.removeItem('searchQuery');
                        highlightSearchTerms();
                        return;
                    }
                    const results = performSearch(query);
                    showSearchResults(results);
                }
            });
            
            // 监听输入框变化，当清空时取消高亮
            searchInput.addEventListener('input', function() {
                if (this.value.trim() === '') {
                    localStorage.removeItem('searchQuery');
                    highlightSearchTerms();
                }
            });
        }

        // 关闭搜索结果
        if (closeSearch) {
            closeSearch.addEventListener('click', function() {
                searchResults.classList.remove('show');
            });
        }

        // 点击搜索结果外部关闭
        if (searchResults) {
            searchResults.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('show');
                }
            });
        }

        // 主题切换按钮点击事件
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                
                // 切换图标
                if (document.body.classList.contains('dark-mode')) {
                    themeToggle.textContent = '☀️';
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeToggle.textContent = '🌙';
                    localStorage.setItem('theme', 'light');
                }
            });
        }

        // 下载列表点击展开功能（一次只能展开一个）
        downloadItems.forEach(item => {
            const title = item.querySelector('.download-title');
            title.addEventListener('click', function() {
                // 先关闭所有其他展开的项
                downloadItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // 切换当前项的展开状态
                item.classList.toggle('active');
                
                // 更新内容高度
                updateContentHeight();
            });
        });

        // 下载按钮点击事件
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡
                const item = this.closest('.download-item');
                const itemId = item.dataset.id;
                
                // 跳转到对应的网盘链接
                const link = config.downloadLinks[itemId];
                if (link && link !== '#') {
                    window.open(link, '_blank');
                } else {
                    alert('下载链接暂未提供');
                }
            });
        });

        // 响应式处理
        window.addEventListener('resize', setNavIndicator);

        // 平滑滚动效果
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // 初始化函数
    function init() {
        setNavIndicator();
        updateContentPosition(currentIndex);
        initTheme();
        bindEventListeners();
        
        // 显示页脚
        setTimeout(() => {
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.classList.add('show');
            }
        }, 100);
        
        // 初始页面也检查是否需要高亮
        setTimeout(highlightSearchTerms, 500);
    }

    // 启动初始化
    init();
});