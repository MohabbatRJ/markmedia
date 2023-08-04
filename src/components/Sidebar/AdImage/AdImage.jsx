import React from 'react'

function AdImage({ image }) {
  return (
    <>
      <div className="banner-img">
        <img src={image} alt="" className="img-fluid" />
      </div>
    </>
  )
}

export default AdImage
