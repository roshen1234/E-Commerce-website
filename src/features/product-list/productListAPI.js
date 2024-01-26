
export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
    const response=await fetch ('http://localhost:8080/products')
    const data=await response.json()
    resolve({data})
  }
    );
}

export function fetchProductId(id) {
  return new Promise(async(resolve) =>{
    const response=await fetch ('http://localhost:8080/products/'+id)
    const data=await response.json()
    resolve({data})
  }
    );
}

export function createProduct(product) {
  return new Promise(async(resolve) =>{
    const response=await fetch ('http://localhost:8080/products/',{
      method:'POST',
      body:JSON.stringify(product),
      headers:{'content-type':'application/json'}
    })
    const data=await response.json()
    resolve({data})
  }
    );
}

export function updateProduct(update) {
  return new Promise(async(resolve) =>{
    const response=await fetch ('http://localhost:8080/products/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    })
    const data=await response.json()
    resolve({data})
  }
    );
}

export function fetchProductsByFilters(filter,sort,pagination) {
  // filter:{"category":["smartphone","Laptop"]}
  // sort:{_sort:"price",_order:"desc"}
  // pagination:{"_page":"1","limit":"10"}
  // TODO:on server it wil accept multiple catagories
  // TODO: server will filter deleted product in case of non admin
  let queryString=''
  for(let key in filter)
  {
    const categoryValues=filter[key]
    if(categoryValues){
      const lastCategoryValues=categoryValues[categoryValues.length-1]
      queryString+=`${key}=${lastCategoryValues}&`
    }
    
  }
  for(let key in sort)
  {
    queryString+=`${key}=${sort[key]}&`
    
  }
  for(let key in pagination)
  {
    queryString+=`${key}=${pagination[key]}&`
    
  }
  return new Promise(async(resolve) =>{
    const response=await fetch ('http://localhost:8080/products?'+queryString)
    const data=await response.json()
    const totalItems=await response.headers.get('X-Total-Count')
    resolve({data:{products:data,totalItems:totalItems}})
  }
    );
}

export function fetchCategories() {
  return new Promise(async(resolve) =>{
    const response=await fetch ('http://localhost:8080/categories')
    const data=await response.json()
    resolve({data})
  }
    );
}

export function fetchBrands() {
  return new Promise(async(resolve) =>{
    const response=await fetch ('http://localhost:8080/brands')
    const data=await response.json()
    resolve({data})
  }
    );
}