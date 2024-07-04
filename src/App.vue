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
  import { useStoreAuth } from '@/stores/storeAuth';
  import { onMounted } from 'vue';

/*
  store
*/
  const storeAuth = useStoreAuth()

/*
  mounted
*/

  onMounted(() => {
    storeAuth.init()
  })
</script>

<style>
@import url('bulma/css/bulma.min.css');
</style>
