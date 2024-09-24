import React from 'react';
// import Instagram from '../assets/Instagram.png';
// import LinkedIn from '../assets/LinkedIn.png';
import '../styles/ProfileCard.css';

const ProfileCard = ({ name, age,occupation, interests, address, linkedin, instagram, imageUrl }) => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='d-flex justify-content-between align-items-start m-lg-5 px-4 border border-primary rounded-3 w-75' style={{ backgroundColor: '#E9FFFA', lineHeight: '3rem' }}>

        {/* Details Container */}
        <div className='py-4 col-lg-7'>
          <div><strong>Name:</strong> {name}</div>
          <div><strong>Age:</strong> {age}</div>
          {/* <div><strong>Location:</strong> {location}</div> */}
          <div><strong>Occupation:</strong> {occupation}</div>
          {/* <div><strong>Interests:</strong> {interests}</div> */}
          <div><strong>Address:</strong> {address}</div>
          {/* <div>
            {linkedin && (
              <div className='d-flex align-items-center'>
                <img src={LinkedIn} alt="LinkedIn" width={40} style={{ paddingRight: "0.5rem" }} />
                <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
              </div>
            )}
            {instagram && (
              <div className='d-flex align-items-center'>
                <img src={Instagram} alt="Instagram" width={40} style={{ paddingRight: "0.5rem" }} />
                <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram Profile</a>
              </div>
            )}
          </div> */}
        </div>

        {/* Image Container */}
        <div className='col-lg-5 p-4'>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              height="300px"
              style={{ borderRadius: '1rem', objectFit: 'cover', width: '100%' }}
            />
          ) : (
            <div className='text-center'>No Image Available</div>
          )}
          <h2 className='text-center main-font my-3'><b>{name}</b></h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
