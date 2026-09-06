export interface DateRange {
  from: string
  to:   string
}

export interface Tag {
  id: number
  label: string
  featured: boolean
}

export interface BlogFilters {
  from?: string
  to?: string
  tagLabels?: string[]
  query?: string
  authorName?: string
}
