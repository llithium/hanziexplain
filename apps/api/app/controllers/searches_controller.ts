import type { HttpContext } from '@adonisjs/core/http'
import { search } from 'chinese-lexicon'

export default class SearchesController {
  async index(ctx: HttpContext) {
    const term = ctx.request.qs().q
    const limitString = ctx.request.qs().q.limit
    if (limitString && term) {
      const limit = Number.parseInt(limitString)
      const searchResults = search(term, limit)
      return ctx.response.send(searchResults)
    }
    if (term) {
      const searchResults = search(term)
      return ctx.response.send(searchResults)
    }
    return ctx.response.status(400).send({ message: 'No search term provided' })
  }
}
