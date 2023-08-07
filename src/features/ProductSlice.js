import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    productsList : [],
    loading:false,
    error:false,
    cartProductList:  [], 

}
  
export const fetchProducts = createAsyncThunk('fetch/productlist', async ()=>{
     const result = await axios.get(process.env.REACT_APP_FETCHPRODUCTS)
     return result.data
})
   
export const fetchCartList = createAsyncThunk('fetch/cartlist' , async (userid)=>{
     const result = await axios.get( process.env.REACT_APP_FETCHCARTLIST  + userid)
     return result.data
})


export const fetchSearchBar = createAsyncThunk('fetch/searchbar' , async (catergory)=>{
      const result = await axios.get( process.env.REACT_APP_FETCHSEARCHBAR + catergory)
      return result.data
})   

export const fetchFilter = createAsyncThunk('fetch/filter' , async (name)=>{
     const result = await axios.get( process.env.REACT_APP_FETCHFILTER + name)
     return result.data
})

const ProductSlice = createSlice({
     name:"product",
     initialState,
     reducers:{
           filterPart : (state, action)=>{
              state.cartProductList = action.payload
           },
     },
     extraReducers:(builder)=>{
         builder 
         .addCase(fetchProducts.pending , (state,action)=>{
               state.loading = true
         })
         .addCase(fetchProducts.fulfilled , (state,action)=>{
               state.loading = false
               state.error = false
               state.productsList = action.payload
         })
         .addCase(fetchProducts.rejected , (state, action)=>{
               state.error = true
               state.loading = false
         })
         .addCase(fetchCartList.pending , (state, action)=>{
              state.loading = false
         })
         .addCase(fetchCartList.fulfilled , (state,action)=>{
                 state.cartProductList = [...state.cartProductList , action.payload]
                 state.loading = false
                 state.error = false
                // localStorage.setItem('cartProductList' , JSON.stringify(state.cartProductList))
         })
         .addCase(fetchCartList.rejected , (state,action)=>{
                state.error = true
                state.loading = false
         })
         .addCase(fetchSearchBar.pending , (state,action)=>{
               state.loading = true
         })
         .addCase(fetchSearchBar.fulfilled , (state, action)=>{
            state.loading = false    
            state.error = false
            state.productsList = action.payload
         })
         .addCase(fetchSearchBar.rejected , (state, action)=>{
                state.error = true
                state.loading = false
         })
         .addCase(fetchFilter.pending , (state,action)=>{
               state.loading = true
         })
         .addCase(fetchFilter.fulfilled , (state,action)=>{
            state.loading = false   
            state.error = false
            state.productsList = action.payload
         }) 
         .addCase(fetchFilter.rejected , (state,action)=>{
              state.error = true 
              state.loading = false
         })
     }
})

export const { filterPart  } = ProductSlice.actions
 
export  default ProductSlice.reducer