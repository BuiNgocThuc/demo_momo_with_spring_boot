import Logo from '@/assets/logo.svg'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formateTimestampToDateAndTime } from '@/utils/ExtractTime'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuery } from '@/utils/QueryURL'

const MomoPaymentSuccess = () => {
  const query = useQuery()
  const partnerCode = query.get('partnerCode')
  const orderId = query.get('orderId')
  const requestId = query.get('requestId')
  const amount = query.get('amount')
  const orderInfo = query.get('orderInfo')
  const orderType = query.get('orderType')
  const transId = query.get('transId')
  const resultCode = query.get('resultCode')
  const message = query.get('message')
  const extraData = query.get('extraData')
  const signature = query.get('signature')
  const responseTime = query.get('responseTime')
	console.log(responseTime)
  return (
    <div className="min-h-screen w-screen flex justify-center bg-[#f5f7fa] poppins-regular">
      <div className="w-[500px] h-fit p-4 flex flex-col justify-center items-center">
        <div className="size-28">
          <img src={Logo} alt="logo" className="size-full object-contain" />
        </div>
        <div className="w-full h-full flex flex-col gap-4 bg-white rounded-3xl p-4 shadow-md">
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <span
              className={`border-[16px] ${
                resultCode === '0'
                  ? 'border-[rgba(229,244,237,255)]'
                  : 'border-error-border'
              } rounded-full`}>
              <Check
                size={38}
                className={`text-white ${
                  resultCode === '0' ? 'bg-[#23a26d]' : 'bg-error-foreground'
                } rounded-full p-2`}
              />
            </span>
            <p className="text-xl font-medium">
              {resultCode === '0' ? 'Payment Success!' : 'Payment Failed!'}
            </p>
            <p className="text-muted-foreground">
              {resultCode === '0'
                ? 'Your payment has been successfully done.'
                : 'Your payment has been failed.'}
            </p>
          </div>
          <div className="w-full rounded-2xl bg-[#F7F9FA] p-4 flex flex-col gap-4 mt-2">
            <div className="w-full grid grid-cols-2 gap-y-4">
              <div className="text-[#4B4E52] text-left text-sm">Amount</div>
              <div className="text-right poppins-medium">
                VND{' '}
                {new Intl.NumberFormat('vi-VN').format(parseInt(amount ?? '0'))}
              </div>
              <div className="text-[#4B4E52] text-left text-sm">
                Payment Status
              </div>
              <div className="text-right">
                <Badge
                  className="w-fit justify-end text-sm font-medium px-4"
                  variant={resultCode === '0' ? 'success' : 'error'}>
                  {resultCode === '0' ? 'Success' : 'Failed'}
                </Badge>
              </div>
            </div>
            <Separator className="my-2" />
            <div className="w-full grid grid-cols-2 gap-y-4">
              <div className="text-[#4B4E52] text-left text-sm">
                Beneficiary name
              </div>
              <div className="text-right poppins-medium">ZTech Apartment</div>
              <div className="text-[#4B4E52] text-left text-sm">
                Beneficiary account
              </div>
              <div className="text-right poppins-medium">123456789101</div>
              <div className="text-[#4B4E52] text-left text-sm">
                Transaction ID
              </div>
              <div className="text-right poppins-medium">{transId}</div>
              <div className="text-[#4B4E52] text-left text-sm">
                Payment Method
              </div>
              <div className="text-right poppins-medium">
                {orderType === 'momo_wallet' ? 'Momo Wallet' : 'Momo QR'}
              </div>
              <div className="text-[#4B4E52] text-left text-sm">
                Payment Time
              </div>
              <div className="text-right poppins-medium">
                {formateTimestampToDateAndTime(
                  responseTime ? parseInt(responseTime) : new Date().getTime(),
                )}
              </div>
              <div className="text-[#4B4E52] text-left text-sm">Message</div>
              <div className="text-right poppins-medium">
                {message ?? 'No Message'}
              </div>
            </div>
          </div>
          <div className="w-full h-full flex items-end">
            <Button
              onClick={() => {
                window.open(import.meta.env.VITE_CLIENT_URL)
              }}
              size={'lg'}
              className="text-white w-full">
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MomoPaymentSuccess
