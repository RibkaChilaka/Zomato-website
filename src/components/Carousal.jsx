import React from 'react'
import './Carousal.css'

export default function Carousal() {
    return (
        <div class="topsection">
            <div class="logo">e!</div>
            <h1 class="heading1">Find the best restaurent, cafes, and bars</h1>
            <div class="search msearch">
                <div>
                    <select class="cities">
                        <option disabled selected>---selct your city---</option>
                        <option>mumbai</option>
                        <option>chennai</option>
                        <option>hyderabad</option>
                        <option>bangalore</option>
                        <option>delhi</option>
                    </select>
                </div>
                <div class="search-box">
                    <i class="fa-solid fa-magnifying-glass searchicon"></i>
                    <input class="searchinput" type="text" placeholder="search for restaurents" />
                </div>
            </div>
        </div>
    )
}
