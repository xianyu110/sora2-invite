# 🎬 Sora2 邀请码自助系统

一个基于 GitHub OAuth 认证的 Sora2 邀请码自助领取和归还系统，使用 Vercel 部署，完全免费。

[![部署到 Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/xianyu110/sora2-invite)

## ✨ 功能特点

- 🔐 **GitHub OAuth 登录** - 必须登录才能获取和归还邀请码，防止滥用
- ♻️ **邀请码循环使用** - 用户使用完后可以归还邀请码供他人使用
- 📊 **实时统计** - 显示当前可用邀请码数量
- 🛒 **购买集成** - 无邀请码时可直接跳转购买页面
- 💾 **Vercel KV 存储** - 使用 Redis 数据库，数据持久化
- 🚀 **一键部署** - 支持 Vercel 一键部署，无需服务器
- 📱 **响应式设计** - 支持手机和电脑访问

## 🖼️ 界面预览

- **登录页面**：用户需要使用 GitHub 账号登录
- **主界面**：显示用户信息、可用邀请码数量、获取/归还功能
- **购买页面**：无邀请码时跳转到购买链接

## 🚀 快速开始

### 方式一：一键部署到 Vercel（推荐）

1. 点击上方 "Deploy to Vercel" 按钮
2. 登录 Vercel（可使用 GitHub 账号）
3. Fork 本仓库
4. 按照下方配置说明添加环境变量
5. 部署完成！

### 方式二：手动部署

详细步骤请查看 [VERCEL-DEPLOY.md](./VERCEL-DEPLOY.md)

## ⚙️ 配置说明

### 1. 创建 GitHub OAuth 应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 **New OAuth App**
3. 填写信息：
   - **Application name**: Sora2 Invite System
   - **Homepage URL**: `https://你的域名.vercel.app`
   - **Authorization callback URL**: `https://你的域名.vercel.app`
4. 获取 **Client ID** 和 **Client Secret**

### 2. 配置 Vercel 环境变量

在 Vercel 项目设置中添加以下环境变量：

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID | ✅ |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret | ✅ |

### 3. 创建 Vercel KV 数据库

1. 进入 Vercel 项目控制台
2. **Storage** → **Create Database** → **KV (Redis)**
3. 选择区域（推荐：Hong Kong）
4. 创建后自动连接到项目

## 📁 项目结构

```
sora2-invite/
├── index.html              # 前端页面（GitHub OAuth 登录）
├── api/                    # Vercel Serverless Functions
│   ├── config.js          # 返回 GitHub Client ID
│   ├── auth.js            # 处理 GitHub OAuth 认证
│   └── codes.js           # 邀请码管理（增删改查）
├── package.json            # 项目依赖
├── VERCEL-DEPLOY.md        # Vercel 部署详细指南
└── README.md               # 项目说明
```

## 🔧 本地开发

```bash
# 克隆仓库
git clone https://github.com/xianyu110/sora2-invite.git
cd sora2-invite

# 安装依赖
npm install

# 配置环境变量
# 创建 .env 文件并添加：
# GITHUB_CLIENT_ID=your_client_id
# GITHUB_CLIENT_SECRET=your_client_secret
# KV_URL=your_kv_url (需要先在 Vercel 创建 KV 数据库)

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 📝 邀请码管理

### 初始邀请码

系统会自动初始化以下邀请码：

```json
[
  { "id": "39", "code": "J8JKM7", "available": true },
  { "id": "38", "code": "KVH1T9", "available": true },
  { "id": "37", "code": "JA15W0", "available": true },
  { "id": "36", "code": "5GEWMT", "available": true },
  { "id": "35", "code": "4AGGJH", "available": true },
  { "id": "28", "code": "T9M4NT", "available": true },
  { "id": "27", "code": "RP9MY1", "available": true },
  { "id": "26", "code": "S86RYC", "available": true },
  { "id": "25", "code": "HWPNAW", "available": true },
  { "id": "24", "code": "5C7BYV", "available": true },
  { "id": "23", "code": "04FN7V", "available": true }
]
```

### 添加新邀请码

1. 进入 Vercel 项目 → **Storage** → 你的 KV 数据库
2. 找到 `invite_codes` key
3. 编辑并添加新的邀请码对象
4. 保存即可

### 重置数据

在 Vercel KV 数据库中删除 `invite_codes` key，系统会自动重新初始化。

## 🔒 安全性

- ✅ 使用 GitHub OAuth 认证，防止匿名滥用
- ✅ API 验证用户登录状态，防止未授权访问
- ✅ Client Secret 存储在 Vercel 环境变量中，不会泄露
- ✅ 数据存储在 Vercel KV 中，安全可靠

## 📊 使用限制

### Vercel 免费套餐：
- ✅ 100 GB 带宽/月
- ✅ 100 次部署/天
- ✅ Serverless Functions: 10秒超时

### Vercel KV 免费套餐：
- ✅ 256 MB 存储
- ✅ 10,000 次读取/月
- ✅ 1,000 次写入/月

对于小规模使用（几百用户）完全够用！

## 🛠️ 技术栈

- **前端**: HTML + CSS + JavaScript（原生）
- **后端**: Vercel Serverless Functions (Node.js)
- **数据库**: Vercel KV (Redis)
- **认证**: GitHub OAuth 2.0
- **部署**: Vercel

## 📖 使用流程

1. 用户访问网站
2. 点击 "使用 GitHub 登录"
3. 授权 GitHub OAuth
4. 登录成功后查看可用邀请码数量
5. 点击 "立即获取邀请码" 领取
6. 使用完后可以归还邀请码
7. 如无可用邀请码，可点击"前往购买"按钮

## 🛒 购买邀请码

如果系统中没有可用的邀请码，可以通过以下链接购买：

**购买地址**: https://maynorai.56775678.xyz/?mod=buy&tid=16

系统已集成该购买链接，当无可用邀请码时，用户可直接点击"前往购买"按钮跳转。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [Vercel 文档](https://vercel.com/docs)
- [Vercel KV 文档](https://vercel.com/docs/storage/vercel-kv)
- [GitHub OAuth 文档](https://docs.github.com/en/apps/oauth-apps)

## ❓ 常见问题

### 1. 登录失败怎么办？
- 检查 GitHub OAuth Client ID 和 Secret 是否正确
- 确认回调地址与 Vercel 域名一致

### 2. 获取邀请码失败？
- 确认已创建并连接 KV 数据库
- 检查 Vercel Functions 日志

### 3. 如何修改购买链接？
编辑 `index.html` 中的 `buyInviteCode()` 函数，修改 URL。

### 4. 如何自定义邀请码？
在 `api/codes.js` 中修改 `INITIAL_CODES` 数组。

## 📞 支持

如有问题，请在 [Issues](https://github.com/xianyu110/sora2-invite/issues) 中提出。

---

⭐ 如果觉得有用，欢迎 Star 本项目！
