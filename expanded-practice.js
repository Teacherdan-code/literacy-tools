(() => {
  const $ = s => document.querySelector(s);
  const shuffle = a => { const x=[...a]; for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];} return x; };
  const unique = a => [...new Set(a)];
  const take = (bank,count) => {
    const clean=unique(bank);
    if(count<=clean.length) return shuffle(clean).slice(0,count);
    let out=[]; while(out.length<count) out.push(...shuffle(clean)); return out.slice(0,count);
  };

  const skillBanks={
    'Short a':['cat','map','jam','hat','bat','man','fan','pan','ram','rag','bag','tag','sad','mad','dad','lap','cap','tap','nap','van','wax','max','gas','cab','ham','hand','sand','land','band','camp','lamp','stamp','flag','drag','crab','clap','trap','snap','plan','plant','black','glass','stand','track','branch','crash','grand','stack','smash'],
    'Short i':['sit','fin','pin','win','lip','dip','rip','kid','hid','lid','pig','dig','fig','mix','six','fit','hit','bit','ship','fish','dish','wish','milk','silk','gift','hill','fill','pill','grin','spin','swim','clip','drip','brick','stick','trim','slip','print','chill','quick','skip','skin','trip','grip','mint','wind','list','mist','crisp','spring'],
    'Short o':['hot','log','dog','fog','hop','mop','top','pot','cot','dot','rod','nod','job','fox','box','rock','sock','lock','stop','shop','spot','frog','clock','pond','block','drop','chop','cross','plot','strong','flock','crop','drum','from','lost','soft','cost','mock','shock','stock','clog','plot','snot','smog','trot','chomp','prompt','frost','blob','gloss'],
    'Short e':['bed','red','leg','hen','pen','ten','web','jet','net','pet','men','yes','step','best','tent','shell','dress','left','fresh','chest','rest','sled','neck','press','check','blend','help','spent','smell','fled','stem','desk','next','bend','send','went','kept','west','nest','shed','when','them','then','bell','fell','mess','less','fret','sled','swept'],
    'Short u':['sun','cup','mud','bug','rug','hug','cut','hut','nut','fun','run','gum','bus','tub','sub','jump','truck','drum','brush','club','hunt','must','duck','plug','crush','luck','stump','dust','shut','bump','trust','slug','snug','fund','dump','rush','such','much','lunch','bunch','chunk','grub','plum','drunk','thumb','scrub','stuck','crust','blunt','grunt'],
    'Mixed Short Vowels':[],
    'Initial / Final s-Blends':['stop','spin','step','skin','smell','snack','spot','skip','slam','slip','slid','sled','snap','snip','snug','swim','swell','swing','best','fast','rest','mask','desk','crisp','trust','list','mist','lost','cost','nest','dust','past','last','fist','test','stamp','spent','stand','skunk','spell','spill','smash','sniff','splot','stomp','sprint','twist','crust','blast'],
    'l- and t-Blends':['clap','clip','clog','club','flag','flat','flip','flop','glad','glass','plug','plan','plant','plum','black','blue','blot','blend','trip','trim','track','truck','drum','drop','frog','crab','dress','twin','twig','swim','slip','sled','glum','flap','flit','clam','clan','blob','bleed','trap','trend','trot','drip','drag','grid','grin','pram','press','brick','brag'],
    'r-Blends':['crab','crop','cram','crisp','drum','drag','drip','dress','frog','fresh','from','grin','grab','grass','grid','grand','prize','press','print','pram','track','trip','truck','trim','brush','brick','crash','drink','frill','frost','grub','grip','prong','prop','brag','brim','broom','crack','drill','frame','grape','press','prick','trend','trick','trunk','brisk','grump','draft','print'],
    'ch and sh':['chip','chat','chop','chin','chill','chest','check','much','rich','such','lunch','bench','branch','crunch','ship','shop','shut','shed','shell','shin','fish','wish','dish','rush','brush','fresh','crush','shock','shack','flash','smash','trash','splash','chick','chess','chunk','chum','chop','shift','shrug','shrub','shred','chomp','chuck','march','inch','patch','match','cash','dash'],
    'th, wh, and ck':['this','that','them','then','thin','thick','than','with','bath','math','path','moth','when','whip','whiz','whisk','which','what','back','rock','duck','check','clock','track','brick','stick','pack','sock','luck','neck','kick','lock','snack','black','crack','stack','truck','quick','shock','thud','thumb','thank','think','wham','whim','whack','clock','flick','block','chick'],
    'Silent-e Long a':['make','game','late','same','name','cake','lake','gate','date','wave','save','cave','plane','grade','shape','brave','trade','place','frame','skate','chase','whale','shade','grape','stage','plate','crane','space','flame','blame','snake','stake','brake','scale','state','crate','glaze','maze','tape','cape','case','race','safe','fake','take','wake','pale','male','sale','bake'],
    'Silent-e Long i':['time','ride','bike','line','mile','five','nine','kite','hide','wide','smile','drive','white','shine','slide','prize','stripe','while','spine','bride','quite','chime','slice','spike','crime','dime','lime','mine','fine','pipe','ripe','site','bite','life','wife','wise','rise','size','tire','fire','wire','drive','shine','glide','bride','price','twice','slime','spite','write'],
    'Silent-e Long o':['home','note','rope','stone','bone','cone','hope','joke','rose','close','globe','those','smoke','broke','chose','slope','stove','phone','whole','woke','rode','code','mode','vote','mole','pole','hole','role','tone','zone','dome','nose','pose','dose','robe','globe','spoke','stroke','froze','clove','drove','shore','more','core','store','score','snore','before','alone','remote'],
    'Silent-e Long u':['cube','tune','cute','mule','use','June','rule','flute','huge','tube','fume','dune','rude','pure','mute','fuse','duke','prune','plume','excuse','huge','muse','cute','cube','tune','tube','rule','flute','brute','crude','rude','prune','June','use','fuse','mule','dune','mute','huge','plume'],
    'Mixed Silent-e':[],
    'igh and oa':['light','night','right','bright','sight','high','might','tight','flight','fright','slight','fight','road','boat','coat','goat','float','toast','coach','loaf','roast','oak','goal','load','toad','foam','roam','soak','coal','moan','groan','cloak','croak','shoal','throat','high','sigh','night','light','right','bright','flight','tight','boat','road','coat','float','toast','coach','roast','loaf'],
    'ee and oe':['see','green','feet','sleep','week','deep','tree','three','seed','feel','free','need','keep','peel','queen','meet','feet','sheet','street','sweet','creek','cheek','wheel','steel','sleep','sheep','toe','hoe','foe','doe','goes','toe','hoe','foe','doe','see','green','keep','need','queen','three','street','sheet','sweet','peel','deep','week','seed','feel','free'],
    'ai / ay / oi / oy':['rain','train','paint','mail','wait','chain','brain','plain','snail','trail','sail','tail','nail','claim','grain','play','stay','day','clay','gray','spray','tray','way','may','say','pay','coin','join','soil','point','boil','foil','coil','spoil','boy','toy','joy','enjoy','royal','loyal','delay','display','today','rail','maid','paint','brain','joint','choice','avoid'],
    'au and aw':['haul','pause','cause','fault','launch','author','August','sauce','draw','saw','straw','claw','hawk','crawl','lawn','yawn','raw','shawl','dawn','paws','jaw','law','paw','awful','fawn','stalk','talk','walk','chalk','brawl','drawn','sauce','pause','fault','haul','launch','hawk','straw','claw','crawl'],
    'Unpredictable Vowel Teams':['head','bread','thread','dead','ready','great','steak','break','snow','grow','show','blow','low','slow','cow','town','down','brown','crowd','how','book','look','cook','foot','good','wood','moon','room','food','school','pool','cloud','house','round','found','sound','group','soup','touch','young','should','could','would','country','double','trouble','rough','through','though','bought'],
    'Vowel-r':['car','star','farm','park','dark','hard','start','sharp','cart','barn','fork','storm','short','north','horn','corn','sport','born','more','shore','her','term','fern','serve','bird','first','third','shirt','girl','turn','curl','burn','hurt','burst','nurse','church','smart','march','porch','storm','thorn','word','work','world','warm','ward','swarm','learn','earth','early'],
    'Silent Letters':['knee','knock','knife','write','wrong','wrap','lamb','thumb','sign','gnaw','wrist','knot','wreck','climb','comb','knit','known','wrote','crumb','gnat','knob','kneel','knife','knock','wring','wren','wrench','wrist','wrap','wrong','lamb','limb','climb','thumb','comb','dumb','sign','design','gnaw','gnat'],
    'Complex Consonants':['badge','bridge','edge','judge','ridge','fudge','large','change','cage','stage','match','catch','pitch','fetch','hatch','patch','watch','duck','pack','kick','milk','bank','city','cent','race','face','giant','gem','magic','page','soft','cycle','fancy','gentle','huge','bridge','badge','judge','match','catch','pitch','fetch','pack','city','cent','giant','gem','race','cage','ridge'],
    'Phonograms':['sing','ring','king','wing','thing','bring','sang','rang','bang','hang','song','long','strong','wrong','bank','tank','rank','sink','pink','wink','old','cold','gold','fold','hold','told','wild','mild','child','find','kind','mind','all','ball','call','fall','wall','walk','talk','chalk','stalk','most','post','host','lost','bolt','colt','roll','toll'],
    'Closed-Closed Multisyllable':['sunset','rabbit','picnic','basket','napkin','magnet','dentist','contest','helmet','pumpkin','hundred','sandwich','catfish','bedbug','dishpan','hotdog','zigzag','kidnap','sunfish','bathtub','cactus','fabric','plastic','traffic','finish','visit','habit','rapid','comic','limit','robin','seven','melon','lemon','tennis','fossil','problem','button','muffin','kitten'],
    'Consonant-le Syllables':['table','little','purple','candle','handle','jungle','puzzle','simple','middle','apple','bubble','maple','turtle','circle','giggle','ripple','bundle','cradle','staple','needle','bottle','gentle','sample','single','uncle','ankle','wiggle','mumble','sparkle','title']
  };
  skillBanks['Mixed Short Vowels']=unique(['Short a','Short i','Short o','Short e','Short u'].flatMap(k=>skillBanks[k]));
  skillBanks['Mixed Silent-e']=unique(['Silent-e Long a','Silent-e Long i','Silent-e Long o','Silent-e Long u'].flatMap(k=>skillBanks[k]));

  const gradeSkills={
    'K|boy':['Short a','Short i'],
    'K|eoy':['Mixed Short Vowels','Mixed Silent-e'],
    '1|boy':['Mixed Short Vowels','Initial / Final s-Blends','l- and t-Blends','r-Blends','ch and sh','th, wh, and ck'],
    '1|eoy':['Mixed Silent-e','Phonograms','igh and oa','ee and oe','ai / ay / oi / oy','au and aw','Unpredictable Vowel Teams','Vowel-r','Closed-Closed Multisyllable'],
    '2|boy':['Initial / Final s-Blends','ch and sh','th, wh, and ck','Mixed Silent-e','Phonograms','igh and oa','ee and oe','ai / ay / oi / oy','au and aw'],
    '2|eoy':['Unpredictable Vowel Teams','Vowel-r','Silent Letters','Complex Consonants','Consonant-le Syllables','Closed-Closed Multisyllable']
  };

  const irregularMap={
    said:[['s','/s/',0],['ai','/ĕ/',1],['d','/d/',0]], was:[['w','/w/',0],['a','/ŭ/',1],['s','/z/',1]],
    come:[['c','/k/',0],['o','/ŭ/',1],['m','/m/',0],['e','silent',1]], some:[['s','/s/',0],['o','/ŭ/',1],['m','/m/',0],['e','silent',1]],
    does:[['d','/d/',0],['oe','/ŭ/',1],['s','/z/',1]], you:[['y','/y/',0],['ou','/oo/',1]], they:[['th','/th/',0],['ey','/ā/',1]],
    of:[['o','/ŭ/',1],['f','/v/',1]], were:[['w','/w/',0],['ere','/er/',1]], where:[['wh','/w/',0],['ere','/air/',1]],
    again:[['a','/ə/',1],['g','/g/',0],['ai','/ĕ/',1],['n','/n/',0]], because:[['be','/bə/',1],['cause','/kŭz/',1]],
    one:[['o','/w/',1],['ne','/ŭn/',1]], two:[['t','/t/',0],['w','silent',1],['o','/oo/',1]], could:[['c','/k/',0],['ou','/ŭ/',1],['l','silent',1],['d','/d/',0]],
    would:[['w','/w/',0],['ou','/ŭ/',1],['l','silent',1],['d','/d/',0]], should:[['sh','/sh/',0],['ou','/ŭ/',1],['l','silent',1],['d','/d/',0]],
    have:[['h','/h/',0],['a','/ă/',0],['v','/v/',0],['e','silent',1]], give:[['g','/g/',0],['i','/ĭ/',0],['v','/v/',0],['e','silent',1]],
    live:[['l','/l/',0],['i','/ĭ/',0],['v','/v/',0],['e','silent',1]], been:[['b','/b/',0],['ee','/ĭ/',1],['n','/n/',0]], friend:[['f','/f/',0],['r','/r/',0],['ie','/ĕ/',1],['n','/n/',0],['d','/d/',0]]
  };
  const hfwBase={
    beginning:['a','I','am','an','and','at','can','did','get','had','has','he','him','his','in','is','it','me','my','no','not','on','red','run','see','she','so','the','to','up','we','will','yes'],
    developing:['after','all','are','ask','be','by','came','day','down','find','for','from','go','going','help','here','how','just','like','look','make','may','old','open','over','play','put','ride','round','stop','take','them','then','think','time','walk','want','went','white','with'],
    irregular:['said','was','some','come','does','you','they','of','were','where','again','because','one','two','could','would','should','have','give','live','been','friend']
  };
  const hfwGrade={
    'K|boy':['a','I','am','at','can','he','in','is','it','me','my','no','on','see','the','to','up','we'],
    'K|eoy':unique([...hfwBase.beginning,...['come','said','was','you','they','have','one','two']]),
    '1|boy':unique([...hfwBase.beginning,...hfwBase.irregular.slice(0,12)]),
    '1|eoy':unique([...hfwBase.beginning,...hfwBase.developing,...hfwBase.irregular]),
    '2|boy':unique([...hfwBase.developing,...hfwBase.irregular,...['always','around','before','both','fast','five','green','made','right','sleep','their','those','very','wash','wish','write']]),
    '2|eoy':unique([...hfwBase.developing,...hfwBase.irregular,...['always','around','before','both','fast','five','green','made','right','sleep','their','those','very','wash','wish','write','first','found','many','off','read','upon','which','work','your']])
  };

  function addOption(select,value,label){ if(![...select.options].some(o=>o.value===value)) select.add(new Option(label,value)); }
  ['#wfCount','#hfCount'].forEach(sel=>{const el=$(sel); if(el){addOption(el,'30','30');addOption(el,'50','50');}});
  Object.keys(skillBanks).forEach(k=>{const sel=$('#wfPattern'); if(sel&&!([...sel.options].some(o=>o.value===k))) sel.add(new Option(k,k));});

  function insertBrowseControls(prefix, anchorSelector){
    const controls=$(anchorSelector); if(!controls) return;
    const mode=controls.querySelector(`#${prefix}Mode`); if(!mode) return;
    const wrap=document.createElement('div'); wrap.className='browse-controls';
    wrap.innerHTML=`<label>Choose by<select id="${prefix}Browse"><option value="skill">Skill / Set</option><option value="grade">Grade Level</option></select></label><div id="${prefix}GradeOptions" class="grade-options hidden"><label>Grade<select id="${prefix}Grade"><option value="K">K</option><option value="1">1</option><option value="2">2</option></select></label><label>Time of Year<select id="${prefix}Point"><option value="boy">Beginning of Year</option><option value="eoy">End of Year</option></select></label></div>`;
    mode.parentElement.insertAdjacentElement('afterend',wrap);
  }
  insertBrowseControls('wf','#wordFlash .controls');
  insertBrowseControls('hf','#hfw .controls');
  const wfPatternLabel=$('#wfPattern')?.closest('label');
  const hfSetLabel=$('#hfSet')?.closest('label');
  function syncBrowse(prefix,label){const grade=$(`#${prefix}Browse`)?.value==='grade';$(`#${prefix}GradeOptions`)?.classList.toggle('hidden',!grade);label?.classList.toggle('hidden',grade);}
  $('#wfBrowse')?.addEventListener('change',()=>syncBrowse('wf',wfPatternLabel));
  $('#hfBrowse')?.addEventListener('change',()=>syncBrowse('hf',hfSetLabel));

  function currentWFBank(){
    if($('#wfBrowse')?.value==='grade'){
      const keys=gradeSkills[`${$('#wfGrade').value}|${$('#wfPoint').value}`]||[];
      return unique(keys.flatMap(k=>skillBanks[k]||[]));
    }
    return skillBanks[$('#wfPattern').value]||[];
  }
  function currentHFBank(){
    if($('#hfBrowse')?.value==='grade') return hfwGrade[`${$('#hfGrade').value}|${$('#hfPoint').value}`]||[];
    const key=$('#hfSet').value==='tricky'?'irregular':$('#hfSet').value;
    if(key==='mixed') return unique([...hfwBase.beginning,...hfwBase.developing,...hfwBase.irregular]);
    return hfwBase[key]||[];
  }

  const wfState={seq:[],i:0,t:null,paused:false,phase:'show'};
  function wfCounter(){ $('#wfCounter').textContent=wfState.seq.length?`${wfState.i+1} of ${wfState.seq.length}`:''; }
  function wfDone(){clearTimeout(wfState.t);$('#wfWord').textContent='Complete';$('#wfPrompt').textContent='';$('#wfAction').classList.add('hidden');$('#wfPause').classList.add('hidden');$('#wfCounter').textContent=`${wfState.seq.length} words`;}
  function wfGuided(){wfCounter();$('#wfWord').textContent=wfState.seq[wfState.i];$('#wfPrompt').textContent='Read the word.';$('#wfAction').textContent='Hide';$('#wfAction').classList.remove('hidden');$('#wfPause').classList.add('hidden');}
  function wfAuto(){if(wfState.paused)return;if(wfState.i>=wfState.seq.length)return wfDone();wfCounter();$('#wfWord').textContent=wfState.seq[wfState.i];$('#wfPrompt').textContent='';$('#wfAction').classList.add('hidden');$('#wfPause').classList.remove('hidden');wfState.t=setTimeout(()=>{$('#wfWord').textContent='';wfState.t=setTimeout(()=>{wfState.i++;wfAuto();},Number($('#wfBlankTime').value));},Number($('#wfWordTime').value));}
  function startWF2(){clearTimeout(wfState.t);wfState.seq=take(currentWFBank(),Number($('#wfCount').value));wfState.i=0;wfState.paused=false;wfState.phase='show';$('#wfPause').textContent='Pause';$('#wfRestart').classList.remove('hidden');$('#wfMode').value==='auto'?wfAuto():wfGuided();}
  $('#wfStart').addEventListener('click',e=>{e.stopImmediatePropagation();startWF2();},true);
  $('#wfRestart').addEventListener('click',e=>{e.stopImmediatePropagation();startWF2();},true);
  $('#wfPause').addEventListener('click',e=>{e.stopImmediatePropagation();wfState.paused=!wfState.paused;clearTimeout(wfState.t);$('#wfPause').textContent=wfState.paused?'Resume':'Pause';if(!wfState.paused)wfAuto();},true);
  $('#wfAction').addEventListener('click',e=>{e.stopImmediatePropagation();if(wfState.phase==='show'){wfState.phase='hide';$('#wfWord').textContent='';$('#wfPrompt').textContent='Think. Read it in your head.';$('#wfAction').textContent='Reveal';}else if(wfState.phase==='hide'){wfState.phase='reveal';$('#wfWord').textContent=wfState.seq[wfState.i];$('#wfPrompt').textContent='Read it again.';$('#wfAction').textContent='Next Word';}else{wfState.i++;wfState.phase='show';wfState.i>=wfState.seq.length?wfDone():wfGuided();}},true);

  const hfState={seq:[],i:0,t:null,paused:false,phase:'show'};
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function hfCounter(){ $('#hfCounter').textContent=hfState.seq.length?`${hfState.i+1} of ${hfState.seq.length}`:''; }
  function renderHFMap(word){const map=irregularMap[word.toLowerCase()];if(!map){$('#hfMap').classList.add('hidden');return false;}$('#hfMap').innerHTML=map.map(x=>`<div class="sound-box ${x[2]?'tricky':''}"><b>${esc(x[0])}</b><small>${esc(x[1])}</small></div>`).join('');$('#hfMap').classList.remove('hidden');return true;}
  function hfDone2(){clearTimeout(hfState.t);$('#hfWord').textContent='Complete';$('#hfMap').classList.add('hidden');$('#hfPrompt').textContent='';$('#hfAction').classList.add('hidden');$('#hfPause').classList.add('hidden');$('#hfCounter').textContent=`${hfState.seq.length} words`;}
  function hfGuided2(){hfCounter();const w=hfState.seq[hfState.i];$('#hfWord').textContent=w;$('#hfMap').classList.add('hidden');$('#hfPrompt').textContent='Read the word.';$('#hfAction').textContent='Hide';$('#hfAction').classList.remove('hidden');$('#hfPause').classList.add('hidden');}
  function hfAuto2(){if(hfState.paused)return;if(hfState.i>=hfState.seq.length)return hfDone2();hfCounter();$('#hfWord').textContent=hfState.seq[hfState.i];$('#hfMap').classList.add('hidden');$('#hfPrompt').textContent='';$('#hfAction').classList.add('hidden');$('#hfPause').classList.remove('hidden');hfState.t=setTimeout(()=>{$('#hfWord').textContent='';hfState.t=setTimeout(()=>{hfState.i++;hfAuto2();},Number($('#hfBlankTime').value));},Number($('#hfWordTime').value));}
  function startHF2(){clearTimeout(hfState.t);hfState.seq=take(currentHFBank(),Number($('#hfCount').value));hfState.i=0;hfState.paused=false;hfState.phase='show';$('#hfPause').textContent='Pause';$('#hfRestart').classList.remove('hidden');$('#hfMode').value==='auto'?hfAuto2():hfGuided2();}
  $('#hfStart').addEventListener('click',e=>{e.stopImmediatePropagation();startHF2();},true);
  $('#hfRestart').addEventListener('click',e=>{e.stopImmediatePropagation();startHF2();},true);
  $('#hfPause').addEventListener('click',e=>{e.stopImmediatePropagation();hfState.paused=!hfState.paused;clearTimeout(hfState.t);$('#hfPause').textContent=hfState.paused?'Resume':'Pause';if(!hfState.paused)hfAuto2();},true);
  $('#hfAction').addEventListener('click',e=>{e.stopImmediatePropagation();const w=hfState.seq[hfState.i];if(hfState.phase==='show'){hfState.phase='hide';$('#hfWord').textContent='';$('#hfMap').classList.add('hidden');$('#hfPrompt').textContent='Read it in your head.';$('#hfAction').textContent='Reveal';}else if(hfState.phase==='hide'){hfState.phase='reveal';$('#hfWord').textContent=w;const mapped=$('#hfMapping').checked&&renderHFMap(w);$('#hfPrompt').textContent=mapped?'Connect the sounds to the spelling.':'Read the word again.';$('#hfAction').textContent='Next Word';}else{hfState.i++;hfState.phase='show';hfState.i>=hfState.seq.length?hfDone2():hfGuided2();}},true);
})();