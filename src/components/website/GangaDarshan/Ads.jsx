import React from 'react'
import ads from '../../../assets/images/website/ganga-darshan/ads.jpg'

const Ads = () => {

  return (
    <section className='space-top'>
      <div className="container mx-auto">
        <h2 className='text-xl md:text-3xl pb-2'>Ads Name</h2>
        <p>Sponsored Ads</p>
        <div className='mt-5 mx-auto flex justify-center max-w-[800px] overflow-hidden'>
          <img src={ads ? ads : null} alt="ads" />
        </div>
      </div>

    </section>
  )
}

export default Ads
