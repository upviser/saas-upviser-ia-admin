import { Nav } from "@/components/configuration"

export default function Layout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
            <div className='p-4 lg:p-6 w-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900 mb-16 pt-20 lg:pt-4' style={{ height: 'calc(100% - 73px)' }}>
              <div className='flex w-full max-w-[1280px] mx-auto gap-6 flex-col lg:flex-row'>
                <Nav />
                { children }
                </div>
                </div>
                </>
  )
}