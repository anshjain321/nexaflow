import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const connection = await pool.getConnection();

    
      const [existingUser] = await connection.execute(
        'SELECT * FROM users WHERE kindeId = ?',
        [user.id]
      );

      if (existingUser.length === 0) {
        await connection.execute(
          'INSERT INTO users (kindeId, name, email) VALUES (?, ?, ?)',
          [user.id, `${user.given_name} ${user.family_name}`, user.email]
        );
      }

      res.status(200).json({ success: true });
   
}
