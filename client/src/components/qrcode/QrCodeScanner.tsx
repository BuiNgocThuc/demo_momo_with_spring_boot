import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { Button } from '../ui/button'
import { QrCode } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import './style.css'
interface QrCodeScannerProps {
  handleQrScanSuccess: (data: any) => void
}

const QrCodeScanner = ({ handleQrScanSuccess }: QrCodeScannerProps) => {
  const [isScannerInitialized, setIsScannerInitialized] =
    useState<boolean>(false)
  const [qrScanInformation, setQrScanInformation] = useState<any>(undefined)
  useEffect(() => {
    if (isScannerInitialized) {
      const scanner = new Html5QrcodeScanner(
        'reader',
        {
          fps: 20,
          qrbox: {
            width: 250,
            height: 250,
          },
          aspectRatio: 1,
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.DATA_MATRIX,
            Html5QrcodeSupportedFormats.AZTEC,
            Html5QrcodeSupportedFormats.PDF_417,
            Html5QrcodeSupportedFormats.MAXICODE,
						Html5QrcodeSupportedFormats.EAN_13,
						Html5QrcodeSupportedFormats.EAN_8,
						Html5QrcodeSupportedFormats.UPC_A,
						Html5QrcodeSupportedFormats.UPC_E,
						Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
						Html5QrcodeSupportedFormats.CODE_39,
						Html5QrcodeSupportedFormats.CODE_93,
						Html5QrcodeSupportedFormats.CODE_128,
						Html5QrcodeSupportedFormats.ITF,
						Html5QrcodeSupportedFormats.RSS_14,
						Html5QrcodeSupportedFormats.RSS_EXPANDED,
						Html5QrcodeSupportedFormats.CODABAR,
          ],
          defaultZoomValueIfSupported: 2,
          showZoomSliderIfSupported: true,
        },
        false,
      )

      function onScanSuccess(decodedText: string, decodedResult: any) {
        console.log(`Scan result: ${decodedText}`, decodedResult)
        scanner.clear()
        setIsScannerInitialized(false)
        const data = decodedText.split('|')
        const qrScanInformation = {
          nationID: data[0],
          name: data[2],
          dob: data[3],
          gender: data[4],
        }
        setQrScanInformation(qrScanInformation)
      }

      function onScanError(errorMessage: string) {
        console.log(`Error: ${errorMessage}`)
      }

      scanner.render(onScanSuccess, onScanError)

      // Clean up the scanner when component unmounts
      return () => {
        scanner
          .clear()
          .catch((error) => console.error('Failed to clear the scanner', error))
      }
    }
  }, [isScannerInitialized])

  return (
    <>
      <Dialog onOpenChange={(open) => setIsScannerInitialized(open)}>
        <DialogTrigger asChild>
          <Button variant={'secondary'} type={'button'} size={'icon'}>
            <QrCode />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm lg:max-w-lg xl:max-w-xl">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
            <DialogDescription className="font-medium">
              This feature is still being developed, so it might have some
              errors.
            </DialogDescription>
          </DialogHeader>
          <div id="reader" className="w-full h-full"></div>
          {qrScanInformation && (
            <div className="flex flex-col">
              <p className="text-sm text-gray-500 font-medium mb-2">
                Scan result
              </p>
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-gray-500 font-medium">
                  National ID: {qrScanInformation.nationID}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  Name: {qrScanInformation.name}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  Date of Birth: {qrScanInformation.dob.slice(0,2)}/{qrScanInformation.dob.slice(2,4)}/{qrScanInformation.dob.slice(4)}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  Gender: {qrScanInformation.gender}
                </p>
              </div>
              <DialogFooter className="w-full flex flex-row sm:justify-center mt-4">
                <Button
                  onClick={() => {
                    setIsScannerInitialized(true)
                    setQrScanInformation(undefined)
                  }}
                  type="button"
									className='w-full'
                  variant={'secondary'}>
                  Scan Again
                </Button>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      setIsScannerInitialized(false)
                      handleQrScanSuccess(qrScanInformation)
                    }}
                    variant={'default'}
                    className="w-full">
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default QrCodeScanner
