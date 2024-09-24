import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard';
import { useNavigate } from 'react-router-dom'; 


const Explore = () => {
  const [profileData, setProfileData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profiles');
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchProfiles();
  }, []);

  const filteredProfileDetails = profileData.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewProfile = (profileId) => {
    navigate(`/profile/${profileId}`);
  };

  return (
    <section id='home'>
      <h1 className='d-flex justify-content-center'>Explore People here</h1>
      <div className='d-flex justify-content-center align-items-center m-5'>
        <input 
          type="search" 
          className='h-25 rounded-3 w-50 fs-6' 
          placeholder="Search people with their name" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='d-flex justify-content-center align-items-center m-lg-5'>
        {filteredProfileDetails.length > 0 ? (
          <table className='custom-table' style={{ backgroundColor: '#c7e9eb', border: '1px solid #c0f1e6' }}>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Detail Information</th>
                <th>Address on Map</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfileDetails.map((profile, index) => (
                <tr key={index}>
                  <td>
                    <ProfileCard 
                      name={profile.name}
                      age={profile.age}
                      occupation={profile.occupation}
                      interests={profile.interests}
                      address={profile.address}
                      linkedin={profile.linkedin}
                      instagram={profile.instagram}
                      imageUrl={profile.imageUrl}  
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className='btn btn-primary' 
                      onClick={() => handleViewProfile(profile.id)}
                    >
                      View
                    </button>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${profile.address}`} target="_blank" rel="noopener noreferrer">
                      <button className='btn btn-warning'>Summary<br/>(Open Map)</button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No people found with that name</p>
        )}
      </div>
    </section>
  );
};

export default Explore;
