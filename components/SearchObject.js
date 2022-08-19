import React, {useEffect, useState} from 'react'
import {Input, Row, User, } from "@nextui-org/react";
import { DebounceInput } from 'react-debounce-input'
function SearchObject({sendTo,setSendTo, visible, setVisible}) {
    const [searchResult, setSearchResult] = useState({})
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAAFOQfAEAAAAAzrXoG29qEUxLjwnmVzN3Ufa3%2Ftw%3DnHGHeetN9nLICT4lDGZkQV2ZQeBZnUUi8YN0rM1aFgNE1X9vLq");
     myHeaders.append("Cookie", "guest_id=v1%3A166081299054165841");
     
     var requestOptions = {
       method: 'GET',
       headers: myHeaders,
       redirect: 'follow'
     };
     const handlePressed = (e) => {
      e.preventDefault();
      if(String(searchResult[0]?.username).length > 3){
       setSendTo(searchResult);
       console.log(searchResult);
       setVisible(!visible);
      }
     }
     const doNameFilter = query => {
      if (!query) return 
      fetch(`https://still-beach-77428.herokuapp.com/https://api.twitter.com/2/users/by?usernames=${query}&user.fields=entities,id,name,profile_image_url,username`, requestOptions)
       .then(response => response.json())
       .then(result => {
         setSearchResult(result?.data)
       })
       .catch(error => console.log('error', error)); 
    }
  return (
    <>
<DebounceInput
  autoFocus
  className="px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  placeholder="Search the username here..."
  minLength={4}
  debounceTimeout={500}
  onChange={event => (doNameFilter(event.target.value))}
  required
/>
  <div>
  <Row>
  {searchResult && <User onClick={handlePressed} src={searchResult[0]?.profile_image_url} name={searchResult[0]?.name} css={{ p: 0 }}>
                    @{searchResult[0]?.username}
                    </User> }
  {!searchResult &&  <p>Loading...</p> }    
  </Row>
  </div>
    </>

  )
}

export default SearchObject