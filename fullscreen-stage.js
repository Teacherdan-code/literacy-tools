document.querySelectorAll('.stage-fullscreen').forEach(btn=>{
  btn.addEventListener('click',async()=>{
    const wrap=btn.closest('.stage-wrap');
    try{
      if(document.fullscreenElement===wrap){
        await document.exitFullscreen();
      }else{
        await wrap.requestFullscreen();
      }
    }catch(e){}
  });
});

document.addEventListener('fullscreenchange',()=>{
  document.querySelectorAll('.stage-fullscreen').forEach(btn=>{
    btn.textContent=document.fullscreenElement===btn.closest('.stage-wrap')?'Exit Full Screen':'Full Screen';
  });
});