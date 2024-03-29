import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/sidebar/Sidebar'
import ReactToast from "@/components/react-toast";

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Medicon',
  description: 'Medicon dashboard  app',
}

export default async function RootLayout({ children }) {

  const session = await getServerSession();


  return (
    <html lang="en">
      <body className={inter.className}>

        <SessionProvider session={session}>
          <div className="flex">
            <div>
              <Sidebar />
            </div>
            <div className='flex-grow'>
              {children}
            </div>
          </div>
          <ReactToast />
        </SessionProvider>

      </body>
    </html>
  )
}
