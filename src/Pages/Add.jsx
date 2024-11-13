import React, { useState } from 'react';
import Wrapper from '../Common/Wrapper';
import { addtourist } from './apicall';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Add = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {

    setLoading(true);

    // Handling Form Data 
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("phone", data.phone);
    formdata.append("city", data.city);
    formdata.append("address", data.address);
    formdata.append("image", image);

    try {
      const response = await addtourist(formdata)
      console.log("Create Response...", response);
      if (response && response?.status === 201) {
        reset()
        setImage('')
         navigate('/show')
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setLoading(false)
    }
  }

  return (
    <>
      <Wrapper>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '150vh',
          backgroundColor: '#f0f0f0'
        }}>
          <form style={{
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            width: '400px'
          }}
            onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{
              textAlign: 'center',
              marginBottom: '20px',
              color: '#333'
            }}>Add Tourist</h2>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}>Name</label>
              <input
                placeholder="Enter your name"
                type="text"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }}
                {...register('name')}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}>Phone</label>
              <input
                type="number"
                placeholder="Enter your phone number"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }}
                {...register('phone')}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}>City</label>
              <input
                type="text"
                placeholder="Enter your city"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }}
                {...register('city')}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}>Address</label>
              <textarea
                placeholder="Enter your address"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                  resize: 'none'
                }}
                rows="4"
                {...register('address')}
              ></textarea>
            </div>

            {/*This form section is for the submit image*/}
            <div style={{ marginBottom: '20px' }}>
              <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />

              {image !== "" && image !== undefined && image !== null ? (
                <img style={{ height: "180px" }} src={URL.createObjectURL(image)} alt="" className="upload-img" />
              ) : (
                <>{image === "" && <p style={{ color: 'white' }}>Drag or drop content here</p>}</>
              )}
            </div>
            {/*Image area end*/}

            <button type="submit" style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#007BFF',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </form>
        </div>
      </Wrapper>
    </>
  );
};

export default Add;
