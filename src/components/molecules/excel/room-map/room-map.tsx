import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { DownloadIcon } from 'lucide-react'

import { Button } from '@/components/atoms/ui/button'

export const RoomMapPreview = () => {
  const docs = [
    {
      uri: 'https://utfs.io/f/49bb3722-85e8-450b-aa0f-5a3c9d68e1e9-sq67cl.xlsx',
      fileType: 'xlsx',
      fileName: 'Denah Ruangan - 2024'
    }
  ]

  return (
    <div className="h-[60vh] space-y-2">
      <Button
        onClick={() => window.open('https://utfs.io/f/49bb3722-85e8-450b-aa0f-5a3c9d68e1e9-sq67cl.xlsx', '_blank')}
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
