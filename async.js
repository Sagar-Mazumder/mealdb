const searchFood = async () => {
    const searchInput = document.getElementById('search-input')
    const searchResult = searchInput.value
    // console.log(searchResult)
    searchInput.value = ''
    if (searchResult == '') {
        document.getElementById('show').innerText = 'Nothing to show'
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchResult}`
        try{
            const res=await fetch(url)
            const data=await res.json()
            showingResult(data.meals)
        }
        catch(error)
        {
            console.log(error)
        }
       
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => showingResult(data.meals))
    }
}
const showingResult = meals => {
    if (meals.length == 0) {
        // console.log('hiii')

    }
    const card = document.getElementById('show-result')
    card.textContent = ''
    meals.forEach(meal => {
        // console.log(meal)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div onclick="searchbyid(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
          </div>
        `
        card.appendChild(div)
    });
}
const searchbyid = async id => {
    // console.log(id)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

    const res = await fetch(url)
    const data = await res.json()
    mealDetails(data.meals[0])
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => mealDetails(data.meals[0]))
}
const mealDetails = mealID => {
    // console.log(mealID)
    const singleMeal = document.getElementById('meal-id')
    singleMeal.textContent=''
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <div class="card" >
            <img src="${mealID.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${mealID.strMeal}</h5>
                <p class="card-text">${mealID.strInstructions.slice(0, 200)}</p>
                <a href="${mealID.strYoutube}" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `
    singleMeal.appendChild(div)
}