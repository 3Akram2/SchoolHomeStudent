import React from 'react'

function ImageHolder({image,alt}) {
  return (
    <div>
        <img src={image} alt={alt} style={{width:'80%',display:'block' ,margin:"auto"}}/>
    </div>
  )
}

export default ImageHolder