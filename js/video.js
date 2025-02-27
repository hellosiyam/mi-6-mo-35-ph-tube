// Timer
function getTimeString(time) {
    const hours = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minutes = parseInt(remainingSecond / 60);
    const seconds = remainingSecond % 60;
    return `${hours + ' hrs ' + minutes + ' min ' + seconds + ' sec ' + ' ago '}`
}

// Load-Category
const lodeCategory = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        displayCategory(data.categories);
    }
    catch (error) {
        console.error('Error fetching categories:', error);
    }

}

// Load videos
const lodeVideos = async (searchText = '') => {
    try {
        const res = await fetch(` https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
        const data = await res.json();
        displayVideos(data.videos);
    }
    catch (error) {
        console.error('Error fetching categories', error);
    }

}
// load videoCategory
const lodeVideosCategory = async (id) => {
    const activeBtn = document.getElementById(`btn-${id}`)
    removeActiveClass();
    activeBtn.classList.add('active')
    const res = await fetch (`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await res.json();
    displayVideos(data.category);
    
}
// load videoCategoryDetails
const videoCategoryDetails = async (videoId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
    const data = await res.json();
    displayDetails(data.video)
    
}

// display Show data
const displayDetails = (video) => {
    console.log(video);
    const modalDetail = document.getElementById('modal-content');
    modalDetail.innerHTML = `
    <img class = 'rounded-lg' src=${video.thumbnail} />
    <p>${video.description}</p>
    `
    document.getElementById('my_modal').showModal();
    
}

// Remove active- color
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for(let btn of buttons){
        btn.classList.remove('active')
    }
}


// Display-Videos
const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos')
    videosContainer.innerHTML = '';
    if (videos.length === 0) {
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML =`
        <div class= 'min-[450px] flex flex-col gap-5 items-center justify-center'>
        <img src= 'recurses/Icon.png'/>
        <p class = 'text-2xl font-bold text-center' >Oops!! Sorry, There is no content here</p>
        </div>
        `;
        return
    }else{
        videosContainer.classList.add('grid') 
    }
    videos.forEach((video) => {
        console.log(video);

        const card = document.createElement('div')
        card.classList = 'card card-compact rounded-xl';
        card.innerHTML =`
            <figure class = 'h-[200px] relative'>
            <img class = 'rounded-xl h-full w-full object-cover'
            src=${video.thumbnail}/>
            ${video.others.posted_date?.length === 0 ?`` : `<span class = 'absolute right-2 bottom-2 text-xs text-white font-normal bg-black p-2 rounded-md'>${getTimeString(video.others.posted_date)}</span>`}
            </figure>
            <div class="px-0 py-2 flex gap-2">
                <div>
                <img class = 'rounded-full h-8 w-8 object-cover'
                src=${video.authors[0].profile_picture}/>
                </div>
                <div>
                <h2 class = 'font-bold text-base'>${video.title}</h2>
                <div class = 'flex gap-2 items-center my-1'>
                    <p class = 'text-xs font-normal'>${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified === true ? `<img class = 'rounded-full h-4 w-4 object-cover'
                    src= "https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ``}
                </div>
                <p class = 'text-xs font-normal'>${video.others.views}</p>
                </div>
                <p><button onClick ="videoCategoryDetails('${video.video_id}')" class = 'btn btn-sm btn-error'>Details</button></p>
            </div>
        `;
        videosContainer.appendChild(card)
    });

}

// display Category
const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category')
    categories.forEach((item) => {
        console.log(item);

        // Create container
        const btnContainer = document.createElement('div');
        btnContainer.innerHTML =`
        <button id ='btn-${item.category_id}' onClick = 'lodeVideosCategory(${item.category_id})' class = 'btn category-btn' >
        ${item.category}
        </button>
        `
        //Add button Category
        categoryContainer.appendChild(btnContainer);

    });
}

document.getElementById('search-input').addEventListener('keyup', (event)=>{
    lodeVideos(event.target.value);
    
})

lodeVideos();
lodeCategory();