import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProfileDetail.css'; 

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profiles/${id}`);
        setProfile(response.data);
      } catch (error) {
        setError('Error fetching profile data');
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="profile-detail-container">
      <div className="profile-card">
        <div className="card-body">
          <img
            src={profile.imageUrl || 'https://via.placeholder.com/300'}
            alt={`${profile.name}'s profile`}
            className="profile-image"
          />
          <h1>{profile.name}</h1>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Occupation:</strong> {profile.occupation}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Interests:</strong> {profile.interests}</p>
          <p><strong>LinkedIn:</strong> <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer">View LinkedIn</a></p>
          {profile.instagram && (
            <p><strong>Instagram:</strong> <a href={profile.instagram} target="_blank" rel="noopener noreferrer">View Instagram</a></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
