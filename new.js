function searchRepositories() {
    let result = document.querySelector('.search input').value;
    let url = new URL('https://api.github.com/search/repositories');
    url.searchParams.set('q', result)
    url.searchParams.set('per_page', '10')
    fetch(url)
        .then(response => response.json())
        .then(response_json => examination(response_json.items))
}

function examination(items){
    let parent = document.querySelector('.search_result');
    parent.innerHTML = '';
    if (items.length === 0){
        let parent = document.querySelector('.search_result');

        let noResults = document.createElement('div');
        noResults.classList.add('search_no_result');
        noResults.textContent = 'Ничего не найдено';
        parent.appendChild(noResults);
    } else {
        for (let review of items){
            resultOutput(review)
        }
    }
}

function resultOutput(review) {
    console.log(review);
    let parent = document.querySelector('.search_result');

    let result = document.createElement('div');
    result.classList.add('result');

    let title = document.createElement('div');
    title.classList.add('search_result_title');
    let titleLink = document.createElement('a');

    let subTitle1 = document.createElement('div');
    subTitle1.classList.add('search_result_description');

    let subTitle2 = document.createElement('div');
    subTitle2.classList.add('search_result_language');

    parent.appendChild(result);
    result.appendChild(title);
    result.appendChild(subTitle1);
    result.appendChild(subTitle2);
    title.appendChild(titleLink);

    let link = review.html_url;
    titleLink.innerHTML = review.name;
    subTitle1.innerHTML = review.description;
    subTitle2.innerHTML = review.language;
    titleLink.setAttribute('href', link);
    titleLink.setAttribute('target', '_blank');
}

const set_event_on_keydown = (selector, handler) => {
    let elements = document.querySelectorAll(selector);
    for(let element of elements) {
        element.onkeydown  = handler;
    }
}

const set_event_on_click = (selector, handler) => {
    let elements = document.querySelectorAll(selector);
    for(let element of elements) {
        element.onclick = handler;
    }
}

function enter(event){
    if (event.key === 'Enter') {
        searchRepositories();
    }
}

set_event_on_keydown('.search', enter);
set_event_on_click('.search_start', searchRepositories);
