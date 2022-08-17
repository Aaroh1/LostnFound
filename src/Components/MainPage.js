import React, { useEffect } from 'react'
import './MainPage.css'
import { useState } from 'react';
import axios from 'axios';
export default function MainPage() {
    const [allItems,setallItems]=useState({});
    useEffect(()=>{
        axios({
            method:"get",
            withCredentials: true,
            url:"http://localhost:3001/getAllItems",
              }).then((data)=>{
                console.log(data.data[1]);
                setallItems(data.data);
              })
    },[])
    
    function openNav() {
        document.getElementById("mySidebar").style.width = "250px";
      }
      
      function closeNav() {
        document.getElementById("mySidebar").style.width = "70px";
      }
    return (
        <div>
            <div id="mySidebar" className="sidebar" onMouseOver={openNav} onMouseLeave={closeNav}>
            <a href="#"><img className='i' src="https://img.icons8.com/ios/50/000000/home--v1.png"/>HOME</a>
                <a href="/Upload"><img className='i'   src="https://img.icons8.com/external-those-icons-lineal-those-icons/100/000000/external-Add-notes-those-icons-lineal-those-icons.png"/>ADD ITEM</a>
                <a href="#"><img className='i' src="https://img.icons8.com/ios-glyphs/90/000000/person-male.png"/>USER PAGE</a>
            </div>

            <div className="HorizontalNav">
                <h2>Collapsed Sidebar</h2>
            </div>

            <div className='DisplayItems'></div>
        </div>
    )
}
