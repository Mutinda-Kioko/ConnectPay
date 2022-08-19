import React, {useState, useEffect} from 'react'
import { User } from "@nextui-org/react";


function ProfileCard({session}) {
  return (
    <div className="flex items-center mx-2">
            <div className="shadow-lg bg-white rounded-b p-4 flex justify-between items-center leading-normal">
            {session && (
                <>
                <div className="flex items-center">
                <User src={session?.user?.image} name={session?.user?.name} css={{ p: 0 }}>
                   @{session?.twitter?.twitterHandle}
                </User>
              </div>
              </>

        )}
            </div>
    </div>
  )
}
export default ProfileCard