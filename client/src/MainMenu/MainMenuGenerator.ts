import { muteAudio, playAudio } from "../IconsExports";
import { menuStore } from "../Stores/MenuStore";

const isAudioPlaying = menuStore.get("audioPlaying");

export const mainMenuGenerator = (): HTMLElement => {
  const div = document.createElement("div");
  div.className = "mainMenuDiv1";
  div.innerHTML = `
   
    <nav class="mainMenuNav"> 
   
    
   
    </nav> 

   
  `;

  return div;
};

export const mainMenuNavGenerator = (): HTMLElement => {
  const nav = document.createElement("nav");
  nav.className = "mainMenuNav";
  nav.innerHTML = `
  <button class="audioBtn"> ${isAudioPlaying ? playAudio : muteAudio}
</button>
    <li id="play" class="sixtyfour-myapp"> <span class="liText" >Play </span></li>
    <li id="select" class="sixtyfour-myapp"> <span class="liText" >Select Level</span> </li> 
  `;

  return nav;
};
