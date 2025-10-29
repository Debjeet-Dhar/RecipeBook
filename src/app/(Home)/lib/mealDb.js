const BaseUrl = 'https://www.themealdb.com/api/json/v1/1'


export const getRecipe = async()=> {

  const res = await fetch(`${BaseUrl}/random.php`);
 
  return res.json()
}

 export const SerchRecipe = async(query) => {

   const res =  await fetch(`${BaseUrl}/search.php?s=${query}`)

  return  res.json()
 }


