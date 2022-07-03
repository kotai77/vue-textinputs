import { defineStore } from 'pinia'

export const searchSuggestionsStore = defineStore('searchSuggestions', {
    state: () => ({ suggestions: [
        'Asport',
        'Alphabet',
        'American Express'
    ] })
})