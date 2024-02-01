export const mainMenuGenerator = () => {
  const div = document.createElement("div");
  div.className = "mainMenuDiv1";
  div.innerHTML = `
   
    <nav class="mainMenuNav"> 
   
    <li id="play" class="sixtyfour-myapp"> <span class="liText" >Play </span></li>
    <li id="select" class="sixtyfour-myapp"> <span class="liText" >Select Level</span> </li>
   
    </nav> 

   
  `;

  return div;
};
