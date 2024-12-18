import React, { useState } from 'react'
import axios from 'axios'

function UploadFile() {

  const [file, setFile] = useState(null)
  // const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.prevendDefault();
  }

  return (
    <>
      <Form>

      </Form>
    </>
  )
}

export default UploadFile