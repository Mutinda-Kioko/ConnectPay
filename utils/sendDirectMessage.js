export default function sendDirectMessage (recipient_id,senderTwitterHandle,sentAmount,method,recipientName){
  const message = {"event": {"type": "message_create", "message_create": {"target": {"recipient_id": recipient_id}, "message_data": {"text":`Hello ${recipientName} 👋👋👋, @${senderTwitterHandle} has sent you ${sentAmount} USD through ${method}. Follow the link: https://twitter-pay.vercel.app/ to withdraw your money.Thank you  for using Connect Pay 🎁 @connectpayglob `}}}}
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "guest_id=v1%3A166081299054165841");
    myHeaders.append("Content-Type", "application/json");
   
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body:JSON.stringify(message),
    };
    
    fetch("https://still-beach-77428.herokuapp.com/https://api.twitter.com/1.1/direct_messages/events/new.json?oauth_consumer_key=o5jHfoPPfEk0v4ROr8Y9aCJuH&oauth_token=1235280018210770945-NPAENpHxLgKVqeeXZpp3xvT8YZEagm&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1660833921&oauth_nonce=k65l5oZ0s3f&oauth_version=1.0&oauth_signature=nc1SPmXrut1kQI4QcmYZU3y9OZY%3D", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}