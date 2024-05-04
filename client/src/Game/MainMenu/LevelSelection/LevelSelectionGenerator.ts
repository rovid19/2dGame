import { menuStore } from "../../../Stores/MenuStore";
import { playAudio, muteAudio } from "../../../Utils/IconsExports";

export const levelSelectionUiGenerator = (): HTMLElement => {
  const isAudioPlaying = menuStore.get("audioPlaying");

  const div = document.createElement("div");
  div.className = "levelSelectionDiv1";
  div.innerHTML = `
     <button class="buton"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="50">
     
     <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
   </svg>
 </button>   
 <button class="audioBtnLevel" > ${isAudioPlaying ? playAudio : muteAudio}
     </button>
      <div class="levelSelect"> 
      
      <div class="level1"> </div>
      <div class="level2"> </div>
      <div class="level3"> </div>
      <div class="level4"> </div>
      <div class="level5"> </div>
      <div class="level6"> </div>

      </div>
  
     
    `;

  return div;
};
