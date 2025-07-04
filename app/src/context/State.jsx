import React, { useEffect, useState } from 'react'
import Context from './Context';
import { fireDB } from '../firebase/FirebaseConfig';
import { Timestamp, deleteDoc, doc, addDoc, collection, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';

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
    localStorage.setItem('themeMode', newMode);
    document.body.style.backgroundColor = newMode === 'dark' ? 'rgb(46,46,46)' : 'white';
  }

  // Initialize body background on first load
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      document.body.style.backgroundColor = savedMode === 'dark' ? 'rgb(46,46,46)' : 'white';
    }
  }, []);

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

  // Capitalize first letter of string fields
  const capitalizeFields = (data) => {
    return {
      ...data,
      title: data.title.charAt(0).toUpperCase() + data.title.slice(1),
      category: data.category.charAt(0).toUpperCase() + data.category.slice(1),
      description: data.description.charAt(0).toUpperCase() + data.description.slice(1),
    };
  };

  const addProduct = async () => {
    const capitalizedData = capitalizeFields(products);
    
    if (
      capitalizedData.title === '' ||
      capitalizedData.price === '' ||
      capitalizedData.imageUrl === '' ||
      capitalizedData.category === '' ||
      capitalizedData.description === ''
    ) {
      return console.log('Please fill all fields');
    }

    const productRef = collection(fireDB, 'products');
    setLoading(true);
    try {
      await addDoc(productRef, capitalizedData);
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

  const [product, setProduct] = useState([]);

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

  const edithandle = (item) => {
    setProducts(item);
  };

  const deleteFromUi = (item) => {
    setProduct(p => p.filter((i) => i.id !== item.id));
  };

  const updateProduct = async () => {
    const capitalizedData = capitalizeFields(products);
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), capitalizedData);
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
      setLoading(false);
      console.log(error);
    }
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      setLoading(false);
      deleteFromUi(item);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Context.Provider value={{ 
      mode, 
      toggleMode, 
      loading,
      setLoading,
      products, 
      setProducts,
      addProduct,
      product,
      edithandle,
      updateProduct,
      deleteProduct 
    }}>
      {props.children}
    </Context.Provider>
  );
}

export default State;