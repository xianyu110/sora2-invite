import { kv } from '@vercel/kv';

// 初始化邀请码数据
const INITIAL_CODES = [
  { id: '39', code: 'J8JKM7', available: true },
  { id: '38', code: 'KVH1T9', available: true },
  { id: '37', code: 'JA15W0', available: true },
  { id: '36', code: '5GEWMT', available: true },
  { id: '35', code: '4AGGJH', available: true },
  { id: '28', code: 'T9M4NT', available: true },
  { id: '27', code: 'RP9MY1', available: true },
  { id: '26', code: 'S86RYC', available: true },
  { id: '25', code: 'HWPNAW', available: true },
  { id: '24', code: '5C7BYV', available: true },
  { id: '23', code: '04FN7V', available: true }
];

const CODES_KEY = 'invite_codes';

// 验证 GitHub Token
async function verifyGitHubToken(token) {
  if (!token) return false;

  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    return response.ok;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 获取当前数据，如果没有则初始化
    let codes = await kv.get(CODES_KEY);
    if (!codes) {
      await kv.set(CODES_KEY, INITIAL_CODES);
      codes = INITIAL_CODES;
    }

    // GET: 获取所有邀请码（不需要登录）
    if (req.method === 'GET') {
      return res.status(200).json(codes);
    }

    // POST: 领取或归还邀请码（需要登录）
    if (req.method === 'POST') {
      const { action, code } = req.body;

      // 验证登录
      const authHeader = req.headers.authorization;
      const token = authHeader?.replace('Bearer ', '');

      const isValid = await verifyGitHubToken(token);
      if (!isValid) {
        return res.status(401).json({ error: '请先登录' });
      }

      if (action === 'claim') {
        // 领取邀请码
        const available = codes.find(c => c.available);

        if (!available) {
          return res.status(404).json({ error: '暂无可用邀请码' });
        }

        available.available = false;
        available.claimedAt = new Date().toISOString();

        await kv.set(CODES_KEY, codes);

        return res.status(200).json({
          success: true,
          code: available.code,
          id: available.id
        });
      }

      if (action === 'return') {
        // 归还邀请码
        if (!code) {
          return res.status(400).json({ error: '请提供邀请码' });
        }

        const found = codes.find(c => c.code.toUpperCase() === code.toUpperCase());

        if (!found) {
          return res.status(404).json({ error: '无效的邀请码' });
        }

        if (found.available) {
          return res.status(400).json({ error: '该邀请码已在池中' });
        }

        found.available = true;
        found.returnedAt = new Date().toISOString();

        await kv.set(CODES_KEY, codes);

        return res.status(200).json({ success: true, message: '归还成功' });
      }

      return res.status(400).json({ error: '无效的操作' });
    }

    return res.status(405).json({ error: '不支持的方法' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: '服务器错误' });
  }
}
