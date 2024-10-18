import { cn } from '@/lib/utils'

export interface FunctionBoxProps {
  className?: string
  icon: React.ReactNode
  title: string
  description: string
}

const FunctionBox = ({
  className,
  icon,
  title,
  description,
}: FunctionBoxProps) => {
  return (
    <div
      className={cn(
        className,
        'size-full bg-white rounded-md border border-zinc-200 p-4 flex flex-col justify-center items-center space-y-4 transition-all hover:bg-primary/10 hover:border-primary cursor-pointer',
      )}>
      <p className="flex flex-col justify-center items-center text-center gap-2">
        <span>{icon}</span>
        <span className="text-xl uppercase font-medium first-letter:uppercase">
          {title}
        </span>
        <span className="text-sm text-muted-foreground font-medium">
          {description}
        </span>
      </p>
    </div>
  )
}

export default FunctionBox
