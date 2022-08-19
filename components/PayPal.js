import React, { useRef, useEffect } from "react";

export default function Paypal({transactionAmount, transactionSuccess, setTransactionSuccess, session, sendTo, transactionComplete}) {
  const paypalRef = useRef();

  useEffect(() => {
    if(window.myButton) window.myButton.close();
    window.myButton = window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "test",
                amount: {
                  currency_code: "USD",
                  value: transactionAmount
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          console.log('Successfully sent', transactionAmount,' from ',session?.user?.name, 'to' ,sendTo[0]?.name , 'through PayPal');
          transactionComplete("Paypal");
        },
        onError: err => {
          setError(err);
          console.error(err);
        }
      });
    window.myButton.render(paypalRef.current);
    })
  return (
      <div ref={paypalRef}/>
  );
}