import React, {useRef} from 'react'
import Image from 'next/image';
import { Modal,Button} from "@nextui-org/react";
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import exportAsImage from '../utils/exportAsImage'

function SendGift({visible,setVisible,session, sendTo, transactionAmount,method}) {
    const exportRef = useRef();
    const { width, height } = useWindowSize()
    const closeHandler = () => {
    setVisible(!visible);
  };
  return (
<>
<Confetti
      width={width/2}
      height={height/2}
    />
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
         <div ref={exportRef} className="bg-scroll bg-[url('/background.jpg')] h-[380px] w-[400] bg-contain bg-no-repeat flex justify-center overflow-hidden ">
         <div>
            <div className='font-extrabold flex justify-center w-full' >
            <span className="text-2xl text-violet-400">
                 Hello {session?.user?.name}
            </span>
            </div>
            <div className=' font-bold flex justify-center w-full mt-9'>
            <span className=" p-3 text-l text-gray-700">
                 You have Successfully sent {transactionAmount.toString()} USD to {sendTo[0]?.name} through {method}
                 Check your Twitter Direct Messages for further Information
            </span>
            </div>
            <div className='flex justify-center w-full mt-9'>
            <a
          className="flex items-center justify-center gap-2"
          href="https://twitter.com/MutindaKioko9"
          target="_blank"
          rel="noopener noreferrer"
        >
          With 💖 from @
          <Image src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg" alt="Twitter Logo" width={16} height={16} />
          @MutindaKioko9
          </a>
            </div>
        </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="primary" onClick={() => exportAsImage(exportRef.current, "gift")}>
           Save
          </Button>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
        </>
  )
}

export default SendGift