import React from 'react'
import SingleCard from '../../common/SingleCard'
import image from '../../../assets/images/website/about/ab-team.png'
import { FaLinkedin } from "react-icons/fa";
import AboutTeamCard from '../../common/AboutTeamCard';

const AboutTeam = () => {
  const AboutTeamData = [
    {
      id: 1,
      img: image,
      title: 'Pankaj Kumar',
      subtitle: 'Founder',
      socialIcon: <FaLinkedin size={30} className='text-webprimary' />

    },
    {
      id: 2,
      img: image,
      title: 'Ravi Rai',
      subtitle: 'Founder',
      socialIcon: <FaLinkedin size={30} className='text-webprimary' />
    },
    {
      id: 3,
      img: image,
      title: 'Ravi Rai',
      subtitle: 'Founder',
      socialIcon: <FaLinkedin size={30} className='text-webprimary' />
    },
    {
      id: 4,
      img: image,
      title: 'Ravi Rai',
      subtitle: 'Founder',
      socialIcon: <FaLinkedin size={30} className='text-webprimary' />
    },
  ]
  return (
    <>
      <section className='space-top'>
        <div className="container">
          <h2 className='text-xl md:text-3xl pb-5 sm:pb-6 '>
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" >
            {AboutTeamData.map((card) => (
              <AboutTeamCard data={card} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutTeam
