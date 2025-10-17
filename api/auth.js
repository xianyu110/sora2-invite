// GitHub OAuth 认证处理
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: '不支持的方法' });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: '缺少授权码' });
  }

  try {
    // 第一步：用 code 换取 access_token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
      })
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || '获取 token 失败' });
    }

    const access_token = tokenData.access_token;

    // 第二步：用 access_token 获取用户信息
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const user = await userResponse.json();

    if (!user.login) {
      return res.status(400).json({ error: '获取用户信息失败' });
    }

    return res.status(200).json({
      access_token: access_token,
      user: {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        email: user.email
      }
    });
  } catch (error) {
    console.error('OAuth Error:', error);
    return res.status(500).json({ error: '服务器错误' });
  }
}
