import React, { useEffect , useState } from 'react'
import '../styles/Productview.css'
import { useDispatch  , useSelector} from 'react-redux'
import { fetchCartList, fetchFilter, fetchProducts, filterPart } from '../features/ProductSlice'


const ProductsView = () => {
  const pro = useSelector( state => state.productlist)
  const dispatch = useDispatch()
  const [catergories , setCatergories] = useState([])  
  const [renderTrue , setRenderTrue] = useState(false)
  const [page , setPage]  = useState(1)
  const removeItemsHandler1 = (id)=>{
    const filter = pro.cartProductList.filter((i)=> i.id != id)
    dispatch(filterPart(filter))
    
  }
  const cartAddHandler = (id)=>{
    dispatch(fetchCartList(id))
  }
 useEffect(()=>{   
  setRenderTrue(true)
   dispatch(fetchProducts()) 
    if(catergories.length > 0){
      dispatch(fetchFilter( catergories ))                                                            
    }
 },[catergories])     
 
 
  
  return (    
    <div className='container-fluid p-0'>                
             <div className='container-fluid p-0'>          
                 <div className='container p-0 d-flex'>
                      <div className='left_part'> 
                          <div style={{padding:"1rem"}}>
                            <h5><span><i class="bi bi-filter-circle-fill"></i></span>Filter</h5>
                            <div>
                               <h4>Categories</h4>        
                               <div onChange={(e)=>{setCatergories(e.target.nextElementSibling.innerText);console.log(e)}}>    
                               <div className="form-check">
                                  <input className="form-check-input" type="radio"  name="radioname"  id="radiobox1" />
                                  <label className="form-check-label" for="radiobox1">
                                    smartphones     
                                   </label>  
                                </div>   
                                <div className="form-check">     
                                  <input className="form-check-input" type="radio"  name="radioname" id="radiobox2" />
                                   <label className="form-check-label" for="radiobox2">
                                   home-decoration
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="radioname"  id="radiobox3" />
                                  <label className="form-check-label" for="radiobox3">
                                    groceries
                                  </label>                    
                                </div>              
                                <div className="form-check">
                                  <input className="form-check-input" type="radio"  name="radioname" id="radiobox4" />
                                  <label className="form-check-label" for="radiobox4">
                                    furniture
                                  </label>
                                 </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="radioname"  id="radiobox5" />
                                  <label className="form-check-label" for="radiobox5">
                                    skincare
                                  </label>   
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio"  name="radioname" id="radiobox6" />
                                  <label className="form-check-label" for="radiobox6">
                                    mens-shirts
                                  </label>     
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="radioname"  id="radiobox7" />
                                  <label className="form-check-label" for="radiobox7">
                                    womens-jewellery 
                                  </label>
                                </div>
                                <button className='btn btn-danger' onClick={(e)=>{window.location.reload()}}>clearFilter</button>
                               </div>
                            </div>
                          </div>      
                      </div>   
                      <div className='right_part flex-2'>                    
                          <div className='container'>  
                              
                              <div className='container d-sm-flex d-md-none flex-column p-3'>
                                 <select className='form-select' onChange={(e)=>setCatergories(e.target.value)}>
                                     <option value="filter"  disabled selected>FilterBy</option>
                                     <option value="smartphones">smartphones</option>
                                     <option value="home-decoration">home-decoration</option>
                                     <option value="groceries">groceries</option>
                                     <option value="furniture">furniture</option>
                                     <option value="skincare">skincare</option>
                                     <option value="mens-shirts">mens-shirts</option>
                                     <option value="womens-jewellery">womens-jewellery</option>
                                 </select>
                                 <button className='btn btn-danger mt-2' onClick={()=>window.location.reload()}>ClearFilter</button>
                              </div>
                              
                              

                               <>

                                  { pro.loading ? <>
                                           
                                                 
                                    <div className='container text-center'>
                                        <div className='spinner-border text-primary'>

                                        </div>
                                    </div>
                                 
                                
                                  </>
                                  : pro.error ? <>
                                  
                                  
                                      <div className='container'>
                                          <div className="alert alert-danger">
                                                 Error is occured,please try after sometime 
                                          </div>
                                      </div>
                                  
                                  </>

                                  :
                                  
                                  <div className='row' style={{rowGap:'1rem'}} id='cols'>
                                  {         
                                    pro.productsList.products?.slice((page)*8-8,(page)*8).map((itm)=>(               
                                    <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4  col-xl-3'  key={itm.id}>
                                      <div className="card"  id='card-main' >   
                                          <img src={itm.thumbnail} alt="sv"  id='card-img'/>   
                                          <div className="card-body">
                                            <h5 className="card-title" style={{height:'1.8rem',overflow:'hidden'}}>{itm.title}</h5>
                                            <p className="card-text">
                                              <p style={{marginBottom:"0"}}>Price:${itm.price}</p>    
                                              <p style={{marginBottom:"0"}}>Rating:{itm.rating}</p>    
                                            </p>
                                           
                                          </div>             
                         
                                        </div>
                                        <div>
                                         {
                                           pro.cartProductList.find((pr)=> pr.id === itm.id) ? <>
                                           <button className='btn btn-danger' onClick={()=>removeItemsHandler1(itm.id)}>Remove From Cart</button>
                                           </>
                                           :
                                           <>

                                           <button className='btn btn-primary' onClick={()=>cartAddHandler(itm.id)}>Add To Cart</button>
                                           </>                                             
                                         }                                        
                                        </div>
                                      </div>
                                  ))
                                  }

                                  <div className='container d-flex flex-row justify-content-center mt-1'>
                                  <nav aria-label="Page navigation example">
                                      <ul class="pagination" onClick={(e)=>setPage(e.target.innerText)}> 
                                           { 
                                              
                                              <>
                                              { renderTrue &&  [...Array(Math.ceil(pro.productsList.products?.length/8))].map((_,i)=>(
                                               <li className='page-item'><a className='btn page-link'   id={ page == (i+1) ? "selected" : " "}>{i+1}</a></li>
                                               ))}
                                              
                                              
                                              </>
                                             
                                            
                                           }
                                      </ul>
                                    </nav>
                                  </div>
                                  </div>
                                  }
                               </>
                          </div>
                      </div>
                 </div>
            </div>
    </div>
  )
}

export default ProductsView