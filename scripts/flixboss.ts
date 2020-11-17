import flixboss from '../data/flixboss.json'
import {JSDOM} from 'jsdom'
import {save} from './util'

const document = new JSDOM(flixboss.data).window.document

const movies = []

document.querySelectorAll('.title').forEach((element) => {
  const id = element.getAttribute('data-id')

  const image = element
    .querySelector('.img')
    .getAttribute('style')
    .slice("background-image: url('".length, -2)

  const title = element.querySelector('h4').innerHTML

  const year = Number(element.querySelector('.year').innerHTML)

  const genres = []

  element.querySelectorAll('.genre').forEach((genre) => {
    genres.push(genre.innerHTML)
  })

  const rating = Number(element.querySelector('.rating span').innerHTML)

  movies.push({id, title, year, genres, rating, image})
})

save('movies', movies)

/*
<li class="title" data-id="70005379">

<a class="item " href="/film/die-verurteilten-70005379" data-url="die-verurteilten-70005379">

	<div class="img lazy" style="background-image: url('https://c.flikshost.com/70005379/backdrops/small/xBKGJQsAIeweesB79KC89FpBrVr.jpg')"></div>

	<div class="info">
		<h4>Die Verurteilten</h4>

		<ul class="year-genres">
							<li class="year">1994</li>

										<li class="genre">Krimi</li>
														<li class="genre">Drama</li>
														<li class="genre">Geschichte</li>
									</ul>

					<div class="rating" style="background: #60DD22">
				IMDb
				<span>9.3</span>
			</div>

			</div>


</a>
/li>
*/
