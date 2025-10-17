# 部署到 GitHub Pages

## 🚀 快速部署步骤

### 1. 创建 GitHub Token

1. 登录 GitHub
2. 进入 **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. 点击 **Generate new token (classic)**
4. Token 名称：`Sora2 Invite System`
5. 勾选权限：**gist** (Create gists)
6. 点击 **Generate token**
7. **重要**：复制并保存 token（只显示一次）

### 2. 创建 Gist 存储

1. 访问 https://gist.github.com/
2. 点击 **New gist**
3. 文件名：`invite-codes.json`
4. 文件内容：

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

5. 选择 **Create secret gist**（推荐）或 **Create public gist**
6. 创建后，从 URL 复制 **Gist ID**（最后一段，例如：`abc123def456`）

### 3. 创建 GitHub 仓库

1. 在 GitHub 创建新仓库，例如：`sora2-invite`
2. 可以是 Public 或 Private（都能用 GitHub Pages）

### 4. 上传文件

将 `index-github-pages.html` 重命名为 `index.html`：

```bash
# 在本地项目目录执行
mv index-github-pages.html index.html

# 初始化 git（如果还没有）
git init

# 添加文件
git add index.html

# 提交
git commit -m "Initial commit: Sora2 invite system"

# 关联远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/sora2-invite.git

# 推送到 GitHub
git push -u origin master
```

或者直接在 GitHub 网页上传 `index-github-pages.html`（上传时重命名为 `index.html`）

### 5. 启用 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. **Source** 选择：`Deploy from a branch`
3. **Branch** 选择：`master` (或 `main`)，目录选 `/ (root)`
4. 点击 **Save**
5. 等待几分钟，页面会显示访问地址：
   ```
   https://你的用户名.github.io/sora2-invite/
   ```

### 6. 配置系统（首次访问）

访问你的 GitHub Pages 地址后：

1. 在 **首次使用配置** 区域输入：
   - **Gist ID**：刚才创建的 Gist ID
   - **GitHub Token**：刚才生成的 Token（可选，但没有 token 无法领取和归还邀请码）
2. 点击 **保存配置**
3. 配置会保存在浏览器本地，下次访问无需重新输入

## ⚙️ 配置说明

### Token 的作用

- **有 Token**：可以领取和归还邀请码（读写权限）
- **无 Token**：只能查看可用数量（只读权限）

### 安全性

- Token 和 Gist ID 保存在浏览器本地（localStorage）
- 不会上传到任何服务器
- 建议使用 Secret Gist（只有知道 ID 的人可以访问）

### 多设备使用

每个设备首次访问时需要配置一次。如果希望多人使用：
- 可以分享 GitHub Pages 链接
- 每人需要自己输入 Gist ID 和 Token

## 📝 自定义域名（可选）

如果你有自己的域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 内容为你的域名，例如：`invite.yourdomain.com`
3. 在域名 DNS 设置添加 CNAME 记录指向：`你的用户名.github.io`

## 🔧 添加新邀请码

直接编辑 Gist 文件：

1. 访问你的 Gist 页面
2. 点击 **Edit**
3. 添加新邀请码：
   ```json
   { "id": "40", "code": "NEWCODE", "available": true }
   ```
4. 点击 **Update secret gist**

## ❓ 常见问题

### 1. 提示 "获取 Gist 数据失败"
- 检查 Gist ID 是否正确
- 如果是 Secret Gist，确认 URL 完整复制

### 2. 提示 "需要 GitHub Token 才能修改数据"
- 需要输入有效的 GitHub Token
- 确认 Token 有 `gist` 权限

### 3. GitHub Pages 显示 404
- 等待 5-10 分钟让 GitHub Pages 部署完成
- 确认 Settings → Pages 中已启用
- 确认文件名是 `index.html`（不是 `index-github-pages.html`）

### 4. 想要重新配置
在浏览器控制台执行：
```javascript
localStorage.removeItem('sora2_gist_config');
location.reload();
```

## 🎯 优势

✅ 完全免费
✅ 无需服务器
✅ 自动部署
✅ 支持 HTTPS
✅ 全球 CDN 加速

## 📊 限制

- GitHub API 未认证：每小时 60 次请求
- GitHub API 已认证：每小时 5000 次请求
- 适合小规模使用（每天几百次操作完全没问题）

## 🔗 示例网址

部署完成后，你的网站地址类似：
```
https://你的GitHub用户名.github.io/仓库名/
```

例如：
```
https://chinamanor.github.io/sora2-invite/
```
