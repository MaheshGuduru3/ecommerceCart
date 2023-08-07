import React, { useEffect, useState } from 'react'
import '../styles/Header.css'
import {NavLink , Outlet} from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { fetchSearchBar } from '../features/ProductSlice'

const Header = () => {
  const pro1 = useSelector( state => state.productlist )
  const dispatch = useDispatch()
  const [searching, setSearching] = useState("")
  const [show , setShow] = useState(true)
  console.log(show , "show")
  const searchBarHandler = ()=>{
       dispatch(fetchSearchBar(searching))
       console.log(searching)
  }
 
//  console.log(pro1.theme , "redux")   
  
  useEffect(()=>{
    
   
  },[searching])            
  return ( 
    <div className='container-fluid m-0 p-0'>   
       <header className={show ? 'container-fluid p-0 m-0 bg-primary' : 'container-fluid p-0 m-0 bg-dark'}>
            <div className='header_main container-fluid d-flex align-items-center justify-content-between'>  
                
                <div className='header_title'>
                    <h4 className='header_title_text'>MiniCart</h4>
                </div>
                <div className='input-group' id='search_bar_main'>
                    <input type='search' list='dropList'  placeholder='Search...' className='form-control' id='search-bar-input' value={searching} onKeyDown={(e)=>{if(e.key === "Enter"){searchBarHandler()}}} onChange={(e)=>setSearching(e.target.value)}/>

                    <button className='btn btn-secondary' onClick={searchBarHandler} ><i className='bi bi-search'></i></button>
                    <datalist id="dropList" style={{backgroundColor:"red"}}>
                        {  pro1.productsList.products?.map((it)=>(
                          <option value={it.title} key={it.id}> {it.title} </option>
                        ))}  
                    </datalist> 
                  
                </div>
                <div className='cart_icon'>
                    

                    <NavLink to='/cartlist' className='btn link'>
                       <span style={{color:'white'}}><i className='bi bi-cart3 fs-5'></i> <sup className='fs-6'>{pro1.cartProductList.length?pro1.cartProductList.length:""}</sup></span>
                    </NavLink>
                </div>
            </div>
       </header>
       <Outlet />
    </div>
  )
}

export default Header