// 返回 GitHub Client ID（从环境变量读取）
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      clientId: process.env.GITHUB_CLIENT_ID || ''
    });
  }

  return res.status(405).json({ error: '不支持的方法' });
}
