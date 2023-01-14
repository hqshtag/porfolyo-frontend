import React, { useEffect, useState } from 'react'
import PortfolioServices from '../../services/PortfolioServices';
import { blobToBase64 } from '../utils/functions';

const Portfolio = ({portfolio}) => {

    const imagesRender = portfolio?.photos.map((img, k)=>{   
        const src = `http://localhost:3100/portfolio/${portfolio._id}/image/${k+1}`;     
        return (<img src={src} key={k} alt=""/>)
    })

  return (
    <div>
        <div>
            <h3>{portfolio.title}</h3>
            <p className='details'>{portfolio.description}</p>
        </div>
        {imagesRender}
    </div>
  )
}

export default Portfolio