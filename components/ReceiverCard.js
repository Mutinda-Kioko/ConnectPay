import React, {useState} from 'react'
import Image from 'next/image'

function ProfileCard() {
const [isUserRegistered, setIsuserRegistered] = useState(true)
  return (
    <div className="flex items-center">
            <div className="bg-white rounded-b p-4 flex justify-between items-center leading-normal">
                <p className='px-2'>To:</p>
                <div className="flex items-center">
                <Image className="w-10 h-10 rounded-full mr-4" src="https://pbs.twimg.com/profile_images/1425727042948145154/XCacAYiO_400x400.jpg" alt="Avatar of Jonathan Reinink" width={40} height={40}/>
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">Mutinda-Kioko</p>
                  <p className="text-gray-600">@MutindaKioko9</p>
                </div>
              </div>
            </div>
    </div>
  )
}

export default ProfileCard