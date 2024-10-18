import { Separator } from '@/components/ui/separator'
import { Bill } from '@/schema/bill.validate'
import { useNavigate, useParams } from 'react-router-dom'

interface BillItemProps {
  bill: Bill
}

const BillItem = ({ bill }: BillItemProps) => {
  const navigate = useNavigate()
	const params = useParams()
  return (
    <div
      onClick={() => navigate(`/bills/${bill.id}`)}
      className={`rounded-md w-full flex flex-col border-2 cursor-pointer hover:bg-zinc-50 transition-all ${
        bill.id === parseInt(params?.id ?? '0') ? 'border-primary' : ''
      }`}>
      <div className="w-full flex flex-col p-4">
        <h1 className="text-lg font-medium">ID: {bill.id}</h1>
        {/* <div className="w-full grid grid-cols-[100px_auto] text-sm">
				<span className="text-muted-foreground">Owner:</span>
				<span className="">Bui Hong Bao</span>
			</div> */}
        {/* <div className="w-full grid grid-cols-[100px_auto] text-sm">
				<span className="text-muted-foreground">Apartment:</span>
				<span className="">A.10{index}</span>
			</div> */}
        <div className="w-full grid grid-cols-[100px_auto] text-sm">
          <span className="text-muted-foreground">Date:</span>
          <span className="">{bill.createdAt}</span>
        </div>
        <div className="w-full grid grid-cols-[100px_auto] text-sm">
          <span className="text-muted-foreground">Total:</span>
          <span className="">{bill.totalPrice}</span>
        </div>
        <div className="w-full grid grid-cols-[100px_auto] text-sm">
          <span className="text-muted-foreground">Monthly:</span>
          <span className="">{bill.monthly}</span>
        </div>
      </div>
      <Separator
        className={`h-0.5 ${
          bill.id === parseInt(params?.id ?? '0') ? 'bg-primary' : ''
        }`}
      />
      <div className="w-full flex justify-end py-2 px-4">
        <span
          className={`text-lg ${
            bill.status === 'UNPAID'
              ? 'text-red-600'
              : bill.status === 'PAID'
              ? 'text-green-600'
              : 'text-yellow-600'
          } font-medium`}>
          {bill.status}
        </span>
      </div>
    </div>
  )
}

export default BillItem
