<template>
  <div>
    <header
      id="top"
      class="max-content"
    >
      <h1 id="site-title">Dragon Cave Calendar</h1>
      <nav id="menu">
        <a href="https://github.com/edenchazard/dc-calendar"
          ><FontAwesomeIcon icon="fa-brands fa-github" /> Github
        </a>
        <a href="https://ko-fi.com/dctools"
          ><FontAwesomeIcon icon="fa-solid fa-coffee" /> Donation link
        </a>
        <a href="https://chazza.me/dc/tools"
          ><FontAwesomeIcon icon="fa-solid fa-toolbox" /> More tools
        </a>
      </nav>
    </header>
    <main class="max-content">
      <slot />
    </main>
    <footer id="bottom">
      <p>
        &copy; eden chazard. Graphics courtesy of <b>Winya</b> with programming
        contributions from <b>Mu-Cephei (endulum)</b> and <b>Hourai</b>. Art
        &copy; Dragon Cave and artists.
      </p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

useHead({
  titleTemplate(titleChunk) {
    return titleChunk
      ? `${titleChunk} - Dragon Cave Calendar`
      : `Dragon Cave Calendar`;
  },
});
</script>

<style scoped lang="postcss">
#top {
  color: white;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.25rem 1rem;
  background: #15366a;
  padding: 0.5rem 1rem;
  justify-items: center;
}

#site-title {
  line-height: 2.7rem;
  grid-column: 1/-1;
  text-align: center;
}

#menu {
  grid-column: 1/-1;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  > a {
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    text-underline-offset: 0.3rem;
    text-decoration-style: dotted;

    > svg {
      height: 1.5rem;
    }
  }
}

#bottom {
  text-align: center;
  font-size: 0.8rem;
}

@media (min-width: 41rem) {
  #top {
    grid-template-columns: auto 1fr;
    justify-items: unset;
  }

  #site-title {
    grid-column: unset;
    text-align: left;
  }

  #menu {
    justify-content: end;
    grid-column: unset;
  }
}

@media (min-width: 58rem) {
  #top {
    grid-template-columns: 1fr auto auto;
  }
}
</style>
