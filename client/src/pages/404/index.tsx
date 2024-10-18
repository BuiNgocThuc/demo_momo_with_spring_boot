import { Link } from 'react-router-dom'
import NotFoundImage from '@/assets/404.png'
import { Button } from '@/components/ui/button'
export default function Index() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white">
          <div className="flex flex-col justify-center items-center">
            <h6 className="mb-2 text-3xl sm:text-5xl font-bold text-center text-gray-800">
              <span className="text-red-500">Oops!</span>
            </h6>
            <p className="text-center text-lg text-muted-foreground font-medium text-balance">
              We couldn't find the page you're looking for.
            </p>
            <img src={NotFoundImage} className={'size-[80%]'} />
            <Button
              asChild
              variant={'default'}
              size={'lg'}
              className="mt-5 text-white">
              <Link to="/">Go home</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
