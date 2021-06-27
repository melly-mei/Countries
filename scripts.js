const countriesEl = document.getElementById('countries');
const filterBtn = document.getElementById('filter');
const regionFilters = filterBtn.querySelectorAll('li');

getCountries();

async function getCountries() {
  const data = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await data.json();

  showCountries(countries);
}

function showCountries(countries) {
  countriesEl.innerHTML = '';

  countries.forEach(country => {
    const countryEl = document.createElement('div');

    countryEl.innerHTML = `
    <div class="col mb-5">
      <div class="card h-100">
        <img class="card-img-top" src="${country.flag}" alt="${country.name}" />
        <div class="card-body p-4 text-center">
          <h5 class="fw-bolder">${country.name}</h5>
          <p>
            <strong>Population:</strong> ${country.population} <br>
            <strong>Region:</strong> <span class="country-region">${country.region}</span> <br>
            <strong>Capital:</strong> ${country.capital}
          </p>
        </div>
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="text-center">
          <button type="button" class="btn btn-outline-dark mt-auto" data-bs-toggle="modal" data-bs-target="#modal">
            Details
          </button>
          </div>
        </div>
      </div>
    </div>
    `;

    countryEl.addEventListener('click', () => {
      modal.style.display = 'flex';
      showCountryDetails(country);
    });

    countriesEl.appendChild(countryEl);
  });
}

function showCountryDetails(country) {
  const modalBody = modal.querySelector('.modal-body');
  const modalImg = modal.querySelector('img');

  modalImg.src = country.flag;

  modalBody.innerHTML = `
        <h2 class="text-center">${country.name}</h2>
        <p>
            <strong>Native Name:</strong>
            ${country.nativeName} <br>
            <strong>Population:</strong>
            ${country.population} <br>
            <strong>Region:</strong>
            ${country.region} <br>
            <strong>Sub Region:</strong>
            ${country.subregion} <br>
            <strong>Capital:</strong>
            ${country.capital} <br>
            <strong>Top Level Domain:</strong>
            ${country.topLevelDomain[0]} <br>
            <strong>Currencies:</strong>
            ${country.currencies.map(currency => currency.code)} <br>
            <strong>Languages:</strong>
            ${country.languages.map(language => language.name)}
        </p>
    `;
}

regionFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    const value = filter.innerText;
    const countryRegion = document.querySelectorAll('.country-region');

    countryRegion.forEach(region => {
      if (region.innerText.includes(value) || value === 'All') {
        region.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
      } else {
        region.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
      }
    });
  });
});