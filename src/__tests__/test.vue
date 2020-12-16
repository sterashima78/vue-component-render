<template>
  <button @click="$emit('hogehoge', 1)">
    <h1>{{ msg }}</h1>
    <div class="one"><slot /></div>
    <div class="two"><slot name="not-default" /></div>
  </button>
</template>
<script>
export default {
  props: ["msg"]
};
</script>
