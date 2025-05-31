const canais = [
  // Brasil
  { nome: "TV Cultura (SP)", url: "https://video01.cdn.rcs.com.br/tvcultura/tvcultura/playlist.m3u8" },
  { nome: "TV Brasil", url: "https://tvbrasil.ebc.com.br/playlist.m3u8" },
  { nome: "Band São Paulo", url: "https://band.globo.com/segmento/tv-bandeirantes/playlist.m3u8" },
  { nome: "Record News", url: "https://recordnews.globo.com/segmento/record-news/playlist.m3u8" },
  { nome: "Globo News", url: "https://globonews.globo.com/segmento/globo-news/playlist.m3u8" },
  { nome: "RedeTV!", url: "https://redetv.globo.com/segmento/redetv/playlist.m3u8" },
  { nome: "SBT", url: "https://sbt.globo.com/segmento/sbt/playlist.m3u8" },
  { nome: "TV Gazeta", url: "https://tvgazeta.globo.com/segmento/tv-gazeta/playlist.m3u8" },
  
  // Internacional
  { nome: "Al Jazeera English", url: "https://live-hls-web-aje.getaj.net/AJE/index.m3u8" },
  { nome: "France 24 (English)", url: "https://static.france24.com/live/F24_EN_LO_HLS/live_web.m3u8" },
  { nome: "Deutsche Welle (DW)", url: "https://dwstream53-lh.akamaihd.net/i/dwstream53_live@396123/master.m3u8" },
  { nome: "NHK World Japan", url: "https://nhkworld-vh.akamaihd.net/i/nhkworld_1@178378/index_720_av-p.m3u8" },
  { nome: "Sky News", url: "https://skynewsau-lh.akamaihd.net/i/skynewsau_1@429382/master.m3u8" },
  { nome: "CBS News", url: "https://cbsnews-lh.akamaihd.net/i/cbsnews_1@588352/master.m3u8" },
  { nome: "CNN International", url: "https://cnn-cnninternational-1-cnn-live.hls.adaptive.level3.net/hls/live/2025299/cnnintl/master.m3u8" },
  
  // Outros
  { nome: "NASA TV HD", url: "https://nasatv-lh.akamaihd.net/i/NASA_101@319270/master.m3u8" },
  { nome: "CBC News", url: "https://cbcnews-lh.akamaihd.net/i/cbcnews_live@270858/master.m3u8" },
  { nome: "BBC World News", url: "https://bbcwstream-lh.akamaihd.net/i/bbcwstream_1@124848/master.m3u8" }
];

// Função para carregar canal no player
function carregarCanal(url) {
  const video = document.getElementById("player");
  if (window.Hls && Hls.isSupported()) {
    if (window.hls) {
      window.hls.destroy();
    }
    window.hls = new Hls();
    window.hls.loadSource(url);
    window.hls.attachMedia(video);
    window.hls.on(Hls.Events.MANIFEST_PARSED, function() {
      video.play();
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
    video.addEventListener('loadedmetadata', function() {
      video.play();
    });
  } else {
    alert("Seu navegador não suporta reprodução HLS.");
  }
}

// Preencher lista de canais no select
const select = document.getElementById("canalSelect");
canais.forEach(canal => {
  const option = document.createElement("option");
  option.value = canal.url;
  option.textContent = canal.nome;
  select.appendChild(option);
});

// Evento para mudar de canal
select.addEventListener("change", () => {
  carregarCanal(select.value);
});

// Carregar primeiro canal ao iniciar
carregarCanal(canais[0].url);
