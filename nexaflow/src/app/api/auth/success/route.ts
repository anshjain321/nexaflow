import pool from "@/app/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
export async function get() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id) {
    throw new Error("something went wrong with authentication" + user);
  }

  const connection = await pool.getConnection();

  
    const [dbUser] = await connection.query('SELECT * FROM users WHERE kindeId = ?', [user.id]);

    if (!dbUser || dbUser.length === 0) {
    
      const [result] = await connection.query('INSERT INTO users (kindeId, firstName,lastName, email) VALUES (?, ?, ?, ?)', [
        user.id,
        user.given_name ?? '',
        user.family_name ?? '',
        user.email ?? ''
      ]);

      console.log('New user created:', result);
    }

    return NextResponse.redirect("http://localhost:3000/Dashboard");
  } 

