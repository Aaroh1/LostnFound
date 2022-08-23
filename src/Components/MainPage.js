import React, { useEffect } from 'react'
import './MainPage.css'
import { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Dropdown from 'react-bootstrap/Dropdown';
export default function MainPage() {
  const search = useLocation().search;
  const qparams = new URLSearchParams(search);
  const [allItems, setallItems] = useState([]);
  const [searchValue, setsearch] = useState('');
  const imgpath = 'http://localhost:3001/public/img/';
  const Navigate = useNavigate();
  let itemarray=allItems
  function handleSearchChange() {
    if (!searchValue.length) { return DisplayItemCards(itemarray); }
    else {
      return DisplayItemCards(itemarray.filter((p) => {
        if (((p.type).toLowerCase()).includes(searchValue.toLowerCase()))
          return p
      }))
    }
  }
  async function logout() {
    await axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/Logout",
    });
    Navigate("/", { replace: true });
  }
  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/Home",
    }).then((data) => {
      console.log("HERE")
      if (data.status === 200)
        Navigate(data.data, { replace: true });
    })
  }, [])
  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/getAllItems",
    }).then((data) => {
      console.log(data.data);
      setallItems(data.data);
      // console.log(allItems);
    });
  }, [])
  function DisplayItemCards(filtereditems) {
    return (filtereditems?.map((it) => { return ItemCard(it) }));
  }
  const ItemCard = (itemdata) => {
    return (<Card style={{ width: '20rem', border: "black 1px solid", marginBottom: "7px" }}>
      <Card.Img variant="top" src={imgpath + itemdata.item} style={{ height: '12rem' }} />
      <Card.Body>
        <Card.Title>{itemdata.type}</Card.Title>
        <Card.Text>
          {itemdata.desc}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Found On: {itemdata.date.slice(0, 10)}</ListGroup.Item>
        <ListGroup.Item>Found in: {itemdata.location}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>)
  }
  function sortDef(){
    itemarray=allItems}
  function sortDate(){
    console.log("SortDate")
    itemarray.sort((a, b) => (a.date > b.date) ? 1 : -1)
    console.log(itemarray);
  }
  function sortLoc(){
    console.log("SortLoc")
    itemarray.sort((a, b) => (a.location > b.location) ? 1 : -1)
    console.log(itemarray);
  }
  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.querySelector(".RightSide").style.opacity = "80%";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "70px";
    document.querySelector(".RightSide").style.opacity = "100%";
  }
  return (
    <div>
      <div id="mySidebar" className="sidebar" onMouseOver={openNav} onMouseLeave={closeNav} >
        <a href={`/Home?q=${qparams.get('q')}`}><img className='i' src="https://img.icons8.com/ios/50/000000/home--v1.png" />HOME</a>
        <a href={`/Upload?q=${qparams.get('q')}`}><img className='i' src="https://img.icons8.com/external-those-icons-lineal-those-icons/100/000000/external-Add-notes-those-icons-lineal-those-icons.png" />ADD ITEM</a>
        <a href={`/Dashboard?q=${qparams.get("q")}`}><img className='i' src="https://img.icons8.com/ios-glyphs/90/000000/person-male.png" />USER PAGE</a>
      </div>

      <div className='RightSide' >
        <div className="HorizontalNav">
          <h2>Collapsed Sidebar</h2>
          <Button variant="secondary" onClick={logout}>Logout</Button>{' '}

        </div>

        <div className='DisplayItems'>
          <div className='Filtering' style={{ width: "100%", marginBottom: "5%" }}>
            <div className='SearchBorder'>
              <input className='Search Bar' value={searchValue} placeholder="Type Item Name...." onChange={(e) => { setsearch(e.target.value); }} style={{ width: "350px", height: "50px", borderRadius: "50px", padding: "20px" }} />
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort By
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={sortDate}>Date</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={sortLoc}>Location</Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>
          </div>
          {handleSearchChange()}
        </div>

      </div>

    </div>
  )
}
