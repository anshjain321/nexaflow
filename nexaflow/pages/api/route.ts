import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { getUser } = getKindeServerSession(req,res);
    const user = await getUser();
    console.log(user);
    if (!user || !user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const connection = await pool.getConnection();

    
      const [existingUser] = await connection.execute(
        'SELECT * FROM users WHERE id = ?',
        [user.id]
      );

      if (existingUser.length === 0) {
        await connection.execute(
          'INSERT INTO users (id, name, email) VALUES (?, ?, ?)',
          [user.id, `${user.given_name} ${user.family_name}`, user.email]
        );
      }

      res.status(200).json({ success: true });
   
}
