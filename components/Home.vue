<template>
  <div class="home">
    <h1>
      Às vezes,<br />
      o lugar que está<br />
      não é o lugar que<br />
      você pertence

      <div class="mouse"><div class="mouse-wheel"></div></div>
    </h1>

    <p class="clausula">CLÁUSULA DE RESERVA (Lei 9.610/98 - LEI DE DIREITOS AUTORAIS): Este site foi publicado e é mantido pelos discentes do 8º semestre, do Curso de Graduação em Design Digital, da Universidade Anhembi Morumbi, visando a atender às exigências do Projeto Final em Design Digital. Trata-se de uma publicação temporária para propósitos estritamente acadêmicos e sem fins lucrativos. Em atendimento às exigências da Lei 9.610/98, do parágrafo 4°, do Artigo 184, do Código Penal, os discentes responsáveis por esta publicação colocam-se à disposição, por intermédio do e-mail roger@rogerjunior.com, para dirimir quaisquer dúvidas referentes à eventual violação de direitos autorais, comprometendo-se desde já, remover dos servidores online, qualquer texto, som ou imagem pertencente a autor ou titular que se sinta direta ou indiretamente prejudicado. </p>
  </div>
</template>

<style>

.clausula {
  
    position: absolute;
    bottom: 0;
    max-width: 60vw;
    padding-bottom: 2rem;
    font-size: 0.5rem;
    opacity: 0.3;
    letter-spacing: 1px;
}
.mouse {
  transition: all 0.3s;
  
    width: 3rem;
    height: 5rem;
    border: 4px solid var(--text-color);
    border-radius: 5rem;
    margin-top: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mouse-wheel {
  
    background: var(--text-color);
    width: 0.225rem;
    height: 0.65rem;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
    animation: mouseanim 1s infinite;

}


@keyframes mouseanim {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  
  30% {
    opacity: 1;
  }
  
  70% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(.5rem);
  }
}

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
