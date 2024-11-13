import { myendpoints } from "../endpoint/endpoint"
import axiosInstance from '../api/api'
import { toast } from "react-toastify";

// Fetching dashboard 
export const fetchDashboard = async () => {
    try {
        const apiurl = myendpoints[2];
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching dashboard data...", response);
        return response?.data?.user
    } catch (error) {
        console.log("Error fetching dashboard data...", error);

    }
}

// Fetching Add data 
export const addtourist = async (data) => {
    try {
        const apiurl = myendpoints[3];
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching add data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching add data", error);
        toast.error(error?.response?.data?.errors[0]);
    }
}

// Fetching read data 
export const touristlist = async () => {
    try {
        const apiurl = myendpoints[4];
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching get data...", response);
        return response?.data?.tourists
    } catch (error) {
        console.log("Error fetching add data", error);
    }
}

// Delete Function 
export const deletetourist = async (id) => {
    try {
        const apiurl = `${myendpoints[5]}/${id}`
        const response = await axiosInstance.delete(apiurl)
        console.log("Fetching Delete data...", response);
        toast.warn(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching Delete data...", error);
    }
}

// Forget Password 
export const forgetpassword = async (data) => {
    try {
        const apiurl = myendpoints[6];
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching forget data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching forget data", error);
        toast.error(error?.response?.data?.message);
    }
}

// Update Password 
export const updatepassword = async (data) => {
    try {
        const apiurl = myendpoints[7];
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching update data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching update data", error);
        toast.error(error?.response?.data?.message);
    }
}

// Delete Account 
export const deleteaccount = async (data) => {
    try {
        const apiurl = myendpoints[8];
        const response = await axiosInstance.post(apiurl,data);
        console.log("Fetching delete data...", response);
        toast.warn(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching update data", error);
        toast.error(error?.response?.data?.message);
    }
}