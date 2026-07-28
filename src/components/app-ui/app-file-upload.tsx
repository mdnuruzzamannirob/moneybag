'use client'
import { UploadCloud } from 'lucide-react'
export function AppFileUpload({
  accept,
  description = 'Drag and drop or click to browse',
  label = 'Upload a file',
  onFiles,
}: {
  accept?: string
  description?: string
  label?: string
  onFiles?: (files: FileList | null) => void
}) {
  return (
    <label className="flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-border px-6 py-8 text-center hover:bg-muted/40">
      <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
        <UploadCloud className="size-5" />
      </span>
      <span className="mt-3 text-sm font-medium">{label}</span>
      <span className="mt-1 text-xs text-muted-foreground">{description}</span>
      <input
        accept={accept}
        className="sr-only"
        multiple
        onChange={(event) => onFiles?.(event.target.files)}
        type="file"
      />
    </label>
  )
}
