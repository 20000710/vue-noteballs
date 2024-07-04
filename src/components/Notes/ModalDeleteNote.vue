<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div 
      class="modal-card"
      ref="modalCardRef"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button
          @click="closeModal" 
          class="delete" 
          aria-label="close"
        >
        </button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
          <button
            @click="closeModal" 
            class="button"
          >
            Cancel
          </button>
          <button
            @click="storeNotes.deleteNote(noteId)" 
            class="button is-danger"
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
  /*
    imports
  */
  import { onClickOutside } from '@vueuse/core';
  import { onMounted, onUnmounted, ref } from 'vue';
  import  { useStoreNotes } from '@/stores/storeNotes';

  /*
    props
  */
    const props = defineProps({
      modelValue: {
        type: Boolean,
        default: false,
      },
      noteId: {
        type: String,
        required: true
      }
    })
  
  /*
    emits
  */
    const emits = defineEmits(['update:modelValue'])

  /*
    stores
  */
    const storeNotes = useStoreNotes()

  /*
    close modal
  */
    const closeModal = () => {
      emits('update:modelValue', false)
    }

  /*  
    click outside to close
  */
    const modalCardRef = ref(null)

  onClickOutside(modalCardRef, closeModal)

  /*
    keyboard control
  */
    const handleKeyboard = e => {
      console.log("closed it!")
      if(e.key === "Escape" || e.key === "Backspace") closeModal()
    }
    
    onMounted(() => {
      document.addEventListener('keyup', handleKeyboard)
    })

    // remove addEventListener from DOM
    onUnmounted(() => {
      document.removeEventListener('keyup', handleKeyboard)
    })


</script>