import axios from 'axios'


// For demo we use a fake baseURL and stubbed functions below
export const api = axios.create({ baseURL: '/api' })


// NOTE: In dev environment you can intercept requests or replace these stubs with real URLs.