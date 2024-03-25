import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { Card } from '../../Components/Card';
import { Layout } from '../../Components/Layout';


function Clothes() {
  const {
    items,
    searchByTitle,
    setSearchByTitle,
    filteredItems
  } = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  console.log(index);

  const clothesCategory = () => items?.map(item => {
      if (item.category.name.toLowerCase().includes(index)) {
        console.log(item.length);
        return (
          <Card 
          data={item}
          key={item.id}
        />
        )
      }
      
    } )

    return (
      <Layout>
        <div className='flex items-center justify-center w-80 mb-4 relative'>
         <h1 className='font-medium text-xl'>Clothes</h1>
        </div>
        <input 
        type='text' 
        placeholder='Search a product'
        className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
        onChange= {(event) =>setSearchByTitle(event.target.value  ) }
        />
        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
          {clothesCategory()}
        </div>
  
      </Layout>
    )
  }


export { Clothes }