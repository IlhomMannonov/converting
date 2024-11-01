<!-- App.vue -->
<template>
  <div id="app">
    <TransactionsList/>
  </div>
</template>

<script>
import TransactionsList from "@/components/TransactionsList.vue";


export default {
  components: {
    TransactionsList,
  },
};
</script>
