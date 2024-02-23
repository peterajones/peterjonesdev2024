import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import GitlabProvider from "next-auth/providers/gitlab"
import GoogleProvider from "next-auth/providers/google"
import NetlifyProvider from "next-auth/providers/netlify";
const sgMail = require("@sendgrid/mail")

export default NextAuth({
  // DB Adapter
  adapter: MongoDBAdapter(clientPromise),
  // Custom signIn page
  pages: {
    signIn: '/signin'
  },
  // Configure one or more authentication providers
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.SENDGRID_SERVER,
    //     port: process.env.SENDGRID_PORT,
    //     auth: {
    //       user: process.env.SENDGRID_USERNAME,
    //       pass: process.env.SENDGRID_SMTP_PASSWORD,
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GitlabProvider({
      clientId: process.env.GITLAB_CLIENT_ID,
      clientSecret: process.env.GITLAB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    NetlifyProvider({
      clientId: process.env.NETLIFY_CLIENT_ID,
      clientSecret: process.env.NETLIFY_CLIENT_SECRET
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET
})