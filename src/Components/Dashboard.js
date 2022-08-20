import React, { useEffect, useState } from 'react'
import './Dashboard.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { CCard, CRow, CCol, CCardImage, CCardBody, CCardTitle, CCardText } from '@coreui/react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Dashboard() {
  const [userItems, setuserItems] = useState([]);
  const search = useLocation().search;
  const qparams = new URLSearchParams(search);
  const imgpath='http://localhost:3001/public/img/';
  useEffect(() => {
    axios({
      mehod: "GET",
      withCredentials: true,
      url: "http://localhost:3001/Dashboard",
      params: { email: qparams.get("q") }
    }).then((data) => setuserItems(data.data));
  })
  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("mySidebar").style.opacity = "90%";
    document.querySelector(".RightSide").style.marginLeft = "250px";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "70px";
    document.getElementById("mySidebar").style.opacity = "100%";
    document.querySelector(".RightSide").style.marginLeft = "70px";
  }
  const ItemCard = (data) => {
    return (<div className='Card'>
      <CCard className="mb-3 border-dark" style={{ width: '440px', height:"200px"}}>
        <CRow className="g-0">
          <CCol md={4}>
            <CCardImage src={imgpath+data.item} style={{ width:"180px", height:"200px"}}/>
          </CCol>
          <CCol md={6}>
            <CCardBody>
              <CCardTitle>{data.type}</CCardTitle>
              <CCardText>
                {data.desc}
              </CCardText>
              <CCardText>
                <small className="text-medium-emphasis">Found on {data.date.slice(0,10)} in {data.location}</small>
              </CCardText>
            </CCardBody>
          </CCol>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </CRow>
      </CCard>
    </div>)
  }
  function DisplayItemCards()
    {
      return(userItems?.map((it)=>{return ItemCard(it)}));
    }

  return (

    <div>
      <div id="mySidebar" className="sidebar" onMouseOver={openNav} onMouseLeave={closeNav} >
        <a href="#"><img className='i' src="https://img.icons8.com/ios/50/000000/home--v1.png" />HOME</a>
        <a href={`/Upload?q=${qparams.get('q')}`}><img className='i' src="https://img.icons8.com/external-those-icons-lineal-those-icons/100/000000/external-Add-notes-those-icons-lineal-those-icons.png" />ADD ITEM</a>
        <a href="#"><img className='i' src="https://img.icons8.com/ios-glyphs/90/000000/person-male.png" />USER PAGE</a>
      </div>

      <div className='RightSide' >
        <div className="HorizontalNav">
          <h2>Collapsed Sidebar</h2>
        </div>

        <div className='DisplayUserItems'> {DisplayItemCards()} </div>

      </div>

      
    </div>
  )
}
