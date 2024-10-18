import { z } from 'zod'

// Convert UserRole enum to Zod schema
export const UserRoleSchema = z.enum(['ADMIN', 'RESIDENT'])
export type UserRole = z.infer<typeof UserRoleSchema>

// Convert Gender enum to Zod schema
export const GenderSchema = z.enum(['MALE', 'FEMALE'])
export type Gender = z.infer<typeof GenderSchema>

// Convert ApartmentUserRole enum to Zod schema
export const ApartmentUserRoleSchema = z.enum(['OWNER', 'USER'])
export type ApartmentUserRole = z.infer<typeof ApartmentUserRoleSchema>

// Convert ReportStatus enum to Zod schema
export const ReportStatusSchema = z.enum([
  'PENDING',
  'IN_PROGRESS',
  'RESOLVED',
  'REJECTED',
])
export type ReportStatus = z.infer<typeof ReportStatusSchema>

// Convert ApartmentStatus enum to Zod schema
export const ApartmentStatusSchema = z.enum(['IN_USE', 'EMPTY', 'DISRUPTION'])
export type ApartmentStatus = z.infer<typeof ApartmentStatusSchema>

// Convert BillStatus enum to Zod schema
export const BillStatusSchema = z.enum(['UNPAID', 'PAID', 'OVERDUE'])
export type BillStatus = z.infer<typeof BillStatusSchema>

// Convert SystemStatus enum to Zod schema
export const SystemStatusSchema = z.enum([
  'PREPAYMENT',
  'PAYMENT',
  'OVERDUE',
  'DELINQUENT',
])
export type SystemStatus = z.infer<typeof SystemStatusSchema>

export const ReportReasonsSchema = z.enum([
  'Environment',
  'Noise',
  'Unauthorized Pets',
  'Property Damage',
  'Maintenance Problems',
  'Lease Violation',
  'Unsanitary Conditions',
  'Other',
])
export type ReportReasons = z.infer<typeof ReportReasonsSchema>

export const PaymentMethodTypeSchema = z.enum(['VNPAY', 'MOMO'], {
  message: 'Please choose a payment method',
})
export type PaymentMethod = z.infer<typeof PaymentMethodTypeSchema>

export const RequestTypeForMomoSchema = z.enum(
  ['captureWallet', 'payWithATM', 'payWithCC'],
  {
    message: 'Please choose a request type',
  },
)
export type RequestTypeForMomo = z.infer<typeof RequestTypeForMomoSchema>
