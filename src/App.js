import './App.css'
import Login from './screen/Login';
import Header from './components/Header'
import {Routes, Route} from 'react-router-dom'
import Product from './components/Product';
import Home from './components/Home';
import Balance from './components/Balance';
import Coin from './components/Coin';
import SignUp from './screen/SignUp';
import Profile from './components/Profile';
import Message from './components/Message';
import Notify from './components/Notify';
import AddNotify from './components/AddNotify';
import AddProduct from './components/AddProduct';
import ListProduct from './components/ListProduct';
import ProductDetail from './components/ProductDetail';

function App(){
  return (
    <div>
      <Header></Header>

      <Routes>
        <Route path='/product' element = {<Product></Product>}/>
        <Route path='/login' element = {<Login></Login>}/>
        <Route path='/' element = {<Home></Home>}/>
        <Route path='/balance' element = {<Balance></Balance>}/>
        <Route path='/coin' element = {<Coin></Coin>}/>
        <Route path='/signUp' element = {<SignUp></SignUp>}/>
        <Route path='/profile' element = {<Profile></Profile>}/>
        <Route path='/message' element = {<Message></Message>}/>
        <Route path='/notify' element = {<Notify></Notify>}/>
        <Route path='/addNotity' element = {<AddNotify></AddNotify>}/>
        <Route path='/addProduct' element = { <AddProduct/>}/>
        <Route path='/productDetail/:pdtId' element = {<ProductDetail></ProductDetail> }/>
       <Route path='/listProduct' element = {<ListProduct></ListProduct>}/>
      </Routes>
    </div>
  )
}

export default App;
