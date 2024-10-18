import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface AlertDeleteProps {
  setAction: (value: void) => void
  description: string
  variants?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'success'
    | 'warning'
    | 'info'
    | 'error'
  type?: 'icon' | 'button'
}

const AlertDelete = ({
  setAction,
  description,
  variants = 'destructive',
  type = 'button',
}: AlertDeleteProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {type === 'icon' ? (
          <Button size={'icon'} variant={variants}>
            <Trash2 />
          </Button>
        ) : (
          <Button type="button" variant={variants}>
            Delete
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{' '}
            {description} and remove the data from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-red-500 text-white hover:bg-red-400' type='button' onClick={() => setAction()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDelete
