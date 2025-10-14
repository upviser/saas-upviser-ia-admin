import { useSession } from "next-auth/react"

export const useTenant = () => {
  const { data: session } = useSession()
  
  return {
    tenantId: session?.tenantId,
    isAuthenticated: !!session,
    user: session?.user
  }
}
