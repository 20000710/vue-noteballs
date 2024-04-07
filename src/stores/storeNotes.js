import { defineStore } from 'pinia'

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        {
          id: 'id1',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec'
        },
        {
          id: 'id2',
          content: 'This is a shorter, notes!'
        }
      ]
    }
  }
})