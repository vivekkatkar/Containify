import DockerForm from '@/createdComp/DockerForm' 
import { TerminalDemo } from '@/createdComp/TerminalDemo'

function DockerFilePage() {
  return (
    <div className="p-5 flex gap-4 min-h-screen items-center justify-center bg-[#0a1228]">
      <DockerForm/>
      <br />
      <TerminalDemo/>
    </div>
  )
}

export default DockerFilePage
