<template>
  <div class="home">
    <h1>
      Às vezes,<br />
      o lugar que está<br />
      não é o lugar que<br />
      você pertence
    </h1>
  </div>
</template>

<style>
h1 {
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 4vw;
  margin-left: 10vw;
  margin-top: -3vw;
  line-height: 1.2;
}

.home {
  min-width: 100vw;
  display: flex;
  align-items: center;
  height: 100%;
}

.dark .home:before {
  opacity: 1;
}
.home:before {
  background-image: url("/bg.jpg");
  opacity: 0;
  transition: 0.5s all;
  background-size: cover;
  background-position: center;

  content: "";
  position: absolute;
  top: -6rem;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -100;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
