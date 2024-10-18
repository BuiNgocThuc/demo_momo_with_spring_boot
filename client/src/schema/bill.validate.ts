import {
  BillStatusSchema,
  PaymentMethodTypeSchema,
  RequestTypeForMomoSchema,
} from '@/enums'
import { z } from 'zod'

export const BillSchema = z.object({
  id: z.number(),
  monthly: z.number(),
  totalPrice: z.number(),
  oldWater: z.number().nullable(),
  newWater: z.number().nullable(),
  status: BillStatusSchema,
  relationshipId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  waterReadingDate: z.string().nullable(),
})
export type Bill = z.infer<typeof BillSchema>

export const PaymentMethodSchema = z
  .object({
    name: PaymentMethodTypeSchema.optional(),
    requestType: RequestTypeForMomoSchema.optional(),
  })
  .refine(
    (data) => {
      // If name is "MOMO", then requestType must be present
      return (
        data.name !== 'MOMO' ||
        (data.requestType !== undefined && data.requestType !== null)
      )
    },
    {
      message: 'requestType is required when name is "MOMO"',
      path: ['requestType'], // specify the path to the error
    },
  )
