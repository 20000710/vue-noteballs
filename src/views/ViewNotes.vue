<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      ref="addEditNoteRef"
      placeholder="Add a new Note"
    >
      <template #buttons>
        <button
            @click="addNote"
            :disabled="!newNote"
            class="button is-link has-background-success"
          >
            Add New Note
          </button>
      </template>
    </AddEditNote> 

    <Note
      v-for="note in storeNotes.notes"
      :key="note.id"
      :note="note"
    />
  </div>
</template>

<script setup>
/*
  imports
*/

import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
import { useStoreNotes } from '@/stores/storeNotes';
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { useWatchCharacters } from '@/use/useWatchCharacters';

/* 
  store
*/
  const storeNotes = useStoreNotes()

/*
  notes
*/

const newNote = ref('')
const addEditNoteRef = ref(null)
const newNoteRef = ref(null)


/*
  add new note
*/
  const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addEditNoteRef.value.focusTextarea()
  }


/*
  watch characters
*/
  useWatchCharacters(newNote)

</script>