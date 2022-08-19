import {useState, useRef} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ProfileCard from "../components/ProfileCard";
import SearchBar from '../components/SearchBar';
import Dashboard from '../components/Dashboard';
import {getSession, signIn, signOut, useSession,} from "next-auth/react";
import { User, Button, Modal } from "@nextui-org/react";
import GooglePayButton from "@google-pay/button-react";
import PayPal from"../components/PayPal";
import Script from 'next/script';
import { DebounceInput } from 'react-debounce-input';
import SendGift from '../components/SendGift';
import sendDirectMessage from '../utils/sendDirectMessage';
import sendDmToSender from '../utils/sendDmToSender';
import { useRouter } from 'next/router';
import oauthSignature from 'oauth-signature'

const crypto = require('crypto');

const Home = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [sendTo, setSendTo] = useState("")
  const [checkout, setCheckout] = useState(false)
  const [transactionSuccess, setTransactionSuccess] = useState(false)
  const [transactionAmount, setTransactionAmount] = useState("");
  const [method, setMethod] = useState("");
  var nonceLen = 32;
  const nonce = crypto.randomBytes(Math.ceil(nonceLen * 3 / 4))
  .toString('base64')
  .slice(0, nonceLen)
  .replace(/\+/g, '0') 
  .replace(/\//g, '0'); 
  const timestamp= Math.floor((new Date()).getTime() / 1000);
  const httpMethod='POST';
  const url = 'https://api.twitter.com/1.1/direct_messages/events/new.json';
  const parameters = {
    oauth_consumer_key : 'o5jHfoPPfEk0v4ROr8Y9aCJuH',
    oauth_token : '1235280018210770945-NPAENpHxLgKVqeeXZpp3xvT8YZEagm',
    oauth_nonce : nonce,
    oauth_timestamp : timestamp,
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0',
}
  const consumerSecret = 'xEeseUr9zvhlUHQ8mHpeJ5kGQm4SSI93tGSPmFlIl0LiT3hrcI';
  const tokenSecret = '6THgCxlk5Od2QKhje4e420vtNjrylJ732XVtPjFCH5CVX'

  const setAmountToSend = amount => {
    if (!amount) return 
    if (amount > 0){
      setTransactionAmount(String(amount));
    }

  }
const [visible, setVisible] = useState(false);
const closeHandler = () => {
  setVisible(false);
};
const transactionComplete = (methods) => {
  setMethod(methods);
  const  signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,{ encodeSignature: false});
  const recipient_id = sendTo[0]?.id;
  const senderTwitterHandle = session?.twitter?.twitterHandle;
  const sentAmount = transactionAmount;
  const method = methods;
  const senderId = session?.twitter?.userID;
  const recipientName = sendTo[0]?.name;
  const senderName = session?.user?.name;
  const recipientHandle = sendTo[0]?.username;
  console.log("timestamp",timestamp);
  console.log("signature",signature);
  console.log("nonce",nonce);
  console.log(senderId)
  sendDirectMessage(recipient_id?.toString(),senderTwitterHandle.toString(),sentAmount.toString(),method.toString(),recipientName.toString(),timestamp,signature,nonce);
  sendDmToSender(recipient_id?.toString(),senderTwitterHandle.toString(),sentAmount.toString(),method.toString(),senderId.toString(),senderName.toString(),recipientHandle.toString(),timestamp,signature,nonce);
  setVisible(true);
}
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Script async  src="https://pay.google.com/gp/p/js/pay.js"></Script>
      <Script src="/bower_components/oauth-signature/dist/oauth-signature.js"></Script>
      <Script async  src="https://www.paypal.com/sdk/js?client-id=AURAbmTpw9F_QEMQrbaul0jFnOeNEfF3KUIwUESlNZAfbbjGQ5gw8Byh3cuxsmW8AKbr_8WaCrIvTU17&currency=USD"></Script>
      <Head>
        <title>Connect Pay</title>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon-32x32.ico`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon-16x16.ico`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center  px-20 text-center">
        <h1 className="text-3xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="">
           Connect Pay 🎁
          </a>
        </h1>

        <p className="mt-3 text-xl">
          Send money to any twitter account....
        </p>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-center sm:w-full">
        {session && <>
          <ProfileCard session={session}/>
          <div className='mx-2'>
          <Dashboard/>
          </div>
          <div  className='mx-2'> <button onClick={() => signOut()}>Sign Out</button></div>
         </>}      
        </div>
        <div className='mt-2'>
          {session && (
            <>
          <h5>To:</h5>
          <SearchBar sendTo={sendTo} setSendTo={setSendTo}/>
          {sendTo && <>
          <div>
          <User src={sendTo[0]?.profile_image_url} name={sendTo[0]?.name} css={{ p: 0 }}>
                    @{sendTo[0]?.username}
          </User>
          </div>
          </>}
            </>
          )}
        </div>
        <div className="flex w-full flex-1 flex-col items-center justify-center  px-20 text-center">
         {!session && <>
         <div>
          Sign In To transact with other twitter users.... 
         </div>
         <div className='mt-2'>
         <Button onClick={() => signIn()}>Sign In</Button>
         </div>
         </>}
         {sendTo && <>
         <div>
          Amount: 
         <DebounceInput
            className="px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Amount in USD"
            minLength={1}
            debounceTimeout={200}
            onChange={event => (setAmountToSend(event.target.value))}
            required
            type="number"
            />
      </div>
     <div className='mt-4'>
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['VISA','MASTERCARD'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice:`${transactionAmount}`,
            currencyCode: 'USD',
            countryCode: 'US',
          },
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Success', paymentRequest);
          console.log('Successfully sent', transactionAmount,' from ',session?.user?.name, 'to' ,sendTo[0]?.name , 'through Google Pay');
          transactionComplete("Google Pay");
        }}
        existingPaymentMethodRequired="false"
        buttonColor="Black"
        buttonType="plain"
        buttonLocale="en"
      />
      </div>
      {!checkout && <Button onClick={() => setCheckout(true)}>PayPal</Button> }
         </>}
        </div>
        {checkout &&  <PayPal transactionComplete={transactionComplete}  session={session} sendTo={sendTo} transactionAmount={transactionAmount} transactionSuccess={transactionSuccess} setTransactionSuccess={setTransactionSuccess} />}
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
      <Modal
        closeButton
        blur
        noPadding
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <div>
        <SendGift method={method} transactionAmount={transactionAmount} visible={visible} setVisible={setVisible} session={session} sendTo={sendTo} />
        </div>
      </Modal>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props:{
      session
    }
  }
}

export default Home
