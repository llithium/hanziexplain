/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const SearchesController = () => import('#controllers/searches_controller')
const EntriesController = () => import('#controllers/entries_controller')

router.get('/search', [SearchesController, 'index'])

router.get('/entries/:word', [EntriesController, 'index'])
