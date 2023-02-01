const newCategories = [
    {
        label: 'Blog',
        id: 40,
    },

    {
        label: 'Event',
        id: 41
    },

]

document.addEventListener( 'DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    newsRender()
    getCategories()
    
});


function changeTabnews(e) {
    console.log('change tab', e);
    var elems = document.querySelectorAll(".tab-item.active");
    [].forEach.call(elems, function(el) {
        el.classList.remove("active");
    });
    e.target.className = "tab-item active"
    newsRender(e.target.innerText)
}

document.addEventListener('click', function (e) {
    if (e.target.className.split(' ').indexOf('tab-item') > -1) {
        // .bu clicked
        console.log('123');
        changeTabnews(e)
        // Do your thing
    }
}, false);

function newsRender(category) {
    const categoryId = category ? newCategories.find(item => item.label === category)?.id : newCategories[0].id
    fetch(`https://wordpress-dev.pointavenue.com/wp-json/wp/v2/posts?per_page=4&categories=${categoryId}&orderBy=date&order=asc`)
    .then((response) => response.json())
    .then((data) => {
        const blockNews = document.querySelector('.block-news-diffirent .news');
        let newsHtml = '';
        if (data.length) {
            data.forEach((newD) => {
                newsHtml += generateBlockNew(newD)
            });
            
        }
        if (blockNews) {
            blockNews.innerHTML = newsHtml;
        }
        
    });
}

function generateBlockNew(newD) {
    return `
    <a class="item" href=${newD.link} onClick="changeTabnews()">
            <img src="http://wordpress-dev.pointavenue.com/wp-content/uploads/2023/01/Rectangle-176-1.png"/>
            <div class="label">${newD.excerpt.rendered}</div>
            <div class="info">
                <img src="http://wordpress-dev.pointavenue.com/wp-content/uploads/2023/01/clock.png">
                <div class="time">${newD.date}</div>
                <div class="divider">|</div>
                <div class="type">${newD.type.toUpperCase()}</div>
            </div>
        </a>`
}

function getCategories(category) {
    fetch('https://wordpress-dev.pointavenue.com/wp-json/wp/v2/categories?per_page=100&parent=39')
    .then((response) => response.json())
    .then((data) => {
        const tabNews = document.querySelector('.block-news-diffirent .tabs');
        let tabsHtml = '';
        if (data.length) {

            data.forEach((tab, index) => {
                const categorieName = newCategories.find(item => item.id === tab.id)?.label
                tabsHtml += `
                <div class="tab-item ${index === 0 ? 'active' : ''}">${categorieName}</div>`
            });
            
        }
        if (tabNews) {
            tabNews.innerHTML = tabsHtml;
        }
    });
}