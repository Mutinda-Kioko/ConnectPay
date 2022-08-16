import React from 'react'
import Image from 'next/image'

function UserCard() {
  return (
    <div className="flex items-center my-1">
                <Image className="w-10 h-10 rounded-full mr-4" src="https://pbs.twimg.com/profile_images/1425727042948145154/XCacAYiO_400x400.jpg" alt="Avatar of Jonathan Reinink" width={40} height={40}/>
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">Mutinda-Kioko</p>
                  <p className="text-gray-600">@MutindaKioko9</p>
                </div>
              </div>
  )
}

export default UserCard