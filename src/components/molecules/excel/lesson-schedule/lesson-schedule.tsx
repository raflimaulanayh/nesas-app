import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { DownloadIcon } from 'lucide-react'

import { Button } from '@/components/atoms/ui/button'

export const LessonSchedulePreview = () => {
  const docs = [
    {
      uri: 'https://utfs.io/f/6bd0b349-3657-4064-803f-7e8247208a7a-nk8kjs.xlsx',
      fileType: 'xlsx',
      fileName: 'Jadwal Pelajaran Semester 2 - 2024'
    }
  ]

  return (
    <div className="h-[60vh] space-y-2">
      <Button
        onClick={() => window.open('https://utfs.io/f/6bd0b349-3657-4064-803f-7e8247208a7a-nk8kjs.xlsx', '_blank')}
        size="sm"
        className="flex items-center gap-1 text-xs"
      >
        <DownloadIcon size={16} />
        <span>Unduh</span>
      </Button>
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} style={{ width: '100%' }} className="h-[60vh]" />
    </div>
  )
}
