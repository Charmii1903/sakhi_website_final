import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products , search, showSearch, currency } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subcategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relevent');
  const [priceRange, setPriceRange] = useState([0, 50000]);


  
  const toggleCategory = (e) =>{
    if (category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subcategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();
  
    // Apply search filter only if search is active and search term is not empty
    if (showSearch && search.trim()) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
  
    // Apply category filter only if category is selected
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
  
    // Apply subcategory filter only if subcategory is selected
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subcategory));
    }
  
    // Apply price range filter only if the range is not default (0 to max price in data)
    if (priceRange[0] !== 0 || priceRange[1] !== Infinity) {
      productsCopy = productsCopy.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);
    }
  
    setFilterProducts(productsCopy);
  };
  

  const sortProduct = () =>{
    let fpCopy = filterProducts.slice();

    switch (sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
      break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
      break;

      default:
        applyFilter();
      break;
    }
  }

  const handlePriceRangeChange = (event) => {
    const { value } = event.target;
    const [min, max] = value.split('-').map(Number);
    setPriceRange([min, max]);
  };
  

  useEffect(()=>{
    applyFilter();
  },[category,subcategory,search,showSearch,products,priceRange])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>


      {/* Filter options  */}
      <div className='min-w-60 sm:sticky top-0 overflow-y-auto '>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          <img className={`h-3 sm:hidden ${showFilter? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=''/>
        </p>

        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 tetx-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Summer'} onChange={toggleCategory}/>Summer
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Fall'} onChange={toggleCategory}/>Fall
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Winter'} onChange={toggleCategory}/>Winter
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Spring'} onChange={toggleCategory}/>Spring
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Ethnic'} onChange={toggleCategory}/>Ethnic
            </p>
          </div>
        </div>

        {/* subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 tetx-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory}/>Tops
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory}/>Bottoms
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Dress'} onChange={toggleSubCategory}/>Dresses
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Saree'} onChange={toggleSubCategory}/>Sarees
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Activewear'} onChange={toggleSubCategory}/>Active Wear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'KurtaSet'} onChange={toggleSubCategory}/>Kurta Set
            </p>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>PRICE RANGE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='radio' name='price' value='0-500' onChange={handlePriceRangeChange}/>Under 500
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='radio' name='price' value='500-1000' onChange={handlePriceRangeChange}/>500-1000
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='radio' name='price' value='1000-5000' onChange={handlePriceRangeChange}/>1000 - 5000
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='radio' name='price' value='5000-10000' onChange={handlePriceRangeChange}/>5000 - 10000
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='radio' name='price' value='10000-20000' onChange={handlePriceRangeChange}/>10000 - 20000
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='radio' name='price' value='20000-50000' onChange={handlePriceRangeChange}/>20000 - 50000
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='radio' name='price' value='50000-100000' onChange={handlePriceRangeChange}/>50000 and above
            </p>
          </div>
        </div>

      </div>


      {/* right side  */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"Collections"}/>
          {/* product sort  */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="low-high">Sort by : low-high</option>
            <option value="high-low">Sort by : high-low</option>
            <option value="relevent">Sort by : relevent</option>
          </select>
        </div>
        
        

        {/* map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-4 gap-y-6'>
           {
    filterProducts.length > 0
      ? filterProducts.map((item, index) => (
          <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
        ))
      : <p>No products available</p>
  }
        </div>
      </div>
    </div>
  )
}

export default Collection;
