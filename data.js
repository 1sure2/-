// 网站数据文件

// 搜索数据
const searchData = [
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

// 下载链接配置
const downloadLinks = {
    'voxel-skin': 'https://pan.baidu.com/s/1lfLNQ1u6Ueftg5GTYIIsdg?pwd=0000', // 体素蒙皮
    'auto-rig': 'https://pan.baidu.com/s/1jQ4qB2MfwY4xZg0CZponFQ?pwd=0000', // 自动绑骨
    'strategy-master': '#', // 策略大师
    'game-resources': '#' // 游戏开发资源包
};

// 导出数据（用于模块化加载）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { searchData, downloadLinks };
} else if (typeof window !== 'undefined') {
    window.appData = { searchData, downloadLinks };
}
