<template>
  <Navbar />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup>
/*
  imports
*/

  import Navbar from '@/components/Layout/Navbar.vue';
  import { useStoreNotes } from '@/stores/storeNotes';
import { onMounted } from 'vue';

/*
  store
*/
  const stoerNotes = useStoreNotes()

/*
  mounted
*/

  onMounted(() => {
    stoerNotes.getNotes()
  })
</script>

<style>
@import url('bulma/css/bulma.min.css');
</style>
