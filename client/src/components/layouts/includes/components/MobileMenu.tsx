import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { AlignLeft, LogOut } from 'lucide-react'
import { SideBarProps } from '../Header'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Logo from '@/assets/logo.svg'

interface MobileMenuProps {
  sidebar: SideBarProps[]
}

export default function MobileMenu({ sidebar }: MobileMenuProps) {
  const navigate = useNavigate()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <AlignLeft />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <div className="w-full h-full flex flex-col gap-2">
          <SheetHeader>
            <div className="w-fit md:w-full h-[120px] sm:p-3 sm:order-none order-2">
              <img
                src={Logo}
                alt="Logo website"
                className="w-full h-full object-contain aspect-square"
              />
            </div>
          </SheetHeader>
          <div className="w-full h-full flex flex-col gap-2">
            {sidebar.map((sideBar, index) => (
              <SheetClose key={index} asChild>
                <Button
                  asChild
                  type="button"
                  variant={'ghost'}
                  size={'lg'}
                  className={`gap-2 justify-start px-2 ${
                    (sideBar.to === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(sideBar.to)) &&
                    'bg-primary'
                  }`}>
                  <Link to={sideBar.to}>
                    {sideBar.icon}
                    {sideBar.label}
                  </Link>
                </Button>
              </SheetClose>
            ))}
          </div>
          <div className="w-full mt-5 flex items-center gap-2">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-full flex flex-col">
              <span className="text-sm font-bold">User Name</span>
              <span className="text-xs">Role</span>
            </div>
            <div className="flex justify-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => navigate('/login', { replace: true })}
                    size={'icon'}
                    variant={'ghost'}>
                    <LogOut />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Log out</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
