import React from 'react'
import DockerCompose from '../createdComp/DockerCompose'
import { TerminalDemo } from '@/createdComp/TerminalDemo'

export function DockerComposePage() {
  return (
    <div className="p-5 flex flex-col min-h-screen items-center justify-center bg-[#0a1228]">
    <DockerCompose/>
    <br />
    {/* <TerminalDemo/> */}
  </div>
  )
}
