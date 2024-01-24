<script setup lang="ts">
defineOptions({ name: "HeroPage" });
</script>

<template>
  <main class="hero-page-wrapper">
    <div class="content">
      <a href="https://github.com/PassionZale/type-challenges">
        <img src="/logo.svg" width="500" alt="type-challenges" />
      </a>
      <div>
        <h1>Collection of TypeScript type challenges with online judge</h1>
        <p>
          <a href="/guide/introduction.html" class="button"> 快速开始 </a>
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.hero-page-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content {
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 5rem;
  text-align: center;
}

div {
  text-align: center;
}

h1 {
  font-weight: 400;
  margin: 0;
  font-size: 1.5em;
  color: #273849;
  opacity: 0.7;
}

a img {
  margin: 0 auto;
}

a.button {
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #304455;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #304455;
  text-decoration: none;

  margin: 2em 0;
  font-size: 0.9em;
  font-weight: 600;
  letter-spacing: 0.1em;
  min-width: 8em;
  text-align: center;

  text-transform: uppercase;
}
</style>
