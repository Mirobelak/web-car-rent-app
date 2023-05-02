import React from 'react'

type Props = {}

const LoadingSpinner = (props: Props) => {
  return (
    <div className='absolute top-[50%] left-[42%]'><span className="loader"></span></div>
  )
}

export default LoadingSpinner