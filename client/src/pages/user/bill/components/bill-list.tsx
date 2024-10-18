import BillItem from '@/pages/user/bill/components/bill-item'
import { Bill } from '@/schema/bill.validate'
interface BillListProps {
  bills?: Bill[]
}

const BillList = ({ bills }: BillListProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 bg-white overflow-y-auto">
      {bills &&
        bills.map((bill, index) => <BillItem bill={bill} key={index} />)}
    </div>
  )
}

export default BillList
