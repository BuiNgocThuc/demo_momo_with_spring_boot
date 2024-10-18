import { useParams } from 'react-router-dom'
import { useDocumentTitle, useWindowSize } from 'usehooks-ts'
import BillList from './components/bill-list'
import { Input } from '@/components/ui/input'
import { Download, Search } from 'lucide-react'
import BreadCrumb from '@/components/breadcrumb'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import BillDetail from './components/bill-detail'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import BillPaidDialog from './components/bill-paid-dialog'
import { useGetBillsQuery } from '@/features/bill/billSlice'
import UserBillSkeleton from '@/components/skeleton/UserBillSkeleton'
const Index = () => {
  useDocumentTitle('Bill')
  const params = useParams()
  const { width = 0 } = useWindowSize()
  const { data: bills, isLoading, isFetching } = useGetBillsQuery(1)
  console.log('bills', bills)
  return (
    <div className="w-full sm:h-screen flex flex-col bg-zinc-100 overflow-hidden">
      <BreadCrumb
        paths={[
          { label: 'bill', to: '/bills' },
          ...(params.id ? [{ label: params.id }] : []),
        ]}
      />
      <div className="w-full h-full p-4 flex gap-4 overflow-hidden">
        <div className="w-full h-full flex flex-col p-4 bg-white rounded-md">
          <div className="w-full h-full overflow-y-auto flex flex-col gap-4">
            {params.id && width < 1024 ? (
              <div className="size-full bg-white rounded-md flex overflow-hidden flex-col">
                <div className="w-full h-14 bg-success flex justify-between items-center rounded-b-md p-4">
                  <p className="font-medium">Bill-{params.id}.pdf</p>
                  <div className="flex gap-4 items-center">
                    <BillPaidDialog id={params.id}>
                      <Button
                        value={'default'}
                        type="button"
                        className="text-white">
                        Paid now
                      </Button>
                    </BillPaidDialog>
                    <PDFDownloadLink
                      document={<BillDetail id={parseInt(params.id)} />}
                      fileName={`Bill-${params.id}.pdf`}>
                      <Button size={'icon'} variant={'destructive'}>
                        <Download />
                      </Button>
                    </PDFDownloadLink>
                  </div>
                </div>
                <PDFViewer className="size-full">
                  <BillDetail id={parseInt(params.id)} />
                </PDFViewer>
                <Separator />
              </div>
            ) : (
              <>
                <div className="flex items-center border px-3 py-0.5 relative rounded-md focus-within:border-primary transition-all">
                  <Search size={20} />
                  <Input
                    placeholder="Search something"
                    className="border-none shadow-none focus-visible:ring-0"
                  />
                </div>
                <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
                  {isFetching || isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <UserBillSkeleton key={index} />
                    ))
                  ) : (
                    <BillList bills={bills} />
                  )}
                  {/* <PaginationCustom
                    currentPage={bills?.page}
                    totalPages={bills?.totalPages}
                    onPageChange={handlePageChange}
                  /> */}
                </div>
              </>
            )}
          </div>
        </div>
        {params.id && width > 1024 && (
          <div className="size-full p-4 bg-white rounded-md lg:flex hidden overflow-hidden flex-col">
            <PDFViewer className="size-full">
              <BillDetail id={parseInt(params.id)} />
            </PDFViewer>
            <Separator />
            <div className="w-full h-14 bg-success flex justify-between items-center rounded-b-md p-4 relative">
              <p className="font-medium">Bill-{params.id}.pdf</p>
              <div className="flex gap-4 items-center">
                <BillPaidDialog id={params.id}>
                  <Button
                    value={'default'}
                    type="button"
                    className="text-white">
                    Paid now
                  </Button>
                </BillPaidDialog>
                <PDFDownloadLink
                  document={<BillDetail id={parseInt(params.id)} />}
                  fileName={`Bill-${params.id}.pdf`}>
                  <Button size={'icon'} variant={'destructive'}>
                    <Download />
                  </Button>
                </PDFDownloadLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index
