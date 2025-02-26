import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn('flex items-center text-sm', className)}
      {...props}
    />
  )
)
Breadcrumb.displayName = 'Breadcrumb'

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn('flex items-center gap-1.5', className)}
      {...props}
    />
  )
)
BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  )
)
BreadcrumbItem.displayName = 'BreadcrumbItem'

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<typeof Link>>(
  ({ className, ...props }, ref) => (
    <Link
      ref={ref}
      className={cn('text-muted-foreground hover:text-foreground', className)}
      {...props}
    />
  )
)
BreadcrumbLink.displayName = 'BreadcrumbLink'

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink }