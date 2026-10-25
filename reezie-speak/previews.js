// REEZIE SPEAK audio previews — show only hosted playable previews.
document.addEventListener('DOMContentLoaded', async () => {
  const tracks = [
    { title:'LOSE YOU', artist:'REEZIE REEZ', files:['LOSE_YOU_30_SEC_PREVIEW.wav'] },
    { title:'THE DREAM MAKER (SUPADOPESEX EDIT)', artist:'REEZIE REEZ', files:['THE_DREAM_MAKER_SUPADOPESEX_30_SEC_PREVIEW.wav'] },
    { title:"IT'S OUR 1ST CHRISTMAS", artist:'REEZIE REEZ feat. CG Saint', files:['ITS_OUR_1ST_CHRISTMAS_30_SEC_PREVIEW.wav'] }
  ];
  const base = new URL('./', document.baseURI);
  const checked = await Promise.all(tracks.map(async t => {
    for (const file of t.files) {
      const url = new URL(file, base);
      try {
        const response = await fetch(url, { method:'HEAD', cache:'no-store' });
        const type = (response.headers.get('content-type') || '').toLowerCase();
        if (response.ok && (type.includes('audio') || type.includes('mpeg') || type.includes('octet-stream'))) return {...t, url:url.href};
      } catch(e) {}
    }
    return null;
  }));
  const ready = checked.filter(Boolean);
  if (!ready.length) return;
  const panel = document.createElement('section');
  panel.className = 'panel';
  panel.setAttribute('aria-label','REEZIE SPEAK song previews');
  const h = document.createElement('h2');
  h.textContent = 'LISTEN TO REEZIE SPEAK';
  const p = document.createElement('p');
  p.textContent = 'Listen to 30-second song previews.';
  panel.append(h,p);
  ready.forEach(t => {
    const block = document.createElement('div');
    block.style.cssText = 'margin:20px 0 24px;text-align:left';
    const name = document.createElement('p');
    name.style.cssText = 'margin:0 0 5px;font-weight:700;color:#f5f1ea';
    name.textContent = t.title;
    const credit = document.createElement('p');
    credit.style.cssText = 'margin:0 0 9px;font-size:13px;color:#c7a579';
    credit.textContent = t.artist + ' · 30-second preview';
    const player = document.createElement('audio');
    player.controls = true;
    player.preload = 'metadata';
    player.style.cssText = 'display:block;width:100%';
    player.src = t.url;
    player.setAttribute('aria-label', t.title+' preview');
    player.addEventListener('play', () => document.querySelectorAll('audio').forEach(other => { if(other!==player) other.pause(); }));
    block.append(name,credit,player);
    panel.append(block);
  });
  const footer = document.querySelector('main footer');
  if(footer) footer.before(panel); else document.querySelector('main')?.append(panel);
});
