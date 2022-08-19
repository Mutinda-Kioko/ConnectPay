import React from 'react'
import { Modal, Button, Text,} from "@nextui-org/react";
import SearchObject from "./SearchObject"

function SearchBar({sendTo,setSendTo}) {
 const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <div className="container flex mx-auto my-2">
    <div className="flex border-2 rounded" onClick={handler}>
        <button className="flex items-center justify-center px-4 border-r">
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
                </path>
            </svg>
        </button>
        <input type="text" className="px-4 py-2 w-80" placeholder="Search a user..." disabled/>
    </div>
    <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>Search a user</Text>
        </Modal.Header>
        <Modal.Body>
          <SearchObject sendTo={sendTo} setSendTo={setSendTo} visible={visible} setVisible={setVisible}/>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
</div>
  )
}

export default SearchBar