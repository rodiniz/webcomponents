<script setup lang="ts">
const buttonLabel: string = 'Get started';
const emailPlaceholder: string = 'you@example.com';
</script>

<template>
  <main class="container">
    <h1>Vue + @diniz/webcomponents</h1>
    <p>Starter is ready. Edit src/App.vue to build your app.</p>

    <section class="stack">
      <ui-button variant="primary" size="lg">{{ buttonLabel }}</ui-button>
      <ui-input label="Email" type="email" :placeholder="emailPlaceholder"></ui-input>
    </section>
  </main>
</template>
