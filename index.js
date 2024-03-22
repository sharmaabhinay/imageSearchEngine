let input = document.getElementById('input');
let search = document.getElementById('search');
let showMore = document.getElementById('showMore');
let resultContainer = document.getElementById('resultContainer');

document.getElementById('clear').style.display = 'none';

document.getElementById('logo').addEventListener('click',()=> location.reload());
search.addEventListener('click',(e)=>{
    e.preventDefault();
    showImages();
})
input.addEventListener('input',clearInput)
function clearInput() {
    if(input.value.length >= 1){
        document.getElementById('clear').style.display = 'block';

    }else{
        document.getElementById('clear').style.display = 'none';
    }
}


let page = 1;
async function showImages() {
    if (page === 1) {
        resultContainer.innerHTML = '';
        showMore.style.display = 'none';
    }

    let prompt = input.value;
    if(input.value == 0){
        document.getElementById('oops').style.display = 'block';
        alert('input is empty')
    }else{
        document.getElementById('oops').style.display = 'none';
    }
    document.getElementById('loading').style.display = 'block';
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${prompt}&client_id=LVAbfjNCFOE873u-Nt1FqmBcduHKV5pibBHFhX4ykLQ&per_page=12`;
    
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    let result = data.results;
    let oops;
    if (result.length == 0) {
        resultContainer.innerHTML = '';
        showMore.style.display = 'none';
        document.getElementById('oops').style.cssText = 'display:block;margin:auto;margin-top:1rem;';
    } else {
        document.getElementById('oops').style.display = 'none';
    }

    document.getElementById('loading').style.display = 'none';
    
    result.map((item)=> {
        let imgContainer = document.createElement('div');
        let imgLoader = new Image(); 
        let img = document.createElement('img');

        imgContainer.style.position = 'relative';
        imgLoader.src = 'https://i.pinimg.com/originals/07/24/88/0724884440e8ddd0896ff557b75a222a.gif'; 
        imgLoader.style.width = '50';
        img.src = item.urls.small;

        imgLoader.onload = function() {
            imgContainer.removeChild(imgLoader); 
        };

        imgContainer.appendChild(imgLoader);
        imgContainer.appendChild(img);

        resultContainer.appendChild(imgContainer);

        img.style.cursor = 'pointer';
        img.addEventListener('click',()=> {
            window.location = item.urls.raw;
        });

        showMore.style.display = 'block';
    });
}


// showImages();
showMore.addEventListener('click',()=> {
    page++;
    
    showImages();
})

document.getElementById('clear').addEventListener('click',()=> {
    input.value = '';
    clearInput();
    input.focus();

    
})