// Exemplo de canais M3U8 - você pode adicionar mais!
const canais = [
  {
    nome: "TV Cultura",
    url: "https://video01.cdn.rcs.com.br/tvcultura/tvcultura/playlist.m3u8"
  },
  {
    nome: "TV Brasil",
    url: "https://tvbrasil.ebc.com.br/playlist.m3u8"
  },
  {
    nome: "Al Jazeera English",
    url: "https://live-hls-web-aje.getaj.net/AJE/index.m3u8"
  }
];

// Função para carregar canal no player
function carregarCanal(url) {
  const video = document.getElementById("player");

  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
  }
}

// Preencher a lista de canais
const select = document.getElementById("canalSelect");
canais.forEach((canal, index) => {
  const option = document.createElement("option");
  option.value = canal.url;
  option.textContent = canal.nome;
  select.appendChild(option);
});

// Evento de troca de canal
select.addEventListener("change", (e) => {
  carregarCanal(e.target.value);
});

// Carregar o primeiro canal por padrão
carregarCanal(canais[0].url);
