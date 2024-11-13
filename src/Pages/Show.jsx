import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { touristlist, deletetourist } from './apicall'
import { useQuery } from '@tanstack/react-query'
import Wrapper from '../Common/Wrapper'

const Show = () => {

    const getTourist = async () => {
        const response = await touristlist();
        console.log("Get response...", response);
        return response
    }

    const { isLoading, isError, data: touristdata, refetch } = useQuery({
        queryKey: ['touristdata'],
        queryFn: getTourist
    })

    // Make Handle For Delete (Start)
    const handleDelete = async (id) => {
        const response = await deletetourist(id);
        console.log("Delete response...", response);
        refetch()
    }
    // Make Handle For Delete (End)

    if (isLoading) {
        return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Loading...</h1>
    }

    if (isError) {
        return <h1>Error </h1>
    }

    return (
        <>
            <Wrapper>
                <div
                    style={{
                        maxWidth: '1000px',
                        margin: '0 auto',
                        marginTop: '100px',
                        padding: '20px',
                        backgroundColor: '#ffffff',
                        borderRadius: '15px',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h2
                        style={{
                            textAlign: 'center',
                            color: '#17a2b8',
                            marginBottom: '20px',
                            fontSize: '32px',
                            fontWeight: 'bold',
                        }}
                    >
                        Tourist List
                    </h2>

                    {/* Enhanced Bootstrap Table */}
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead style={{ backgroundColor: '#343a40', color: '#ffffff' }}>
                                <tr>
                                    <th scope="col">SLNO</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(touristdata) && touristdata.slice(0, touristdata.length).reverse()?.map((value, index) => (
                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef' }}>
                                        <th scope="row" style={{ textAlign: 'center' }}>{index + 1}</th>
                                        <td>
                                            <img
                                                src={`${process.env.REACT_APP_BASE_URL}${value?.image}`}
                                                alt="Tourist"
                                                style={{
                                                    height: '60px',
                                                    width: '60px',
                                                    borderRadius: '10px',
                                                    objectFit: 'cover',
                                                    border: '2px solid #17a2b8',
                                                }}
                                            />
                                        </td>
                                        <td style={{ fontWeight: '500', color: '#007bff' }}>{value?.name}</td>
                                        <td>{value?.phone}</td>
                                        <td>{value?.city}</td>
                                        <td>{value?.address}</td>

                                        <td style={{ textAlign: 'center' }}>
                                            <button
                                                onClick={() => handleDelete(value._id)}
                                                className="btn btn-outline-danger btn-sm"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '5px 10px',
                                                    borderRadius: '20px',
                                                    fontSize: '14px',
                                                    transition: 'all 0.3s',
                                                }}
                                            >
                                                <DeleteIcon style={{ marginRight: '5px' }} />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Wrapper>
        </>
    )

}
export default Show
