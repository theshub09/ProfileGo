import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isAdminLoggedIn) {
      navigate('/admin-login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profiles');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchProfiles();
  }, []);

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required').positive().integer(),
    occupation: Yup.string().required('Occupation is required'),
    address: Yup.string().required('Address is required'),
    imageUrl: Yup.string().url('Invalid URL format').required('Image URL is required'),
    linkedIn: Yup.string().url('Invalid URL format').required('LinkedIn URL is required'),
    instagram: Yup.string().url('Invalid URL format'),
    interests: Yup.string().required('Interests are required'),
  });

  const handleSaveProfile = async (values, { resetForm }) => {
    try {
      if (editingProfile) {
        const response = await axios.put(
          `http://localhost:5000/profiles/${editingProfile.id}`,
          values
        );
        setProfiles(
          profiles.map((profile) =>
            profile.id === editingProfile.id ? response.data : profile
          )
        );
        setEditingProfile(null);
        toast.success('Profile updated successfully!');
      } else {
        const response = await axios.post('http://localhost:5000/profiles', values);
        setProfiles([...profiles, response.data]);
        toast.success('Profile added successfully!');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Error saving profile.');
    }
  };

  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
  };

  const handleDeleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/profiles/${id}`);
      setProfiles(profiles.filter((profile) => profile.id !== id));
      toast.success('Profile deleted successfully!');
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast.error('Error deleting profile.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/'); // Redirect to homepage or login page
  };

  return (
    <div className="admin-panel">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <Formik
        initialValues={{
          name: editingProfile ? editingProfile.name : '',
          age: editingProfile ? editingProfile.age : '',
          occupation: editingProfile ? editingProfile.occupation : '',
          address: editingProfile ? editingProfile.address : '',
          imageUrl: editingProfile ? editingProfile.imageUrl : '',
          linkedIn: editingProfile ? editingProfile.linkedIn : '',
          instagram: editingProfile ? editingProfile.instagram : '',
          interests: editingProfile ? editingProfile.interests : '',
        }}
        validationSchema={ProfileSchema}
        enableReinitialize
        onSubmit={handleSaveProfile}
      >
        {({ errors, touched }) => (
          <Form>
            {/* Form fields */}
            {Object.keys(ProfileSchema.fields).map((field) => (
              <div className="form-group" key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <Field
                  name={field}
                  className="form-control"
                  type={field === 'age' ? 'number' : 'text'}
                />
                {errors[field] && touched[field] ? (
                  <div className="error">{errors[field]}</div>
                ) : null}
              </div>
            ))}
            <button type="submit" className="btn btn-primary">
              {editingProfile ? 'Update Profile' : 'Add Profile'}
            </button>
          </Form>
        )}
      </Formik>

      <h2 className="mt-4">Profile List</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Occupation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.name}</td>
              <td>{profile.age}</td>
              <td>{profile.occupation}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => handleEditProfile(profile)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteProfile(profile.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
