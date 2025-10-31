import React from 'react'

function Editnotes() {
  // -------------- Edit the notes and title -----------------
  return (
    <div className='bg-black w-full h-screen flex flex-col items-center align-middle justify-center'>
      <div className='w-[60%] h-[70%] p-5 bg-gray-800 rounded-2xl'>
        <form action="">
          <div>
            <input type="text"  />
            <input type="text" />
          </div>
          <div>
            <button>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Editnotes
