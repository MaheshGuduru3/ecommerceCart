import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/CartList.css'
import { filterPart } from '../../features/ProductSlice';
import logoGif from '../../img/animation_lkwflcqg_small.gif'
const CartList = () => {
   let total = 0 ;
  const pro1 = useSelector( state => state.productlist )
  const dispatch = useDispatch() 
  const [page1 , setPage1] = useState(1)

  const removeItemsHandler = (id)=>{
     const filter = pro1.cartProductList.filter((i)=> i.id != id)
    dispatch(filterPart(filter))
     
  }
    
   for(let i=0;i<pro1.cartProductList.length;i++){
         total += pro1.cartProductList[i].price   
   }
   useEffect(()=>{

   },[dispatch])
  return (  
    <div className='container-fluid p-0'>
          <div className='container-fluid p-0'>
                 <div className='container p-0 d-flex cart'>

                     { pro1.cartProductList.length > 0 ?
                      <>
                          <div className='leftpart_cartlist'>
                             <div className='row m-0'>
                                 { pro1.cartProductList.slice((page1)*3-3,page1*3).map((itm)=>(

                                    <div className='col-12 col-md-10 g-2' id='box_cart'>
                                      <div className='card d-flex flex-row '>
                                        <img  src={itm.thumbnail}  width='160px' height='160px'/>
                                        <div className='card-body d-flex flex-row justify-content-between align-items-center'>
                                          <div className='card-title'>
                                              <p className='mb-0'>{itm.title}</p>
                                              <p className='mb-0'>price : {itm.price}</p> 
                                              <p>rating : {itm.rating}</p> 
                                          </div>
                                        
                                          <div>
                                            <button className='btn btn-danger' onClick={()=>removeItemsHandler(itm.id)}><i className='bi bi-trash3'></i></button>
                                          </div>
                                        </div>
                                       </div>
                                    </div>
                                 

                                 ))}


                                <div className='container d-flex flex-row justify-content-center mt-1'>
                                  <nav aria-label="Page navigation example">
                                      <ul class="pagination" onClick={(e)=>setPage1(e.target.innerText)}> 
                                           {   
                                             [...Array(Math.ceil(pro1.cartProductList?.length/3))].map((_,i)=>(
                                               <li className='page-item'><a className='btn page-link'   id={ page1 == (i+1) ? "selected" : " "}>{i+1}</a></li>
                                             ))
                                           }
                                      </ul>
                                    </nav>
                                  </div>
                             </div>
                        </div>
                        <div className='rightpart_cartlist'>
                             <div className='shadow p-2 '>
                                <h4>Purchased Items</h4>
                                <p>Total Amount: ${total}</p>
                               
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#orderModal">
                                  Place Order
                                </button>

                             
                                <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ordered</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div class="modal-body text-center">
                                         <img  src={logoGif}  width='150px' height='150px' />
                                         <h4>Thank You For Ordering</h4>
                                         <p>Your Order is Placed Successfully</p>
                                      </div>
                                      <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> 
                        </div>      
                     
                     </> :
                      <div className='container p-0'>
                     
                       <div className='alert alert-secondary'>Empty Cart</div>
                     
                     </div>}
                     
                     
                 </div>
          </div>
    </div>
  )
}

export default CartList