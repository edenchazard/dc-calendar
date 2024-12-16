<template>
  <header
    id="top"
    class="max-content"
  >
    <h1 id="site-title">Dragon Cave Calendar</h1>
  </header>

  <main class="max-content">
    <section
      class="section"
      id="moved"
    >
      <img
        src="/mooving-mint.webp"
        alt="Mooving Mint"
        id="mooving-mint"
      />
      <p>We've "moo" ved!</p>
      <p>
        The calendar is now in the same place as the rest of the tools.
        <a href="https://chazza.me/dc/calendar">Find it here</a>.
      </p>
      <p>Remember to update your bookmarks!</p>
    </section>
  </main>
</template>

<style scoped lang="postcss">
#moved {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;

  > p {
    margin: 0;
    font-size: 1.25rem;
  }

  & > p:nth-of-type(1) {
    font-size: 3rem;
  }

  & a {
    color: hsl(217, 67%, 60%);
    text-decoration: underline;
  }
}
#mooving-mint {
  max-height: 20rem;
  height: 100%;
  max-width: 100%;
}

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

#timezone-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  grid-column: 1/-1;
}

#timezone {
  max-width: 20rem;
  width: 100%;
}

#info {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

#now {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

#now .time {
  font-size: 0.8rem;
  background-color: darkslateblue;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
}

#extended-info-container {
  border: 1px dashed #fff;
  padding: 1rem;
}

#extended-info {
  gap: 1rem;
  justify-self: center;
  display: grid;
  grid-template-columns: auto 1fr;
  max-width: 42rem;
}

#extended-info > *:nth-child(odd) {
  justify-self: center;
  text-align: center;
}

#extended-info p:first-child {
  margin-top: 0;
}

#extended-info p {
  margin: 0;
}

#extended-info img {
  max-height: 3rem;
}

#period {
  background: darkslateblue;
  padding: 1rem;
  color: white;
}

#period-wrapper {
  border-radius: 0.5rem;
  max-width: 44rem;
  margin: 0 auto;
  display: grid;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

#period-wrapper span {
  text-align: center;
}

#period-wrapper label {
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  text-align: center;
  background: #1a005d;
  border-radius: 0.4rem;
}

.local {
  font-size: 0.5rem;
  display: block;
}

.hourly-table {
  margin-top: 0.5rem;
}

#bottom {
  text-align: center;
  font-size: 0.8rem;
}

@media (min-width: 10rem) {
  #period-wrapper {
    gap: 1rem;
  }
}

@media (min-width: 37rem) {
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

  #timezone-wrapper {
    justify-self: end;
  }

  #period-wrapper {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  #period-wrapper label {
    display: inline;
  }
}

@media (min-width: 58rem) {
  #top {
    grid-template-columns: 1fr auto auto;
  }

  #timezone-wrapper {
    grid-column: unset;
  }

  #period-wrapper {
    display: flex;
  }
}
</style>
