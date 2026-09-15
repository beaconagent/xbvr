import api from '../api';

const state = {
  items: []
}

const mutations = {
}

const actions = {
  async load ({ state }, params) {
    state.items = await api.get('/api/options/sites').json()
  },
  async toggleSite ({ state }, params) {
    state.items = await api.put(`/api/options/sites/${params.id}`, { json: {} }).json()
  },
  async toggleSubscribed ({ state }, params) {
    state.items = await api.put(`/api/options/sites/subscribed/${params.id}`, { json: {} }).json()
  },
  async toggleLimitScraping ({ state }, params) {
    state.items = await api.put(`/api/options/sites/limit_scraping/${params.id}`, { json: {} }).json()
  },
  async toggleScrapeStash ({ state }, params) {
    state.items = await api.put(`/api/options/sites/scrape_stash/${params.id}`, { json: {} }).json()
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
