const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
	const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
	countriesContainer.insertAdjacentHTML('beforeend', html);
	countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
	countriesContainer.insertAdjacentText('beforeend', msg);
	countriesContainer.style.opacity = 1;
};

const getPosition = function () {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

const whereAmI = async function () {
	try {
		// Geolocation
		const pos = await getPosition();
		const { latitude: lat, longitude: lng } = pos.coords;

		// Reverse Geocoding
		const resGeo = await fetch(
			`http://nominatim.openstreetmap.org/reverse?format=json&ladt=${lat}&lon=${lng}`
		);
		if (!resGeo.ok) throw new Error('Problem getting location data');
		const dataGeo = await resGeo.json();

		// Country Data
		const resCountry = await fetch(
			`https://restcountries.com/v2/name/${dataGeo.address.country}`
		);
		if (!resCountry.ok) throw new Error('Problem getting country');
		const dataCountry = await resCountry.json();
		renderCountry(dataCountry[0]);

		return `You are in ${dataGeo.address.state}, ${dataGeo.address.country}`;
	} catch (err) {
		console.error(`💥 ${err}`);
		renderError(`💥 Something went wront : ${err.message}`);
	}
};

btn.addEventListener('click', whereAmI);
