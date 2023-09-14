import React from 'react'
import '../../styles/error.css'

export default function ErrorPage() {
  return (
    <div className='error-wrapper'>
      <div className='image'>X</div>
      <p>You are accessing an invalid route. Check your address again.</p>
    </div>
  )
}
