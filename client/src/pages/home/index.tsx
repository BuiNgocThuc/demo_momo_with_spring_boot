import { useDocumentTitle } from 'usehooks-ts'
import {
  Flag,
  House,
  LayoutPanelTop,
  NotebookText,
  Package,
  Receipt,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import FunctionBox, { FunctionBoxProps } from './components/FunctionBox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
const Index = () => {
  useDocumentTitle('Home')
  const date = new Date() // Current date

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  }
  const formattedDate = date.toLocaleDateString('en-US', options)

  const functionLists: FunctionBoxProps[] = [
    {
      icon: <Package size={50} className="text-primary" />,
      title: 'Packages',
      description: 'Manage your packages',
    },
    {
      icon: <NotebookText size={50} className="text-primary" />,
      title: 'Survey',
      description: 'Take a survey',
    },
    {
      icon: <Flag size={50} className="text-primary" />,
      title: 'Report',
      description: 'Report an issue',
    },
    {
      icon: <Receipt size={50} className="text-primary" />,
      title: 'Payment',
      description: 'Manage your payment',
    },
  ]

  return (
    <div className="w-full h-full min-h-screen md:h-screen p-4 bg-zinc-100 flex flex-col space-y-4 overflow-hidden">
      <p className="font-medium">{formattedDate}</p>
      <p className="text-3xl font-bold">Hello, {`{{user}}`}</p>
      <div className="size-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="w-full lg:col-span-1 lg:row-span-3 lg:row-start-1 lg:col-start-1 bg-white rounded-md border border-zinc-200 p-4 flex flex-col space-y-2">
          <p className="flex items-center gap-2 text-lg font-medium uppercase">
            <span>
              <LayoutPanelTop />
            </span>
            Apartment <span className="text-primary">A.001</span>
          </p>
          <Separator />
          <p>
            <span className="font-medium">Floor:</span> 1
          </p>
          <p>
            <span className="font-medium">Owner:</span> Bui Hong Bao
          </p>
          <p>
            <span className="font-medium">Area:</span> 25x25 (m<sup>2</sup>)
          </p>
          <p>
            <span className="font-medium">Description: </span>
            Sint nulla velit deserunt et magna nulla velit voluptate non ad.Qui
            sunt proident minim ipsum culpa amet reprehenderit mollit duis
            laborum Lorem ex minim cupidatat.
          </p>
        </div>
        <div className="w-full lg:col-span-3 lg:row-span-3 lg:row-start-1 lg:col-start-2 bg-white rounded-md border border-zinc-200 p-4 flex flex-col space-y-2">
          <p className="flex items-center gap-2 text-lg font-medium uppercase">
            <span>
              <House />
            </span>
            Members List
          </p>
          <Separator />
          <div className="w-full">
            <Table className="w-full border">
              <TableHeader className="bg-primary">
                <TableRow>
                  <TableHead className="text-white">ID</TableHead>
                  <TableHead className="text-white">Fullname</TableHead>
                  <TableHead className="text-white">User Type</TableHead>
                  <TableHead className="text-white">Created Date</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>1</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>2021-10-10</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 min-[600px]:grid-cols-2 md:grid-cols-4 gap-4 col-span-1 md:col-span-2 lg:col-span-4">
          {functionLists.map((item, index) => (
            <div key={index} className={`size-full`}>
              <FunctionBox
                description={item.description}
                icon={item.icon}
                title={item.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Index
