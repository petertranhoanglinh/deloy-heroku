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
import Notify from './components/Notify';
import AddNotify from './components/AddNotify';
import AddProduct from './components/AddProduct';
import ListProduct from './components/ListProduct';
import ProductDetail from './components/ProductDetail';
import TransCoin from './components/TransCoin';
import { MessengerChat } from "react-messenger-chat-plugin";
import Cart from './components/Cart';

function App(){
  return (
    <div>
       {/* Custom styles for this template */}
       <link href="css/styleTgdd.css" rel="stylesheet" />
      <Header></Header>

      <Routes>
        <Route path='/product' element = {<Product></Product>}/>
        <Route path='/login' element = {<Login></Login>}/>
        <Route path='/' element = {<Home></Home>}/>
        <Route path='/balance' element = {<Balance></Balance>}/>
        <Route path='/coin' element = {<Coin></Coin>}/>
        <Route path='/cart' element = {<Cart></Cart>}/>
        <Route path='/signUp' element = {<SignUp></SignUp>}/>
        <Route path='/profile' element = {<Profile></Profile>}/>
        <Route path='/notify' element = {<Notify></Notify>}/>
        <Route path='/addNotity' element = {<AddNotify></AddNotify>}/>
        <Route path='/addProduct' element = { <AddProduct/>}/>
        <Route path='/productDetail/:pdtId' element = {<ProductDetail></ProductDetail> }/>
       <Route path='/listProduct' element = {<ListProduct></ListProduct>}/>
       <Route path='/addProduct/:pdtId' element = {<AddProduct></AddProduct>}/>
       <Route path='/trans' element = {<TransCoin></TransCoin>}/>
      </Routes>
      <MessengerChat
        pageId="536477823552110"
        language="en_US"
        themeColor={"#000000"}
        bottomSpacing={10}
        loggedInGreeting="Ch??o m???ng b???n ?????n v???i L web 5"
        loggedOutGreeting="Ch??o t???m bi???t b???n c???m ??n ???? s??? d???ng d???ch v??? c???a ch??ng t??i"
        greetingDialogDisplay={"show"}
        debugMode={true}
        onMessengerShow={() => {
          console.log("onMessengerShow");
        }}
        onMessengerHide={() => {
          console.log("onMessengerHide");
        }}
        onMessengerDialogShow={() => {
          console.log("onMessengerDialogShow");
        }}
        onMessengerDialogHide={() => {
          console.log("onMessengerDialogHide");
        }}
        onMessengerMounted={() => {
          console.log("onMessengerMounted");
        }}
        onMessengerLoad={() => {
          console.log("onMessengerLoad");
        }}
  />
    </div>
  )
}

export default App;
