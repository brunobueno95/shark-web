// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom';
const Shark = () => {
    const { id } = useParams();
    const [shark, setShark] = useState();
  
  useEffect(() => {
    fetchSharks();
  }, []);

  const fetchSharks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/sharks/${id}`);
      setShark(response.data);
    } catch (error) {
      console.error('Error fetching sharks:', error);
    }
  };
   
  return (
    <div style={{height:"100vh", width:"100vw", backgroundColor:"rgba(0, 0, 0, 0.616)",backdropFilter:"blur(2px)", margin:"0",display:"flex", flexDirection:"column",}}>
     <h1 style={{fontSize:"60px", color:"white",margin:"30px  auto 0"}}> {shark? shark.commonName : "not found"}</h1> 
     <h2 style={{fontSize:"40px", color:"white",margin:"0 auto", fontStyle:"italic"}}> {shark? shark.specie : "not found"}</h2>
    </div>
  )
}

export default Shark
