import React from 'react'
import Header from './components/Header'
import CartList from './components/pages/CartList'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import ProductsView from './components/ProductsView'
const App = () => {
  return (
    <div>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Header />}>
             <Route  path='/' element={<ProductsView />}/>
             <Route  path='/cartlist' element={<CartList />}/>
        </Route>
       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
