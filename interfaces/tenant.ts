export interface ITenant {
  _id: string
  tenantId: string
  domain: string
  subdomain: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
