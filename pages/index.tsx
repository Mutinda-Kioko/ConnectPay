import type { NextPage } from 'next'
import {useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import ProfileCard from "../components/ProfileCard"
import Giftcard from '../components/Giftcard'
import SearchBar from '../components/SearchBar'
import Dashboard from '../components/Dashboard'
import {getSession, signIn, signOut, useSession,} from "next-auth/react"
import { User, Button } from "@nextui-org/react";

const Home: NextPage = () => {
  const { data: session } = useSession()
  const [sendTo, setSendTo] = useState("K")
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Twitter Pay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center  px-20 text-center">
        <h1 className="text-3xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="">
           Twitter Pay 🎁
          </a>
        </h1>

        <p className="mt-3 text-xl">
          Send money to any twitter account....
        </p>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-center sm:w-full">
        {session && <>
          <ProfileCard session={session}/>
         </>}
          <Dashboard/>
        </div>
        <div>
          {!sendTo && <SearchBar/>}
          {sendTo && <>
          To: <br/>
          <User src={session?.user?.image!} name={session?.user?.name} css={{ p: 0 }}>
            {session?.user?.email}
          </User>
          </>}
        </div>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
         {!session && <>
         Not signed in <br/>
         <button onClick={() => signIn()}>Sign In</button>
         </>}
         {sendTo && <>
         <Button>Google Pay</Button>
         <Button>PayPal</Button>
         <Button>Stripe</Button>
         </>}
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://twitter.com/MutindaKioko9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with 💖 by @
          <Image src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg" alt="Twitter Logo" width={16} height={16} />
          @MutindaKioko9
          </a>
       
      </footer>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  return {
    props:{
      session
    }
  }
}

export default Home
