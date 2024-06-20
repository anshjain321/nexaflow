import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Dashboard from "@/app/components/Dashboard";
import pool from "../db";

const page = async()=>{
const { getUser } =  getKindeServerSession();
const user = await getUser();

if (!user || !user.id) redirect('/auth-callback?origin=dashboard')
const connection = await pool.getConnection();
const {dbuser} = await connection.execute('SELECT * FROM users WHERE id = ?' , [user.id]);
if(!dbuser) redirect('/auth-callback?origin=dashboard')

return <Dashboard/>
}
export default page;