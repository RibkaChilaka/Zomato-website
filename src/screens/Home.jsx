import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import bgImage from '../image/bgImage.png'


export default function Home() {

  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      }
    })
    response = await response.json()
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response)
    // console.log(response[0], response[1]);
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <div><Navbar /></div>
      <div>
      <img src={bgImage} style={{position:'absolute', objectFit:'cover', width:'100%'}}/>
      </div>
      <div>
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} style={{position:'relative', zIndex:'10', marginTop:'280px', marginBottom:'70px', width:'70%', marginLeft:'15%'}}/>
      </div>
      <div className='container'>
        {
          foodCat != []
            ? foodCat.map((data) => {
              return (<div className='row mb-3'>
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem != []
                  ?
                  foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItem={filterItems}
                            options={filterItems.options[0]}
                             />
                        </div>
                      )
                    })
                  : <div>No such data found</div>}
              </div>
              )
            }) : <div>""""""""""""</div>
        }
      </div>
      <div><Footer /></div>
    </>
  )
}
