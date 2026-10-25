// REEZIE SPEAK audio previews. Keeps player section hidden until all preview files are hosted.
document.addEventListener('DOMContentLoaded', async () => {
  const previews = [
    {title: 'LOSE YOU', artist:'REEZIE REEZ', file:'LOSE_YOU_30_SEC_PREVIEW.mp3'},
    {title:'THE DREAM MAKER (MAKER OF LOVE) — SupaDopeSex Edit', artist:'REEZIE REEZ', file:'THE_DREAM_MAKER_SUPADOPESEX_30_SEC_PREVIEW.mp3'},
    {title:"IT'S OUR 1ST CHRISTMAS", artist:'REEZIE REEZ feat. CG Saint', file:'ITS_OUR_1ST_CHRISTMAS_30_SEC_PREVIEW.mp3'}
  ];
  const base = new URL('./', document.baseURI);
  const available = await Promise.all(previews.map(async track => {
    const url = new URL(track.file, base);
    try { const res = await fetch(url, {method:'HEAD', cache:'no-store'}); return res.ok && (res.headers.get('content-type') || '').toLowerCase().includes('audio'); }
    catch { return false; }
  }));
  if (!available.every(Boolean)) return; // Never show broken players.
  const panel = document.createElement('section');
  panel.className = 'panel';
  panel.setAttribute('aria-label','REEZIE SPEAK song previews');
  const heading = document.createElement('h2');
  heading.textContent = 'LISTEN TO REEZIE SPEAK';
  panel.append(heading);
  const intro = document.createElement('p');
  intro.textContent = 'Three 30-second previews from REEZIE REEZ.';
  panel.append(intro);
  previews.forEach(track => {
    const block = document.createElement('div');
    block.style.cssText = 'margin:20px 0 24px;text-align:left;';
    const name = document.createElement('p');
    name.style.cssText = 'margin:0 0 5px;font-weight:700;color:#f5f1ea;';
    name.textContent = track.title;
    const artist = document.createElement('p');
    artist.style.cssText = 'margin:0 0 9px;font-size:13px;color:#c7a579;';
    artist.textContent = track.artist + ' · 30-second preview';
    const player = document.createElement('audio');
    player.controls = true;
    player.preload = 'none';
    player.style.cssText = 'display:block;width:100%;';
    player.src = new URL(track.file, base).href;
    player.setAttribute('aria-label', track.title + ' preview');
    player.addEventListener('play', () => document.querySelectorAll('audio').forEach(other => { if(other !== player) other.pause(); }));
    block.append(name,artist,player);
    panel.append(block);
  });
  const footer = document.querySelector('main footer');
  if (footer) footer.before(panel); else document.querySelector('main')?.append(panel);
});