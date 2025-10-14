import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import ShopLogin from '../../../../models/ShopLogin'
import bcrypt from 'bcrypt'
import { connectDB } from '../../../../database/db'
import axios from "axios"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Contraseña', type: 'password', placeholder: '******' }
      },
      async authorize(credentials) {
        await connectDB()
        const res = await axios.get(`${process.env.API_URL}/shop-login-password/${credentials?.email}`)
        if (!res.data.email) throw new Error('Credenciales invalidas')

        const passwordMatch = await bcrypt.compare(credentials!.password, res.data.password)
        if (!passwordMatch) throw new Error('Credenciales invalidas')

        return res.data
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user
        token.tenantId = user.tenantId
      }
      return token
    },
    session({ session, token }) {
      session.user = token.user as any
      session.tenantId = token.tenantId as string
      return session
    },
    redirect({ url, baseUrl }) {
      // Evitar callbacks problemáticos
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    signIn: '/ingresar'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }