// REEZIE SPEAK: Three visible native audio preview players.
document.addEventListener('DOMContentLoaded', () => {
  const tracks = [
    {title:'LOSE YOU',artist:'REEZIE REEZ',file:'LOSE_YOU_30_SEC_PREVIEW.wav'},
    {title:'THE DREAM MAKER (SUPADOPESEX EDIT)',artist:'REEZIE REEZ',file:'THE_DREAM_MAKER_SUPADOPESEX_30_SEC_PREVIEW.wav'},
    {title:"IT'S OUR 1ST CHRISTMAS",artist:'REEZIE REEZ feat. CG Saint',file:'ITS_OUR_1ST_CHRISTMAS_30_SEC_PREVIEW.wav'}
  ];
  if (document.getElementById('reezie-audio-previews')) return;
  const panel = document.createElement('section');
  panel.id = 'reezie-audio-previews';
  panel.className = 'panel';
  panel.setAttribute('aria-label','REEZIE SPEAK song previews');
  panel.innerHTML = '<h2>LISTEN TO REEZIE SPEAK</h2><p>Three exclusive 30-second song previews.</p>';
  tracks.forEach(t => {
    const block=document.createElement('div');
    block.style.cssText='margin:20px 0 24px;text-align:left';
    const name=document.createElement('p');
    name.style.cssText='margin:0 0 5px;font-weight:700;color:#f5f1ea';
    name.textContent=t.title;
    const credit=document.createElement('p');
    credit.style.cssText='margin:0 0 9px;font-size:13px;color:#c7a579';
    credit.textContent=t.artist+' · 30-second preview';
    const audio=document.createElement('audio');
    audio.controls=true;
    audio.preload='metadata';
    audio.style.cssText='display:block;width:100%';
    audio.src=new URL(t.file,new URL('./',document.baseURI)).href;
    audio.setAttribute('aria-label',t.title+' preview');
    audio.addEventListener('play',()=>panel.querySelectorAll('audio').forEach(other=>{if(other!==audio)other.pause()}));
    block.append(name,credit,audio);
    panel.append(block);
  });
  const footer=document.querySelector('main footer');
  if (footer) footer.before(panel); else document.querySelector('main')?.append(panel);
});
