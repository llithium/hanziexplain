import type { HttpContext } from '@adonisjs/core/http'
import { getEntries } from 'chinese-lexicon'

export default class EntriesController {
  async index(ctx: HttpContext) {
    const URIword = ctx.params.word
    if (URIword) {
      const word = decodeURIComponent(URIword)
      const entries = getEntries(word)
      return ctx.response.send(entries)
    }
    return ctx.response.status(400).send({ message: 'No search term provided' })
  }
}
