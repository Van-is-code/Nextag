import React from 'react'

function ProductsItem({id,image, name, price,brand}) {
  return (
    <div className='productsItem' >
      <div style={{backgroundImage: `url(${image})`}}></div>
      <p>{id}</p>
      <h1>{name}</h1>
      <p>${price}</p>
      <p>{brand}</p>
    </div>
  )
}

export default ProductsItem

