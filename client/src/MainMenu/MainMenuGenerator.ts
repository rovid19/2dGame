export const mainMenuGenerator = () => {
  const div = document.createElement("div");
  div.className = "mainMenuDiv1";
  div.innerHTML = `
   
    <nav class="mainMenuNav"> 
   
    <li class="play"> Play </li>
    <li class="select"> Select Level </li>
   
    </nav> 

   
  `;

  return div;
};
