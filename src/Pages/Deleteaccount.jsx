import React, { useState } from 'react';
import Wrapper from '../Common/Wrapper';
import { deleteaccount } from './apicall';
import { useForm } from 'react-hook-form'; // Import useForm hook 
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Auth/authslice';

const Deleteaccount = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm(); // Define in State

  // Function For Mutation
  const mydelete = async (data) => {

    const mydeletedata = {
      password: data.password
    }

    const response = await deleteaccount(mydeletedata)
    console.log("My Forget response is ", response);
    if (response && response?.data?.success === true) {
      reset();
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("image");
      dispatch(logout())
      navigate('/login');
      setLoading(false)
    } else {
      setLoading(false)
    }
  };

  // Start Mutation Area
  const mutation = useMutation({
    mutationFn: (data) => mydelete(data),
  });


  // Handle On Submit Area
  const onSubmit = (data) => {
    mutation.mutate(data);
    setLoading(true)
  };

  // Inline CSS styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif',
  };

  const formStyle = {
    width: '300px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    backgroundColor: '#fff',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#dc3545',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  };


  return (
    <>
      <Wrapper>
        <div style={containerStyle}>
          <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
            <h2 style={headingStyle}>Delete Your Account</h2>
            <p style={{ textAlign: 'center', color: '#6c757d' }}>
              Please enter your password to confirm account deletion.
            </p>
            <input
              type="password"
              placeholder="Enter your password"
              style={inputStyle}
              required
              {...register('password')}
            />
            <button type="submit" style={buttonStyle}>
              {loading ? 'Please wait...' : 'Delete Account'}
            </button>
          </form>
        </div>
      </Wrapper>
    </>
  );
};

export default Deleteaccount;
