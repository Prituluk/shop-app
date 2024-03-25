import { useState, createContext, useEffect } from 'react';


export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) => {
// Shopping cart - increment cunatity
  const [count, setCount] = useState(0)
// Product Detail - Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)
  // Checkout Side Menu - Open/Close
  const [isCheckoutSideMenu, setIsCheckoutSideMenu] = useState(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenu(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenu(false)
// Product detail - Show Products
const [productToShow, setProductToShow] = useState({})
// Shopping Cart - Add products to cart
const [cartProducts, setCartProducts] = useState([])
// Shopping Cart - Orders 
const [order, setOrder] = useState([])
// Get Products
const [items, setItems] = useState(null)
// 
const [filteredItems, setFilteredItems] = useState(null)
//Get Products By Title
const [searchByTitle, setSearchByTitle] = useState(null)
//Get Products By Category
const [searchByCategory, setSearchByCategory] = useState(null)


useEffect(() => {
  fetch('https://api.escuelajs.co/api/v1/products')
    .then(response => response.json())
    .then(data => setItems(data))
}, [])

  const filteredItemsByTitle = (items, searchByCategory) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByCategory.toLowerCase()))
  }
  const filteredItemsByCategory = (items, searchByTitle) => {
    return items?.filter(item => item.category.name.toLowerCase().includes(searchByTitle.toLowerCase()))
  }
  const filterBy = (seachTipe, items, searchByTitle, searchByCategory) => {
    if (seachTipe === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }
    if (seachTipe === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }
    if (seachTipe === 'BY_CATEGORY_AND_TITLE') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.category.name.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    if (!seachTipe) {
      return items
    }
  }
  
  useEffect(() => {
    if (searchByTitle && !searchByCategory) {
      setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    }
    if (searchByCategory && !searchByTitle) {
      setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
    }
    if (searchByCategory && searchByTitle) {
      setFilteredItems(filterBy('BY_CATEGORY_AND_TITLE', items, searchByTitle, searchByCategory))
    }
    if (!searchByCategory && !searchByTitle) {
      setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
    }
  }, [items, searchByTitle, searchByCategory])


  return(
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow, 
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenu,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        setIsCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setFilteredItems,
        searchByCategory,
        setSearchByCategory
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}