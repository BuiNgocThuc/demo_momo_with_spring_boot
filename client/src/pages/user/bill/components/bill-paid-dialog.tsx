import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import MomoIcon from '@assets/momo.png'
import VnpayIcon from '@assets/vnpay.png'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { FieldErrors, useForm } from 'react-hook-form'
import { z } from 'zod'
import { PaymentMethodSchema } from '@/schema/bill.validate'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PaymentMethod, RequestTypeForMomo } from '@/enums'
import { Button } from '@/components/ui/button'
import { CreditCard, Landmark, Loader, Wallet } from 'lucide-react'
import {
  usePaidByMomoMutation,
  usePaidByVnpayMutation,
} from '@/features/bill/billSlice'
import { useNavigate } from 'react-router-dom'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
interface BillPaidDialogProps {
  children: React.ReactNode
  id?: string
}

const BillPaidDialog = ({ children, id }: BillPaidDialogProps) => {
  const navigate = useNavigate()
  const [usePaidByVnpay, { isLoading: isPaidByVnpayLoading }] =
    usePaidByVnpayMutation()
  const [usePaidByMomo, { isLoading: isPaidByMomoLoading }] =
    usePaidByMomoMutation()
  const form = useForm<z.infer<typeof PaymentMethodSchema>>({
    defaultValues: {
      name: 'VNPAY',
    },
  })

  const onSubmit = async (data: z.infer<typeof PaymentMethodSchema>) => {
    try {
      if (data.name === 'VNPAY') {
        await usePaidByVnpay({ id: '1' })
          .unwrap()
          .then((payload: any) => {
            console.log(payload)
            window.open(payload.paymentUrl, '_blank')
          })
          .catch((error: FetchBaseQueryError) => {
						console.log(error)
            if (error.status === 'FETCH_ERROR') {
              toast.error('Something went wrong')
            }
          })
      } else if (data.name === 'MOMO') {
        await usePaidByMomo({
          id: id,
          body: { RequestType: data.requestType },
        })
          .unwrap()
          .then((payload: any) => {
            window.open(payload.payUrl, '_blank')
          })
          .catch((error: FetchBaseQueryError) => {
						console.log(error)
            if (error.status === 'FETCH_ERROR') {
              toast.error('Something went wrong')
            }
          })
      } else {
        throw new Error('Please choose a payment method')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const onError = (
    errors: FieldErrors<z.infer<typeof PaymentMethodSchema>>,
  ) => {
    if (errors.name?.message) {
      toast.error(errors.name.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-sm min-[500px]:max-w-md sm:max-w-lg lg:max-w-2xl"
        aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Payment</DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel>Choose payment method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 sm:grid-cols-2">
                      <FormItem className="flex items-center space-x-3 space-y-0 p-2 border border-zinc-400 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:text-primary has-[:checked]:border-primary">
                        <div className="size-12 overflow-hidden rounded-md">
                          <img
                            src={VnpayIcon}
                            loading="lazy"
                            alt="vnpay-icon"
                            className="size-full object-contain"
                          />
                        </div>
                        <FormLabel className="font-normal size-full flex items-center has-[:checked]:font-medium">
                          VNPAY
                          <FormControl>
                            <RadioGroupItem
                              value={'VNPAY' as PaymentMethod}
                              className="sr-only"
                            />
                          </FormControl>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 p-2 border border-zinc-400 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:text-primary has-[:checked]:border-primary">
                        <div className="size-12 overflow-hidden rounded-md">
                          <img
                            src={MomoIcon}
                            loading="lazy"
                            alt="momo-icon"
                            className="size-full object-contain"
                          />
                        </div>
                        <FormLabel className="font-normal size-full flex items-center has-[:checked]:font-medium">
                          MOMO
                          <FormControl>
                            <RadioGroupItem
                              value={'MOMO' as PaymentMethod}
                              className="sr-only"
                            />
                          </FormControl>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            {form.getValues('name') === 'MOMO' && (
              <FormField
                control={form.control}
                name="requestType"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>Choose type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 sm:grid-cols-2">
                        {Object.entries({
                          captureWallet: 'Capture Wallet',
                          payWithATM: 'Pay With ATM',
                          payWithCC: 'Pay With Credit Card',
                        }).map(([type, label], index) => (
                          <FormItem
                            key={index}
                            className="flex items-center space-x-2 space-y-0 p-2 border border-zinc-400 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:text-primary has-[:checked]:border-primary">
                            {type === 'captureWallet' ? (
                              <Wallet />
                            ) : type === 'payWithATM' ? (
                              <Landmark />
                            ) : (
                              <CreditCard />
                            )}
                            <FormLabel className="font-normal size-full flex items-center has-[:checked]:font-medium">
                              {label}
                              <FormControl>
                                <RadioGroupItem
                                  value={type as RequestTypeForMomo}
                                  className="sr-only"
                                />
                              </FormControl>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <Separator className="" />
            <div className="w-full flex justify-end items-center gap-4">
              <DialogClose asChild>
                <Button type="button" variant={'ghost'} className="w-20">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant={'default'} type="submit" className="w-20">
                Pay
              </Button>
            </div>
          </form>
        </Form>
        {(isPaidByVnpayLoading || isPaidByMomoLoading) && (
          <div className="size-full z-50 absolute inset-0 bg-white/50 flex justify-center items-center cursor-not-allowed rounded-lg backdrop-blur">
            <Loader className="animate-spin text-black" size={28} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default BillPaidDialog
