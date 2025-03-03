import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (<div>
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-700 bg-slate-900 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="text-slate-300 hover:text-slate-100">
                    Chats
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden text-slate-500 md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-slate-300">Example Chat</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto bg-slate-900 text-sm leading-6 text-slate-300 shadow-md sm:text-base sm:leading-7">
          <div className="flex flex-row px-4 py-8 sm:px-6">
            <img
              className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
              src="/api/placeholder/256/256"
              alt="User avatar"
            />
            <div className="flex max-w-3xl items-center">
              <p>Explain quantum computing in simple terms</p>
            </div>
          </div>

          <div className="flex border-t border-slate-800 bg-slate-800/50 px-4 py-8 sm:px-6">
            <img
              className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
              src="/api/placeholder/256/256"
              alt="Assistant avatar"
            />
            <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
              <p className="max-w-3xl">
                Certainly! Quantum computing is a new type of computing that relies on
                the principles of quantum physics. Traditional computers, like the one
                you might be using right now, use bits to store and process information.
                These bits can represent either a 0 or a 1. In contrast, quantum
                computers use quantum bits, or qubits.<br /><br />
                Unlike bits, qubits can represent not only a 0 or a 1 but also a
                superposition of both states simultaneously. This means that a qubit can
                be in multiple states at once, which allows quantum computers to perform
                certain calculations much faster and more efficiently.
              </p>
              <div className="mt-4 flex flex-row justify-start gap-x-2 text-slate-400 lg:mt-0">
                <button className="hover:text-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
                  </svg>
                </button>
                <button className="hover:text-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                    <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <form className="border-t border-slate-700 bg-slate-900 p-4 ml-sm-n5">
          <div className="mb-4 w-full max-w-3xl rounded-lg bg-slate-800">
            <div className="rounded-lg border border-slate-700 bg-slate-800 px-4">
              <label htmlFor="prompt-input" className="sr-only">Enter your prompt</label>
              <textarea
                id="prompt-input"
                rows={3}
                className="w-full resize-none border-0 bg-transparent py-4 text-base text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-0"
                placeholder="Enter your prompt"
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between border-t border-slate-700 px-2 py-2">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-slate-100"
              >
                <span className="sr-only">Attach file</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5"></path>
                </svg>
                <span className="px-2 text-sm">Attach a file</span>
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Generate
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M10 14l11 -11"></path>
                  <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
  </div>)
}