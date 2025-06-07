import React, { useEffect, useState } from 'react'
import Context from './Context';
import { fireDB } from '../firebase/FirebaseConfig';
import { Timestamp, deleteDoc,doc ,addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';



function State(props) {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode ? savedMode : 'light';
  });  

  const [loading, setLoading] = useState(false); 

  // Apply mode changes to localStorage and UI
  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    
    // Save to localStorage
    localStorage.setItem('themeMode', newMode);
    
    // Apply to body
    document.body.style.backgroundColor = newMode === 'dark' ? 'rgb(46,46,46)' : 'white';
  }

  // Initialize body background on first load
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      document.body.style.backgroundColor = savedMode === 'dark' ? 'rgb(46,46,46)' : 'white';
    }
  }, []);
////////////////////////////////////////////////////////////////////////////
const [products, setProducts] = useState({
  title: '',
  price: '',
  imageUrl: '',
  category: '',
  description: '',
  time: Timestamp.now(),
  date: new Date().toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }),
});

const addProduct = async()=>{
  if(
    products.title === '' ||
    products.price === '' ||
    products.imageUrl === '' ||
    products.category === '' ||
    products.description === ''
  ){
    return console.log('please fill all fields')
  }
  const productRef = collection(fireDB,'products')
  setLoading(true)
  try {
  const res=await addDoc(productRef, products);
  console.log(res)
    getProductData();
    setLoading(false);
    setProducts({
      title: '',
      price: '',
      imageUrl: '',
      category: '',
      description: '',
      time: Timestamp.now(),
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
    });
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};
//////////////////////////////////
const [product, setProduct] = useState([]);
////////////////////////////////////////////
const getProductData = async () => {
  setLoading(true);
  try {
    const q = query(collection(fireDB, 'products'), orderBy('time'));
    const data = onSnapshot(q, (QuerySnapshot) => {
      let productsArray = [];
      QuerySnapshot.forEach((doc) => {
        productsArray.push({ ...doc.data(), id: doc.id });
      });
      setProduct(productsArray);
      setLoading(false);
    });
    return () => data;
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

useEffect(() => {
  getProductData();
}, []);
//////////////////////////////////////
const edithandle = (item) => {
  setProducts(item)
}
// update product

const deleteFromUi = (item)=>{
      setProduct(p=>p.filter((i)=>{
                return i.id != item.id
      }))      
}

const updateProduct = async (item) => {
  setLoading(true)
  try {
    await setDoc(doc(fireDB, "products", products.id), products);
    toast.success("Product Updated successfully")
    getProductData();
    setLoading(false)
    window.location.href = '/dashboard'
  } catch (error) {
    setLoading(false)
    console.log(error)
  }
  setProducts("")
}

const deleteProduct = async (item) => {

  try {
    setLoading(true)
    console.log('deleting')
    await deleteDoc(doc(fireDB, "products", item.id));
    console.log('deleted')
    setLoading(false)
    getProductData()
    deleteFromUi(item)
  
  } catch (error) {
    console.log('errororrror',error)
    setLoading(false)
  }
}


return (
    <Context.Provider value={{ 
      mode, toggleMode, loading,setLoading,
      products, setProducts,addProduct,product,edithandle,updateProduct,deleteProduct }}>
      {props.children}
    </Context.Provider>
  )
}

export default State






// const [products, setProducts] = useState({
//   title: "",
//   price: "",
//   imageUrl: "",
//   category: "",
//   description: "",
//   time: Timestamp.now(),
//   date: new Date().toLocaleString(
//     "en-US",
//     {
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//     }
//   )

// })
// const addProduct = async () => {
// if (products.title == "" || products.price == "" || products.imageUrl == "" || products.category == "" || products.description == "")
//  {
//   return toast.error('Please fill all fields')
// }
// const productRef = collection(fireDB, "products")
// setLoading(true)
// try {
//   await addDoc(productRef, products)
//   getProductData()
//   setLoading(false)
// } catch (error) {
//   console.log(error)
//   setLoading(false)
// }
// setProducts("")
// }

// const [product, setProduct] = useState([]);
// /////////****gete product  */
// const getProductData = async () => {
// setLoading(true)
// try {
//   const q = query(
//     collection(fireDB, "products"),
//     orderBy("time"),
//   );
//   const data = onSnapshot(q, (QuerySnapshot) => {
//     let productsArray = [];
//     QuerySnapshot.forEach((doc) => {
//       productsArray.push({ ...doc.data(), id: doc.id });
//     });
//     setProduct(productsArray)
//     setLoading(false);
//   });
//   return () => data;
// } catch (error) {
//   console.log(error)
//   setLoading(false)
// }
// }

// useEffect(() => {
// getProductData();
// }, []);
