// Function to fetch country top news
const fetchNewsInfos = async (countryCode) => {
    const response = await fetch(`/api/news?country=${countryCode}`);
    return response.json();
};

// Function to fetch country information 
const fetchCountryInfos = async (countryCode) => {
    const response = await fetch(`/api/info?codes=${countryCode}`);
    return response.json();
};

document.addEventListener('DOMContentLoaded', async () => {
    const countryInput = document.getElementById('country-select');
    const listeNewsPanel = document.getElementById('list-news');
    const countryInfosTxtPanel = document.getElementById('infos-txt');

    // Update the News panel
    const updateNewsList = async () => {
        const countryCode = countryInput.value;
        const newsInfos = await fetchNewsInfos(countryCode);

        listeNewsPanel.innerHTML = ''; // Clear previous content from the projects panel

        // Display list of news 
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = 'Dernières News concernant le pays :';

        let texteGlobal = "<div class='col-lg-12'>";
        for(var i=0; i<newsInfos.articles.length; i++){
            var date = new Date(newsInfos.articles[i].publishedAt);
            if (i % 4 == 0 && i != 0) {
                texteGlobal += "</div><div class='col-lg-12'>";
            }
            texteGlobal += `<div class='row'>
                                <p> <u>${newsInfos.articles[i].author}</u> a publié hier, à ${date.getHours()}:${date.getMinutes()}: <br>
                                ${newsInfos.articles[i].title}, <a href='${newsInfos.articles[i].url}'>Voir le détail</a></p></div><br><br>`;
        }
        texteGlobal += "</div>"

        listeNewsPanel.appendChild(projectTitle);
        listeNewsPanel.innerHTML = texteGlobal

    };

    // Update informations about the country
    const updateInfos = async () => {
        const countryCode = countryInput.value;
        const countryInfo = await fetchCountryInfos(countryCode);

        countryInfosTxtPanel.innerHTML = ''; 

        const infosTitle = document.createElement('h2');
        infosTitle.textContent = 'Informations générales :';

        const currencyCode = Object.keys(countryInfo.currencies)[0]   // Needed to get the type of currencies

        const countryDescription = document.createElement('p');
        countryDescription.innerHTML = `<ul>
            <li>Capitale : ${countryInfo.capital[0]}</li>
            <li>Superficie : ${countryInfo.area}</li>
            <li>Population : ${countryInfo.population}</li>
            <li>Monnaie : ${countryInfo.currencies[currencyCode].name} (${countryInfo.currencies[currencyCode].symbol})</li>
        </ul>`;

        countryDescription.innerHTML+=`<img src='${countryInfo.flag}' style='width: 270px; height:140px'>`

        countryInfosTxtPanel.appendChild(infosTitle);
        countryInfosTxtPanel.appendChild(countryDescription);


    };

    // Event listener to look for a change of selected Country
    
    countryInput.addEventListener('change', async () => {
        await updateNewsList();
        await updateInfos();
    });
});