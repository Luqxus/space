import { Loader } from "lucide-react"
import { Info } from "./info"
import { Toolbar } from "./toolbar"
import { Participants } from "./participants"

export const CanvasLoading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <Info.Keleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  )
}
