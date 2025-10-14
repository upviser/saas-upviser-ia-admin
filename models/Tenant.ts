import mongoose from 'mongoose'

const TenantSchema = new mongoose.Schema({
    tenantId: { type: String, required: true, unique: true },
    domain: { type: String, required: true, unique: true },
    subdomain: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
})

const Tenant = mongoose.models.Tenant || mongoose.model('Tenant', TenantSchema)

export default Tenant
