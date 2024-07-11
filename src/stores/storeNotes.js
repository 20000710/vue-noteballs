import { defineStore } from 'pinia'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'
import { 
  collection, onSnapshot, 
  doc, setDoc, deleteDoc, updateDoc, addDoc,
  query, orderBy 
} from "firebase/firestore";

let notesCollectionRef
let notesCollectionQuery;

let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        // {
        //   id: 'id1',
        //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime'
        // },
        // {
        //   id: 'id2',
        //   content: 'This is a shorter, notes!'
        // }
      ],
      notesLoaded: false,
    }
  },
  actions: {
    init(){
      const storeAuth = useStoreAuth()

      notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes');
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));
      this.getNotes()
    },
    async getNotes() {
      this.notesLoaded = false

      if(getNotesSnapshot) getNotesSnapshot() // unsubscribe from any active listener

      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        const notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        });
        console.log("notes", notes)
        this.notes = notes
        if(notes.length > 0) {
          this.notesLoaded = false
        }
      });
    },
    clearNotes(){
      this.notes = []
    },
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString()


      // Add a new document in collection with custom id
      // await setDoc(doc(notesCollectionRef, id), {
      //   id,
      //   content: newNoteContent
      // });
      
      // Add a new document in collection with unique id from firestore
      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date
      });
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete));
    },
    async updateNote(id, content) {

      // Set the "capital" field of the city 'DC'
      await updateDoc(doc(notesCollectionRef, id), {
        content
      });
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id)[0].content
      }
    },

    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})