import React, {useState, useEffect} from 'react'
import { User } from "@nextui-org/react";


function ProfileCard({session}) {
const [userWalletConnected, setUserWalletConnected] = useState(false);

  return (
    <div className="flex items-center">
            <div className="shadow-lg bg-white rounded-b p-4 flex justify-between items-center leading-normal">
            {session && (
                <>
                <div className="flex items-center">
                <User src={session?.user?.image} name={session?.user?.name} css={{ p: 0 }}>
                   @{session?.user?.name}
                </User>
              </div>
              {userWalletConnected && (
                <p className="ml-3">
                    0xb794f5ea0ba39494ce839613fffba74279579268
                </p>
              )}
                {!userWalletConnected && (
               <button className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
             Connect Wallet
             </button>
              )}
              </>

        )}
            </div>
    </div>
  )
}
export default ProfileCard