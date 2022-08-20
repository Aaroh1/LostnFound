import React, { useEffect } from 'react'
import './MainPage.css'
import { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate,useLocation } from 'react-router-dom';
export default function MainPage() {
    const search=useLocation().search;
    const qparams=new URLSearchParams(search);
    const [allItems,setallItems]=useState([]);
    const imgpath='http://localhost:3001/public/img/';
    const Navigate=useNavigate();
    useEffect(()=>{
      axios({
        method:"get",
        withCredentials: true,
        url:"http://localhost:3001/Home",
      }).then((data)=>{
        console.log("HERE")
        if(data.status===200)
        Navigate(data.data,{replace:true});
      })
    },[])
    useEffect(()=>{
        axios({
            method:"get",
            withCredentials: true,
            url:"http://localhost:3001/getAllItems",
              }).then((data)=>{
                console.log(data.data);
                setallItems(data.data);
                // console.log(allItems);
              });
    },[])
    function DisplayItemCards()
    {
      return(allItems?.map((it)=>{return ItemCard(it)}));
    }
    const ItemCard=(itemdata)=>{
    return(<Card style={{ width: '20rem', border:"black 1px solid"}}>
      <Card.Img variant="top" src={imgpath+itemdata.item} style={{ height: '12rem'}} />
      <Card.Body>
        <Card.Title>{itemdata.type}</Card.Title>
        <Card.Text>
        {itemdata.desc}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Found On: {itemdata.date.slice(0,10)}</ListGroup.Item>
        <ListGroup.Item>Found in: {itemdata.location}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>)
    }
    function openNav() {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("mySidebar").style.opacity ="90%";
        document.querySelector(".RightSide").style.marginLeft = "250px";
      }
      
      function closeNav() {
        document.getElementById("mySidebar").style.width = "70px";
        document.getElementById("mySidebar").style.opacity ="100%";
        document.querySelector(".RightSide").style.marginLeft = "70px";
      }
    return (
        <div>
            <div id="mySidebar" className="sidebar"  onMouseOver={openNav} onMouseLeave={closeNav} >
            <a href="#"><img className='i' src="https://img.icons8.com/ios/50/000000/home--v1.png"/>HOME</a>
                <a href={`/Upload?q=${qparams.get('q')}`}><img className='i'   src="https://img.icons8.com/external-those-icons-lineal-those-icons/100/000000/external-Add-notes-those-icons-lineal-those-icons.png"/>ADD ITEM</a>
                <a href={`/Dashboard?q=${qparams.get("q")}`}><img className='i' src="https://img.icons8.com/ios-glyphs/90/000000/person-male.png"/>USER PAGE</a>
            </div>

            <div className='RightSide' >
                <div className="HorizontalNav">
                <h2>Collapsed Sidebar</h2>
                </div>

            <div className='DisplayItems'>{DisplayItemCards()}</div>
            
            </div>
            
        </div>
    )
}
