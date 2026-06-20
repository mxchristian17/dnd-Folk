(function(){
  const DB_NAME='folk_audio_db';
  const STORE='files';
  const DEFAULT_CATEGORY='music';
  const CATEGORIES=[
    {key:'music',label:'Musicas',hint:'Ambientes, temas y fondos largos'},
    {key:'effect',label:'Efectos',hint:'Golpes, hechizos, cues cortos'}
  ];
  const objectUrls=new Map();
  let initialized=false;

  window.audioDB=null;

  function openDB(){
    return new Promise((res,rej)=>{
      const r=indexedDB.open(DB_NAME,1);
      r.onupgradeneeded=e=>{
        const db=e.target.result;
        if(!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE,{keyPath:'id'});
      };
      r.onsuccess=()=>res(r.result);
      r.onerror=()=>rej(r.error);
    });
  }

  async function db(){
    return window.audioDB||(window.audioDB=await openDB());
  }

  async function getAll(){
    const database=await db();
    return new Promise((res,rej)=>{
      const tx=database.transaction(STORE,'readonly');
      const req=tx.objectStore(STORE).getAll();
      req.onsuccess=()=>res(req.result||[]);
      req.onerror=()=>rej(req.error);
    });
  }

  async function saveFile(file,category){
    const database=await db();
    const record={
      id:crypto.randomUUID(),
      name:file.name,
      category,
      mime:file.type,
      createdAt:Date.now(),
      blob:file
    };
    return new Promise((res,rej)=>{
      const tx=database.transaction(STORE,'readwrite');
      tx.objectStore(STORE).put(record);
      tx.oncomplete=()=>res(record);
      tx.onerror=()=>rej(tx.error);
    });
  }

  async function deleteFile(id){
    const database=await db();
    return new Promise((res,rej)=>{
      const tx=database.transaction(STORE,'readwrite');
      tx.objectStore(STORE).delete(id);
      tx.oncomplete=()=>res();
      tx.onerror=()=>rej(tx.error);
    });
  }

  function audioUrl(file){
    if(!objectUrls.has(file.id)) objectUrls.set(file.id,URL.createObjectURL(file.blob));
    return objectUrls.get(file.id);
  }

  function categoryOf(file){
    return file.category||DEFAULT_CATEGORY;
  }

  function shellHTML(){
    return `<div class="card audio-manager">
      <div class="ctitle">Audio Manager</div>
      <div class="audio-grid">
        ${CATEGORIES.map(cat=>`
          <section class="audio-column" data-audio-category="${cat.key}">
            <div class="audio-column-head">
              <div>
                <div class="audio-title">${cat.label}</div>
                <div class="audio-hint">${cat.hint}</div>
              </div>
              <label class="btn audio-upload">
                + Cargar
                <input type="file" multiple accept="audio/*" data-audio-input="${cat.key}">
              </label>
            </div>
            <div class="audio-drop" data-audio-drop="${cat.key}">
              Arrastra audio aca
            </div>
            <div class="audio-list" id="audio-list-${cat.key}"></div>
          </section>
        `).join('')}
      </div>
    </div>`;
  }

  function rowHTML(file){
    return `<div class="audio-name">${file.name}</div>
      <div class="audio-row-actions">
        <audio controls preload="metadata" src="${audioUrl(file)}"></audio>
        <button class="btn dan audio-delete" type="button" data-audio-delete="${file.id}">Borrar</button>
      </div>`;
  }

  function appendFile(file){
    const list=document.getElementById(`audio-list-${categoryOf(file)}`);
    if(!list||list.querySelector(`[data-audio-id="${file.id}"]`)) return;
    const row=document.createElement('div');
    row.className='audio-item';
    row.dataset.audioId=file.id;
    row.innerHTML=rowHTML(file);
    list.appendChild(row);
  }

  async function addFiles(files,category){
    const saved=[];
    for(const file of files){
      if(!file.type.startsWith('audio/')) continue;
      saved.push(await saveFile(file,category));
    }
    saved.forEach(appendFile);
    if(saved.length) toast(`${saved.length} audio${saved.length>1?'s':''} cargado${saved.length>1?'s':''}`);
  }

  function bindEvents(root){
    root.querySelectorAll('[data-audio-input]').forEach(input=>{
      input.addEventListener('change',async e=>{
        await addFiles(Array.from(e.target.files||[]),e.target.dataset.audioInput);
        e.target.value='';
      });
    });

    root.querySelectorAll('[data-audio-drop]').forEach(drop=>{
      drop.addEventListener('dragover',e=>{
        e.preventDefault();
        drop.classList.add('over');
      });
      drop.addEventListener('dragleave',()=>drop.classList.remove('over'));
      drop.addEventListener('drop',async e=>{
        e.preventDefault();
        drop.classList.remove('over');
        await addFiles(Array.from(e.dataTransfer.files||[]),e.currentTarget.dataset.audioDrop);
      });
    });

    root.addEventListener('click',async e=>{
      const btn=e.target.closest('[data-audio-delete]');
      if(!btn) return;
      const id=btn.dataset.audioDelete;
      await deleteFile(id);
      const url=objectUrls.get(id);
      if(url) URL.revokeObjectURL(url);
      objectUrls.delete(id);
      btn.closest('.audio-item')?.remove();
      toast('Audio eliminado');
    });
  }

  window.renderAudio=async function(){
    const el=document.getElementById('sec-audio');
    if(!el) return;
    if(!initialized||!el.querySelector('.audio-manager')){
      el.innerHTML=shellHTML();
      bindEvents(el);
      initialized=true;
    }
    const files=await getAll();
    files.sort((a,b)=>(a.createdAt||0)-(b.createdAt||0)).forEach(appendFile);
  };

  const oldShow=window.showSection;
  window.showSection=function(section){
    oldShow(section);
    if(section==='audio') setTimeout(window.renderAudio,0);
  };
})();
