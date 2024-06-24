import React from 'react'
import { Link } from 'react-router-dom'
import BannerIamge from "../assets/banner.webp"
import '../style/Home.css'

function Home() {
  return (
    <div className='home' style={{backgroundImage: `url(${BannerIamge})`}}>
      <div className='headerContainer'>
        <h1>Genuine Wallet</h1>
        <br/>
        <p>WORLD'S LEADING WALLET</p>
        <Link to='/products'>
          <button>BUY NOW</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
