# Sora2 邀请码自助系统 - Vercel 部署指南

## 🎯 功能特点

- ✅ **GitHub OAuth 登录** - 必须登录才能获取和归还邀请码
- ✅ **Vercel KV 存储** - 使用 Vercel 的 Redis KV 数据库存储邀请码
- ✅ **完全免费** - 利用 Vercel 免费套餐，无需服务器
- ✅ **自动部署** - 推送代码自动部署
- ✅ **安全可靠** - OAuth 认证，数据持久化

## 📋 前置准备

1. [GitHub 账号](https://github.com)
2. [Vercel 账号](https://vercel.com)（可以用 GitHub 登录）

## 🚀 部署步骤

### 第一步：创建 GitHub OAuth 应用

1. 访问 https://github.com/settings/developers
2. 点击 **New OAuth App**
3. 填写信息：
   - **Application name**: Sora2 Invite System
   - **Homepage URL**: `https://你的vercel域名.vercel.app`（先填一个临时的，后面可以改）
   - **Authorization callback URL**: `https://你的vercel域名.vercel.app`
4. 点击 **Register application**
5. 记录下：
   - **Client ID** (形如：`Iv1.xxxxxxxxxxxxx`)
   - 点击 **Generate a new client secret**，记录 **Client Secret**

### 第二步：部署到 Vercel

#### 方法 1：通过 GitHub 自动部署（推荐）

1. 确保代码已经推送到 GitHub 仓库：https://github.com/xianyu110/sora2-invite

2. 访问 [Vercel 控制台](https://vercel.com/new)

3. 点击 **Import Git Repository**

4. 选择你的仓库：`xianyu110/sora2-invite`

5. 配置项目：
   - **Project Name**: `sora2-invite`（可自定义）
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: 留空
   - **Output Directory**: 留空

6. 添加环境变量（Environment Variables）：
   ```
   GITHUB_CLIENT_ID=你的Client_ID
   GITHUB_CLIENT_SECRET=你的Client_Secret
   ```

7. 点击 **Deploy**

8. 等待部署完成，获得域名（如：`https://sora2-invite.vercel.app`）

#### 方法 2：通过 Vercel CLI 部署

```bash
# 安装 Vercel CLI
npm install -g vercel

# 在项目目录运行
vercel

# 按照提示操作
# 设置环境变量：
vercel env add GITHUB_CLIENT_ID
vercel env add GITHUB_CLIENT_SECRET

# 部署到生产环境
vercel --prod
```

### 第三步：配置 Vercel KV 数据库

1. 进入 Vercel 项目控制台
2. 点击 **Storage** 标签
3. 点击 **Create Database**
4. 选择 **KV (Redis)**
5. 填写数据库名称：`sora2-kv`
6. 选择区域：选择离你最近的（如：Hong Kong）
7. 点击 **Create**
8. Vercel 会自动将 KV 连接到你的项目

### 第四步：更新 GitHub OAuth 回调地址

1. 回到 GitHub OAuth 应用设置页面
2. 更新 **Homepage URL** 和 **Authorization callback URL** 为 Vercel 实际域名
3. 点击 **Update application**

### 第五步：测试系统

1. 访问你的 Vercel 域名
2. 点击 "使用 GitHub 登录"
3. 授权后应该能看到主界面
4. 尝试获取邀请码

## ⚙️ 环境变量说明

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID | `Iv1.xxxxxxxxxxxxx` |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret | `ghp_xxxxxxxxxxxxxxxx` |

KV 数据库的环境变量（`KV_URL`, `KV_REST_API_URL` 等）会在创建 KV 数据库后自动添加。

## 📝 自定义域名（可选）

1. 在 Vercel 项目设置中点击 **Domains**
2. 添加你的自定义域名
3. 按照提示配置 DNS
4. 更新 GitHub OAuth 应用的回调地址为新域名

## 🔧 管理邀请码

### 查看数据

进入 Vercel 项目 → Storage → sora2-kv → Data Browser

### 重置数据

在 Data Browser 中删除 `invite_codes` key，系统会自动重新初始化

### 添加新邀请码

1. 在 Data Browser 中找到 `invite_codes` key
2. 点击编辑
3. 添加新的邀请码对象：
   ```json
   {
     "id": "40",
     "code": "NEWCODE",
     "available": true
   }
   ```

## 🔍 故障排查

### 1. 登录失败
- 检查 GitHub OAuth Client ID 和 Secret 是否正确
- 检查回调地址是否与 Vercel 域名一致
- 查看 Vercel 部署日志

### 2. 获取邀请码失败
- 检查是否已创建 KV 数据库
- 检查 KV 数据库是否已连接到项目
- 查看 Vercel Functions 日志

### 3. 数据不同步
- KV 数据库是实时的，不存在同步问题
- 如果有问题，检查 KV 连接状态

## 📊 使用限制

### Vercel 免费套餐限制：
- 100 GB 带宽/月
- 100 次部署/天
- 无服务器函数：10秒超时，1000次调用/天

### Vercel KV 免费套餐：
- 256 MB 存储
- 10000 次读取/月
- 1000 次写入/月

对于小规模使用（几百用户）完全够用！

## 🔐 安全建议

1. **不要**将 Client Secret 提交到代码仓库
2. 定期更换 GitHub OAuth Secret
3. 监控 Vercel 日志，防止滥用
4. 可以在 API 中添加速率限制

## 🆙 更新部署

### 方式 1：推送到 GitHub
直接推送代码到 GitHub，Vercel 会自动重新部署

### 方式 2：手动部署
```bash
vercel --prod
```

## 📞 获取帮助

- Vercel 文档: https://vercel.com/docs
- Vercel KV 文档: https://vercel.com/docs/storage/vercel-kv
- GitHub OAuth 文档: https://docs.github.com/en/apps/oauth-apps

## 🎉 完成！

部署完成后，你的邀请码系统就可以使用了：
- 用户需要 GitHub 登录才能获取邀请码
- 数据存储在 Vercel KV 中，持久化且实时同步
- 完全免费，无需自己维护服务器

访问地址：`https://你的域名.vercel.app`
