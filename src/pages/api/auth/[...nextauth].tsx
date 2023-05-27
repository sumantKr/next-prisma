import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiHandler } from "next";
import NextAuth from "next-auth"
import GitHubProvider from 'next-auth/providers/github';



const options = {
    providers:[
        GitHubProvider({
            clientId:process.env.GITHUB_ID ||"",
            clientSecret:process.env.GITHUB_SECRET || ""
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
}
const authHandler : NextApiHandler = (req,res)=> NextAuth(req,res,options);

export default authHandler;
