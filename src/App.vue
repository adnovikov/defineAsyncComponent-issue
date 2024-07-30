<script setup lang="ts">
import TheWelcome from "./components/TheWelcome.vue";
import { ref, defineAsyncComponent, h, onErrorCaptured } from "vue";
const LoadingComponent = {
  render() {
    return h("div", "Loading...");
  },
};

const failComponent = {
  render() {
    return h("div", "Loading failed");
  },
};

onErrorCaptured((error) => {
  console.log("onErrorCaptured", error);
});

const HelloWorld = defineAsyncComponent({
  loader: () => import('./components/HelloWorld.vue?r=' + Date.now()),
  loadingComponent: LoadingComponent,
  errorComponent: failComponent,
  async onError(error, retry, fail, attempts) {
    console.log('on error fires', error)
    if (attempts > 10) {
      console.log("Too many attempts, giving up");
      fail();
      return;
    }
    setTimeout(() => {
      console.log("Retrying in 2 * attempts seconds");
      retry();
    }, 2000 * attempts);
  },
});

const showHello = ref(false);
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
    <button @click="showHello = !showHello">click me</button>
    <div class="wrapper">
      <HelloWorld v-if="showHello" msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
