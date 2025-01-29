// Load-Catagory
const lodeCatagory = async () =>{
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        displayCatagory(data.categories);
    }
    catch(error){
        console.error('Error fetching categories:', error);
    }
    
} 
const displayCatagory =(categories) =>{
    const catagoryContiner = document.getElementById('catagory')
    categories.forEach((item) => {
        console.log(item);

    // Creat Button
    const catagoryBtn = document.createElement('button');
    catagoryBtn.classList = 'btn';
    catagoryBtn.innerText = item.category;

    //Add button Catagory
    catagoryContiner.appendChild(catagoryBtn);

    });
}

lodeCatagory();