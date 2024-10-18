import { Link } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Fragment } from 'react/jsx-runtime'

interface BreadcrumbProps {
  paths: { label: string; to?: string }[] // Array to handle multiple breadcrumb levels
}

const Index: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <div className="w-full px-4 pt-4">
      <Breadcrumb className="p-4 font-medium bg-white rounded-md">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={'/'}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {paths.map((path, index) => (
            <Fragment key={index}>
              {index != paths.length - 1 ? (
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={path.to || ''} className="first-letter:uppercase">
                      {path.label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage className="first-letter:uppercase">
                    {path.label}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              )}
              {index < paths.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default Index
