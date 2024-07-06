import { getEntries, search } from 'chinese-lexicon'
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/search', async ({ response, request }) => {
  const term = request.qs().q
  const limitString = request.qs().q.limit
  if (limitString && term) {
    const limit = Number.parseInt(limitString)
    const searchResults = search(term, limit)
    return response.send(searchResults)
  }
  if (term) {
    const searchResults = search(term)
    return response.send(searchResults)
  }
  return response.status(400).send({ message: 'No search term provided' })
})

router.get('/entries/:word', async ({ params, response }) => {
  const URIword = params.word
  if (URIword) {
    const word = decodeURIComponent(URIword)
    const entries = getEntries(word)
    return response.send(entries)
  }
  return response.status(400).send({ message: 'No search term provided' })
})
