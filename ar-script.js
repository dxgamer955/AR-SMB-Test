document.addEventListener("DOMContentLoaded", () => {
  // Desactivar el menú contextual (clic derecho)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // Elementos de la interfaz
  const startButton = document.getElementById("start-button");
  const loadingScreen = document.getElementById("loading-screen");
  const errorMessage = document.getElementById("error-message");

  // Elementos de estado
  const aframeStatus = document.getElementById("aframe-status");
  const arjsStatus = document.getElementById("arjs-status");
  const markerStatus = document.getElementById("marker-status-ui");
  const cameraStatus = document.getElementById("camera-status");

  // CREAR CONTROLES DE ROTACIÓN EN PANTALLA
  const createRotationControls = () => {
    const controls = document.createElement("div");
    controls.id = "rotation-controls";
    controls.style.position = "fixed";
    controls.style.bottom = "20px";
    controls.style.left = "50%";
    controls.style.transform = "translateX(-50%)";
    controls.style.display = "none";
    controls.style.gap = "15px";
    controls.style.zIndex = "2000";
    controls.style.alignItems = "center";
    controls.style.flexDirection = "column";

    // Contenedor para botones de rotación
    const rotationButtons = document.createElement("div");
    rotationButtons.style.display = "flex";
    rotationButtons.style.gap = "15px";

    // Botón Rotar Izquierda
    const leftBtn = document.createElement("button");
    leftBtn.className = "rotation-btn";
    leftBtn.innerHTML = "↻ Izquierda";
    leftBtn.style.padding = "10px 15px";
    leftBtn.style.backgroundColor = "rgba(0,0,0,0.7)";
    leftBtn.style.color = "white";
    leftBtn.style.border = "none";
    leftBtn.style.borderRadius = "20px";
    leftBtn.style.fontSize = "16px";

    // Botón Rotar Derecha
    const rightBtn = document.createElement("button");
    rightBtn.className = "rotation-btn";
    rightBtn.innerHTML = "↺ Derecha";
    rightBtn.style.padding = "10px 15px";
    rightBtn.style.backgroundColor = "rgba(0,0,0,0.7)";
    rightBtn.style.color = "white";
    rightBtn.style.border = "none";
    rightBtn.style.borderRadius = "20px";
    rightBtn.style.fontSize = "16px";

    // Botón Detener Rotación
    const stopBtn = document.createElement("button");
    stopBtn.className = "stop-rotation-btn";
    stopBtn.innerHTML = "⏹ Detener";
    stopBtn.style.padding = "10px 15px";
    stopBtn.style.backgroundColor = "rgba(255,0,0,0.7)";
    stopBtn.style.color = "white";
    stopBtn.style.border = "none";
    stopBtn.style.borderRadius = "20px";
    stopBtn.style.fontSize = "16px";

    rotationButtons.appendChild(leftBtn);
    rotationButtons.appendChild(rightBtn);
    controls.appendChild(rotationButtons);
    controls.appendChild(stopBtn);
    document.body.appendChild(controls);

    return { controls, leftBtn, rightBtn, stopBtn };
  };

  // CREAR PANEL DE INFORMACIÓN DEL MORIVIVI
  const createMoriPanel = () => {
    const panel = document.createElement("div");
    panel.id = "morivivi-info";
    panel.style.position = "fixed";
    panel.style.top = "20px";
    panel.style.right = "20px";
    panel.style.width = "300px";
    panel.style.backgroundColor = "rgba(0, 0, 0, 0.80)";
    panel.style.borderRadius = "15px";
    panel.style.padding = "15px";
    panel.style.color = "white";
    panel.style.fontFamily = '"Super Mario", Arial, sans-serif';
    panel.style.border = "4px solid white";
    panel.style.boxShadow = "0 0 20px rgba(50, 50, 255, 0.5)";
    panel.style.display = "none";
    panel.style.zIndex = "2000";
    panel.style.backdropFilter = "blur(5px)";

    panel.innerHTML = `
      <h2 style="margin-top: 0; text-align: center; color: lightgreen; text-shadow: 2px 2px 0 green;">🌿 Moriviví</h2>
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mimosa_pudica_Blanco2.253-cropped.jpg/800px-Mimosa_pudica_Blanco2.253-cropped.jpg"
             alt="Moriviví" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
        <div>
          <p style="margin: 5px 0; font-weight: bold;">Nombre científico: <em>Mimosa pudica</em></p>
          <p style="margin: 5px 0;">🌱 Planta sensitiva</p>
        </div>
      </div>
      <p style="margin: 10px 0;">El moriviví es una planta que reacciona al tacto cerrando sus hojas:</p>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>Reacción de defensa natural</li>
        <li>Popular por su curiosa respuesta al estímulo</li>
        <li>Usada con fines educativos y medicinales</li>
      </ul>
      <p style="text-align: center; font-style: italic; margin-bottom: 0;">
        "¡Tócala y verás cómo se esconde!"
      </p>
    `;

    // Botón de cerrar
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "×";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "5px";
    closeBtn.style.right = "10px";
    closeBtn.style.background = "none";
    closeBtn.style.border = "none";
    closeBtn.style.color = "white";
    closeBtn.style.fontSize = "24px";
    closeBtn.style.cursor = "pointer";
    closeBtn.addEventListener("click", () => {
      panel.style.display = "none";
    });

    panel.appendChild(closeBtn);
    document.body.appendChild(panel);
    return panel;
  };

  // CREAR PANEL DE INFORMACIÓN DEL ZUMBADORCITO
  const createBooInfoPanel = () => {
    const panel = document.createElement("div");
    panel.id = "zumb-info";
    panel.style.position = "fixed";
    panel.style.top = "20px";
    panel.style.left = "20px";
    panel.style.width = "300px";
    panel.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    panel.style.borderRadius = "15px";
    panel.style.padding = "15px";
    panel.style.color = "white";
    panel.style.fontFamily = '"Super Mario", Arial, sans-serif';
    panel.style.border = "4px solid white";
    panel.style.boxShadow = "0 0 20px rgba(255, 50, 255, 0.5)";
    panel.style.display = "none";
    panel.style.zIndex = "2000";
    panel.style.backdropFilter = "blur(5px)";

    panel.innerHTML = `
      <h2 style="margin-top: 0; text-align: center; color: lightblue; text-shadow: 2px 2px 0 navy;">🐦 Zumbadorcito</h2>
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://cdn.download.ams.birds.cornell.edu/api/v1/asset/106844321/320" 
             alt="Zumbadorcito" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
        <div>
          <p style="margin: 5px 0; font-weight: bold;">Nombre científico: <em>Mellisuga helenae</em></p>
          <p style="margin: 5px 0;">🌸 El colibrí más pequeño del mundo</p>
        </div>
      </div>
      <p style="margin: 10px 0;">El zumbadorcito es una joya voladora endémica del Caribe:</p>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>Mide solo unos 5-6 cm</li>
        <li>Puede batir sus alas hasta 80 veces por segundo</li>
        <li>Es vital para la polinización de muchas plantas</li>
      </ul>
      <p style="text-align: center; font-style: italic; margin-bottom: 0;">
        "¡Pequeño pero poderoso!"
      </p>
    `;

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "×";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "5px";
    closeBtn.style.right = "10px";
    closeBtn.style.background = "none";
    closeBtn.style.border = "none";
    closeBtn.style.color = "white";
    closeBtn.style.fontSize = "24px";
    closeBtn.style.cursor = "pointer";
    closeBtn.addEventListener("click", () => {
      panel.style.display = "none";
    });

    panel.appendChild(closeBtn);
    document.body.appendChild(panel);
    return panel;
  };

  // CREAR PANEL DE INFORMACIÓN DEL FLAMBOYAN
  const createStarInfoPanel = () => {
    const panel = document.createElement("div");
    panel.id = "flamb-info";
    panel.style.position = "fixed";
    panel.style.top = "20px";
    panel.style.right = "20px";
    panel.style.width = "300px";
    panel.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    panel.style.borderRadius = "15px";
    panel.style.padding = "15px";
    panel.style.color = "white";
    panel.style.fontFamily = '"Super Mario", Arial, sans-serif';
    panel.style.border = "4px solid white";
    panel.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.8)";
    panel.style.display = "none";
    panel.style.zIndex = "2000";
    panel.style.backdropFilter = "blur(5px)";

    panel.innerHTML = `
      <h2 style="margin-top: 0; text-align: center; color: orange; text-shadow: 2px 2px 0 darkred;">🌳 Flamboyán</h2>
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Delonix_regia_01.jpg/1280px-Delonix_regia_01.jpg"
             alt="Flamboyán" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
        <div>
          <p style="margin: 5px 0; font-weight: bold;">Nombre científico: <em>Delonix regia</em></p>
          <p style="margin: 5px 0;">🔥 Árbol de fuego tropical</p>
        </div>
      </div>
      <p style="margin: 10px 0;">El flamboyán es famoso por su espectacular floración roja:</p>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>Originario de Madagascar</li>
        <li>Muy común en el Caribe y zonas tropicales</li>
        <li>Símbolo de belleza, sombra y cultura popular</li>
      </ul>
      <p style="text-align: center; font-style: italic; margin-bottom: 0;">
        "Cuando florece, el verano comienza ☀️"
      </p>
    `;

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "×";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "5px";
    closeBtn.style.right = "10px";
    closeBtn.style.background = "none";
    closeBtn.style.border = "none";
    closeBtn.style.color = "white";
    closeBtn.style.fontSize = "24px";
    closeBtn.style.cursor = "pointer";
    closeBtn.addEventListener("click", () => {
      panel.style.display = "none";
    });

    panel.appendChild(closeBtn);
    document.body.appendChild(panel);
    return panel;
  };

  // CREAR PANEL DE INFORMACIÓN DEL C3TK
  const createC3TKInfoPanel = () => {
    const panel = document.createElement("div");
    panel.id = "c3tk-info";
    panel.style.position = "fixed";
    panel.style.top = "20px";
    panel.style.left = "20px";
    panel.style.width = "300px";
    panel.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    panel.style.borderRadius = "15px";
    panel.style.padding = "15px";
    panel.style.color = "white";
    panel.style.fontFamily = '"Super Mario", Arial, sans-serif';
    panel.style.border = "4px solid white";
    panel.style.boxShadow = "0 0 20px rgba(255, 50, 255, 0.5)";
    panel.style.display = "none";
    panel.style.zIndex = "2000";
    panel.style.backdropFilter = "blur(5px)";

    panel.innerHTML = `
      <h2 style="margin-top: 0; text-align: center; color: lightblue; text-shadow: 2px 2px 0 navy;">🔬 C3tec de Caguas</h2>
<div style="display: flex; align-items: center; margin-bottom: 10px;">
  <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/a5/09/33/criollo-centre-for-science.jpg?w=1200&h=1200&s=1" 
       alt="C3tec de Caguas" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
  <div>
    <p style="margin: 5px 0; font-weight: bold;">Nombre completo: <em>Centro Criollo de Ciencia y Tecnología del Caribe</em></p>
    <p style="margin: 5px 0;">🌟 Donde la ciencia cobra vida</p>
  </div>
</div>
<p style="margin: 10px 0;">El C3tec es un espacio interactivo para aprender sobre ciencia y tecnología de manera divertida:</p>
<ul style="margin: 10px 0; padding-left: 20px;">
  <li>Cuenta con exhibiciones permanentes y temporales</li>
  <li>Incluye un laboratorio "Makerspace" para crear e innovar</li>
  <li>Ideal para estudiantes, familias y curiosos de todas las edades</li>
</ul>
<p style="text-align: center; font-style: italic; margin-bottom: 0;">
  "¡Explora, imagina y crea!"
</p>

    `;

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "×";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "5px";
    closeBtn.style.right = "10px";
    closeBtn.style.background = "none";
    closeBtn.style.border = "none";
    closeBtn.style.color = "white";
    closeBtn.style.fontSize = "24px";
    closeBtn.style.cursor = "pointer";
    closeBtn.addEventListener("click", () => {
      panel.style.display = "none";
    });

    panel.appendChild(closeBtn);
    document.body.appendChild(panel);
    return panel;
  };


 // CREAR PANEL DE INFORMACIÓN DE LA ALCALDIA
 const createALCALInfoPanel = () => {
  const panel = document.createElement("div");
  panel.id = "alcal-info";
  panel.style.position = "fixed";
  panel.style.top = "20px";
  panel.style.left = "20px";
  panel.style.width = "300px";
  panel.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  panel.style.borderRadius = "15px";
  panel.style.padding = "15px";
  panel.style.color = "white";
  panel.style.fontFamily = '"Super Mario", Arial, sans-serif';
  panel.style.border = "4px solid white";
  panel.style.boxShadow = "0 0 20px rgba(255, 50, 255, 0.5)";
  panel.style.display = "none";
  panel.style.zIndex = "2000";
  panel.style.backdropFilter = "blur(5px)";

  panel.innerHTML = `
  <h2 style="margin-top: 0; text-align: center; color: lightblue; text-shadow: 2px 2px 0 navy;">🏛️ Casa Alcaldía de Caguas</h2>
  <div style="display: flex; align-items: center; margin-bottom: 10px;">
    <img src="https://live.staticflickr.com/5530/11803444365_f7021f3ff2_b.jpg"
         alt="Casa Alcaldía de Caguas" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
    <div>
      <p style="margin: 5px 0; font-weight: bold;">Nombre oficial: <em>Casa Alcaldía William Miranda Marín</em></p>
      <p style="margin: 5px 0;">🏙 Símbolo de gobierno y cultura en el corazón de Caguas</p>
    </div>
  </div>
  <p style="margin: 10px 0;">La Casa Alcaldía es sede del gobierno municipal de Caguas:</p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Ubicada en la plaza central de la ciudad</li>
    <li>Lugar emblemático de eventos cívicos y culturales</li>
    <li>Nombrada en honor al exalcalde William Miranda Marín</li>
  </ul>
  <p style="text-align: center; font-style: italic; margin-bottom: 0;">
    "¡Centro de liderazgo, historia y comunidad!"
  </p>
`;


  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "10px";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.color = "white";
  closeBtn.style.fontSize = "24px";
  closeBtn.style.cursor = "pointer";
  closeBtn.addEventListener("click", () => {
    panel.style.display = "none";
  });

  panel.appendChild(closeBtn);
  document.body.appendChild(panel);
  return panel;
};


// CREAR PANEL DE INFORMACIÓN DEL CENTRO DE BELLAS ARTES DE CAGUAS
const createCENTRInfoPanel = () => {
  const panel = document.createElement("div");
  panel.id = "centr-info";
  panel.style.position = "fixed";
  panel.style.top = "20px";
  panel.style.left = "20px";
  panel.style.width = "300px";
  panel.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  panel.style.borderRadius = "15px";
  panel.style.padding = "15px";
  panel.style.color = "white";
  panel.style.fontFamily = '"Super Mario", Arial, sans-serif';
  panel.style.border = "4px solid white";
  panel.style.boxShadow = "0 0 20px rgba(200, 100, 255, 0.5)";
  panel.style.display = "none";
  panel.style.zIndex = "2000";
  panel.style.backdropFilter = "blur(5px)";

  panel.innerHTML = `
    <h2 style="margin-top: 0; text-align: center; color: orchid; text-shadow: 2px 2px 0 purple;">🎭 Bellas Artes de Caguas</h2>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <img src="https://www.discoverpuertorico.com/sites/default/files/listing_images/profile/9943/7Y6A3068-2-_DBD6AE4F-98AA-29B3-48E0414E4AC5BB62-dbd69fca9308655_dbd6b75e-fb24-bf0a-05cae8bddb33f8e3.jpg"
           alt="Centro de Bellas Artes de Caguas" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
      <div>
        <p style="margin: 5px 0; font-weight: bold;">Nombre completo: <em>Centro de Bellas Artes de Caguas</em></p>
        <p style="margin: 5px 0;">🎨 Espacio para el arte, la música y el teatro</p>
      </div>
    </div>
    <p style="margin: 10px 0;">Un centro cultural de gran relevancia para el desarrollo artístico del municipio:</p>
    <ul style="margin: 10px 0; padding-left: 20px;">
      <li>Ofrece conciertos, obras y eventos comunitarios</li>
      <li>Cuenta con sala de teatro moderna y espacios de exposición</li>
      <li>Fomenta el talento local y puertorriqueño</li>
    </ul>
    <p style="text-align: center; font-style: italic; margin-bottom: 0;">
      "¡Donde el arte cobra vida en el corazón del pueblo!"
    </p>
  `;

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "10px";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.color = "white";
  closeBtn.style.fontSize = "24px";
  closeBtn.style.cursor = "pointer";
  closeBtn.addEventListener("click", () => {
    panel.style.display = "none";
  });

  panel.appendChild(closeBtn);
  document.body.appendChild(panel);
  return panel;
};


// CREAR PANEL DE INFORMACIÓN DE LA TAINA
const createTAINAInfoPanel = () => {
  const panel = document.createElement("div");
  panel.id = "taina-info";
  panel.style.position = "fixed";
  panel.style.top = "20px";
  panel.style.left = "20px";
  panel.style.width = "300px";
  panel.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  panel.style.borderRadius = "15px";
  panel.style.padding = "15px";
  panel.style.color = "white";
  panel.style.fontFamily = '"Super Mario", Arial, sans-serif';
  panel.style.border = "4px solid white";
  panel.style.boxShadow = "0 0 20px rgba(200, 100, 255, 0.5)";
  panel.style.display = "none";
  panel.style.zIndex = "2000";
  panel.style.backdropFilter = "blur(5px)";

  panel.innerHTML = `
  <h2 style="margin-top: 0; text-align: center; color: salmon; text-shadow: 2px 2px 0 maroon;">🪶 Monumento de la Taína</h2>
  <div style="display: flex; align-items: center; margin-bottom: 10px;">
    <img src="https://caguas.gov.pr/wp-content/uploads/2019/08/Portal-Monumento-a-la-Herencia-Indigena.jpg"
         alt="Monumento de la Taína de Caguas" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
    <div>
      <p style="margin: 5px 0; font-weight: bold;">Ubicación: <em>Entrada norte de Caguas, PR-1</em></p>
      <p style="margin: 5px 0;">🗿 Tributo a los pueblos indígenas de Puerto Rico</p>
    </div>
  </div>
  <p style="margin: 10px 0;">Este monumento conmemora la presencia y herencia taína en la isla:</p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Obra de arte de gran escala y valor simbólico</li>
    <li>Representa a una mujer taína portando símbolos culturales</li>
    <li>Emblema de orgullo para Caguas y todo Puerto Rico</li>
  </ul>
  <p style="text-align: center; font-style: italic; margin-bottom: 0;">
    "Nuestra historia vive en cada piedra y en cada raíz 🌿"
  </p>
`;


  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "10px";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.color = "white";
  closeBtn.style.fontSize = "24px";
  closeBtn.style.cursor = "pointer";
  closeBtn.addEventListener("click", () => {
    panel.style.display = "none";
  });

  panel.appendChild(closeBtn);
  document.body.appendChild(panel);
  return panel;
};


// CREAR PANEL DE INFORMACIÓN DE LA ESTATUA JUNGLE GUARDIAN
const createJungleGuardianInfoPanel = () => {
  const panel = document.createElement("div");
  panel.id = "guardian-info";
  panel.style.position = "fixed";
  panel.style.top = "20px";
  panel.style.left = "20px";
  panel.style.width = "300px";
  panel.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  panel.style.borderRadius = "15px";
  panel.style.padding = "15px";
  panel.style.color = "white";
  panel.style.fontFamily = '"Super Mario", Arial, sans-serif';
  panel.style.border = "4px solid white";
  panel.style.boxShadow = "0 0 20px rgba(0, 200, 100, 0.5)";
  panel.style.display = "none";
  panel.style.zIndex = "2000";
  panel.style.backdropFilter = "blur(5px)";

  panel.innerHTML = `
    <h2 style="margin-top: 0; text-align: center; color: lightgreen; text-shadow: 2px 2px 0 darkgreen;">🛡️ Jungle Guardian</h2>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1tH7xl2mXvasTPUVxjdjQufDQP08A5EP3du2WPFAdYQkbfinA4HWINt8FwGfhCp_uPf3RKSwdS24Wsacv44DEgR8_V_NeeKkzL1qSSyadPh_U0QwdDMY4um3CxrO92N-wndcYxVEj1RA/s1600/caguas+africana+2.jpg"
           alt="Jungle Guardian" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
      <div>
        <p style="margin: 5px 0; font-weight: bold;">Ubicación: <em>Jardín Botánico y Cultural de Caguas</em></p>
        <p style="margin: 5px 0;">🧝‍♂️ Protector simbólico de la flora caribeña</p>
      </div>
    </div>
    <p style="margin: 10px 0;">La estatua Jungle Guardian representa la conexión mística con la naturaleza:</p>
    <ul style="margin: 10px 0; padding-left: 20px;">
      <li>Icono ecológico del Jardín Botánico de Caguas</li>
      <li>Escultura inspirada en figuras fantásticas del bosque</li>
      <li>Una invitación a proteger el medioambiente y sus especies</li>
    </ul>
    <p style="text-align: center; font-style: italic; margin-bottom: 0;">
      "Guardianes de la selva, protectores de la vida 🌿"
    </p>
  `;

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "10px";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.color = "white";
  closeBtn.style.fontSize = "24px";
  closeBtn.style.cursor = "pointer";
  closeBtn.addEventListener("click", () => {
    panel.style.display = "none";
  });

  panel.appendChild(closeBtn);
  document.body.appendChild(panel);
  return panel;
};


// CREAR PANEL DE INFORMACIÓN DEL PITIRRE
const createPitirreInfoPanel = () => {
  const panel = document.createElement("div");
  panel.id = "pitirre-info";
  panel.style.position = "fixed";
  panel.style.top = "20px";
  panel.style.left = "20px";
  panel.style.width = "300px";
  panel.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  panel.style.borderRadius = "15px";
  panel.style.padding = "15px";
  panel.style.color = "white";
  panel.style.fontFamily = '"Super Mario", Arial, sans-serif';
  panel.style.border = "4px solid white";
  panel.style.boxShadow = "0 0 20px rgba(100, 100, 255, 0.5)";
  panel.style.display = "none";
  panel.style.zIndex = "2000";
  panel.style.backdropFilter = "blur(5px)";

  panel.innerHTML = `
    <h2 style="margin-top: 0; text-align: center; color: skyblue; text-shadow: 2px 2px 0 navy;">🐦 El Pitirre</h2>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Puerto_Rican_Gray_Kingbird.jpg/1200px-Puerto_Rican_Gray_Kingbird.jpg"
           alt="Pitirre" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
      <div>
        <p style="margin: 5px 0; font-weight: bold;">Nombre científico: <em>Tyrannus dominicensis</em></p>
        <p style="margin: 5px 0;">⚔️ Defensor audaz del cielo puertorriqueño</p>
      </div>
    </div>
    <p style="margin: 10px 0;">El pitirre es conocido por su valentía al defender su territorio, incluso de aves más grandes:</p>
    <ul style="margin: 10px 0; padding-left: 20px;">
      <li>Común en zonas abiertas y campos de todo Puerto Rico</li>
      <li>Famoso por su vuelo agresivo contra predadores</li>
      <li>Símbolo de coraje y resistencia en la cultura popular</li>
    </ul>
    <p style="text-align: center; font-style: italic; margin-bottom: 0;">
      "¡Chirrí chirrí! ¡Aquí mando yo!"
    </p>
  `;

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "10px";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.color = "white";
  closeBtn.style.fontSize = "24px";
  closeBtn.style.cursor = "pointer";
  closeBtn.addEventListener("click", () => {
    panel.style.display = "none";
  });

  panel.appendChild(closeBtn);
  document.body.appendChild(panel);
  return panel;
};


// CREAR PANEL DE INFORMACIÓN DEL RELOJ FLORAL DE CAGUAS
const createRelojFloralInfoPanel = () => {
  const panel = document.createElement("div");
  panel.id = "reloj-info";
  panel.style.position = "fixed";
  panel.style.top = "20px";
  panel.style.left = "20px";
  panel.style.width = "300px";
  panel.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  panel.style.borderRadius = "15px";
  panel.style.padding = "15px";
  panel.style.color = "white";
  panel.style.fontFamily = '"Super Mario", Arial, sans-serif';
  panel.style.border = "4px solid white";
  panel.style.boxShadow = "0 0 20px rgba(255, 150, 0, 0.5)";
  panel.style.display = "none";
  panel.style.zIndex = "2000";
  panel.style.backdropFilter = "blur(5px)";

  panel.innerHTML = `
    <h2 style="margin-top: 0; text-align: center; color: gold; text-shadow: 2px 2px 0 darkorange;">🌸 Reloj Floral de Caguas</h2>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirYL32abYT5MkCq__4w1_jIJuYivp_BBEWP7qBgj3xMe_LBvqtdCp7aDW67MCWHnE0Xf6q4Gr2H8dCKxDkNbOfO8WR0lwQPi4PfRxd6SlXy_nhENbsdShCiwxrpvjzeeIvvDi7_F0GFD0/w1200-h630-p-k-no-nu/caguas+reloj.jpg"
           alt="Reloj Floral de Caguas" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
      <div>
        <p style="margin: 5px 0; font-weight: bold;">Ubicación: <em>Plaza Santiago R. Palmer</em></p>
        <p style="margin: 5px 0;">⏰ Monumento botánico en el corazón de la ciudad</p>
      </div>
    </div>
    <p style="margin: 10px 0;">El Reloj Floral es una atracción turística emblemática de Caguas:</p>
    <ul style="margin: 10px 0; padding-left: 20px;">
      <li>Funciona como un reloj real y está rodeado de jardines florales</li>
      <li>Fue inaugurado en 2004 como parte del embellecimiento urbano</li>
      <li>Es uno de los pocos relojes florales mecánicos en el Caribe</li>
    </ul>
    <p style="text-align: center; font-style: italic; margin-bottom: 0;">
      "Un ícono vivo que marca el ritmo de la ciudad 🌼"
    </p>
  `;

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "10px";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.color = "white";
  closeBtn.style.fontSize = "24px";
  closeBtn.style.cursor = "pointer";
  closeBtn.addEventListener("click", () => {
    panel.style.display = "none";
  });

  panel.appendChild(closeBtn);
  document.body.appendChild(panel);
  return panel;
};


// CREAR PANEL DE INFORMACIÓN DE LA ESCULTURA DE WILLIAM MIRANDA MARÍN
const createWillieInfoPanel = () => {
  const panel = document.createElement("div");
  panel.id = "willie-info";
  panel.style.position = "fixed";
  panel.style.top = "20px";
  panel.style.left = "20px";
  panel.style.width = "300px";
  panel.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  panel.style.borderRadius = "15px";
  panel.style.padding = "15px";
  panel.style.color = "white";
  panel.style.fontFamily = '"Super Mario", Arial, sans-serif';
  panel.style.border = "4px solid white";
  panel.style.boxShadow = "0 0 20px rgba(100, 150, 255, 0.5)";
  panel.style.display = "none";
  panel.style.zIndex = "2000";
  panel.style.backdropFilter = "blur(5px)";

  panel.innerHTML = `
    <h2 style="margin-top: 0; text-align: center; color: lightsteelblue; text-shadow: 2px 2px 0 navy;">🧑‍💼 William Miranda Marín</h2>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <img src="https://images.findagrave.com/photos/2010/154/53228410_127567210214.jpg?size=photos250"
           alt="William Miranda Marín" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
      <div>
        <p style="margin: 5px 0; font-weight: bold;">Alcalde de Caguas (1997–2010)</p>
        <p style="margin: 5px 0;">🕊 Visionario, líder y defensor del desarrollo humano</p>
      </div>
    </div>
    <p style="margin: 10px 0;">Esta escultura honra a una de las figuras más queridas y transformadoras de Caguas:</p>
    <ul style="margin: 10px 0; padding-left: 20px;">
      <li>Impulsó la autogestión comunitaria y la educación</li>
      <li>Fundó el C3TEC y revitalizó la ciudad criolla</li>
      <li>Recordado por su humanidad y legado perdurable</li>
    </ul>
    <p style="text-align: center; font-style: italic; margin-bottom: 0;">
      "¡Adelante, hacia el desarrollo pleno del ser humano!"
    </p>
  `;

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "10px";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.color = "white";
  closeBtn.style.fontSize = "24px";
  closeBtn.style.cursor = "pointer";
  closeBtn.addEventListener("click", () => {
    panel.style.display = "none";
  });

  panel.appendChild(closeBtn);
  document.body.appendChild(panel);
  return panel;
};




  // COMPONENTE PARA CONTROL DE ROTACIÓN
  AFRAME.registerComponent("model-rotation", {
    schema: {
      speed: { type: "number", default: 2.5 },
      autoRotate: { type: "boolean", default: true },
    },

    init: function () {
      this.rotationInterval = null;
      this.autoRotationInterval = null;
      this.model = this.el;
      this.isAutoRotating = false;

      // Obtener controles de rotación
      const rotationControls = document.getElementById("rotation-controls");
      if (!rotationControls) return;

      const leftBtn = rotationControls.querySelector(".rotation-btn:nth-child(1)");
      const rightBtn = rotationControls.querySelector(".rotation-btn:nth-child(2)");
      const stopBtn = rotationControls.querySelector(".stop-rotation-btn");

      if (!leftBtn || !rightBtn || !stopBtn) {
        console.error("Botones de rotación no encontrados");
        return;
      }

      // Event listeners para los botones
      leftBtn.addEventListener("click", () => {
        this.startManualRotation("left");
      });

      rightBtn.addEventListener("click", () => {
        this.startManualRotation("right");
      });

      stopBtn.addEventListener("click", () => {
        if (this.isAutoRotating) {
          this.stopAutoRotation();
        } else {
          this.startAutoRotation();
        }
      });

      // Iniciar rotación automática si está habilitada
      if (this.data.autoRotate) {
        this.startAutoRotation();
      }
    },

    startAutoRotation: function () {
      this.stopManualRotation();
      this.stopAutoRotation();

      const currentRotation = this.model.getAttribute("rotation") || {
        x: 0,
        y: 0,
        z: 0,
      };
      const speed = this.data.speed * 0.3; // Más lento que la rotación manual

      this.isAutoRotating = true;
      const stopBtn = document.querySelector(".stop-rotation-btn");
      if (stopBtn) {
        stopBtn.innerHTML = "⏹ Detener";
        stopBtn.style.backgroundColor = "rgba(255,0,0,0.7)";
      }

      this.autoRotationInterval = setInterval(() => {
        currentRotation.y += speed;
        this.model.setAttribute("rotation", currentRotation);
      }, 16);
    },

    stopAutoRotation: function () {
      if (this.autoRotationInterval) {
        clearInterval(this.autoRotationInterval);
        this.autoRotationInterval = null;
      }
      this.isAutoRotating = false;
      const stopBtn = document.querySelector(".stop-rotation-btn");
      if (stopBtn) {
        stopBtn.innerHTML = "▶ Rotar";
        stopBtn.style.backgroundColor = "rgba(0,255,0,0.7)";
      }
    },

    startManualRotation: function (direction) {
      this.stopAutoRotation();
      this.stopManualRotation();

      const speed = this.data.speed * (direction === "left" ? 1 : -1);
      const currentRotation = this.model.getAttribute("rotation") || {
        x: 0,
        y: 0,
        z: 0,
      };

      this.rotationInterval = setInterval(() => {
        currentRotation.y += speed;
        this.model.setAttribute("rotation", currentRotation);
      }, 16);
    },

    stopManualRotation: function () {
      if (this.rotationInterval) {
        clearInterval(this.rotationInterval);
        this.rotationInterval = null;
      }
    },

    remove: function () {
      this.stopManualRotation();
      this.stopAutoRotation();
    },
  });

  AFRAME.registerComponent("float-animation", {
    schema: {
      amplitude: { type: "number", default: 0.05 },
      speed: { type: "number", default: 1.5 },
    },
    init: function () {
      this.originalY = this.el.object3D.position.y;
      this.time = 0;
    },
    tick: function (time, timeDelta) {
      this.time += timeDelta / 1000; // tiempo en segundos
      const offset =
        Math.sin(this.time * this.data.speed) * this.data.amplitude;
      this.el.object3D.position.y = this.originalY + offset;
    },
  });

  // --- INICIALIZACIÓN PARA MORIVIVI ---
  const moriMarker = document.getElementById("main-marker");
  const moriEntity = document.getElementById("model-entity");
  const moriPanel = createMoriPanel();
  const rotationControls = createRotationControls();

  if (moriMarker && moriEntity) {
    moriMarker.addEventListener("markerFound", () => {
      updateStatus(markerStatus, "🎯 Marcador Moriviví: Detectado", "success");
      updateStatus(cameraStatus, "📷 Cámara: Activada", "info");

      if (moriPanel) moriPanel.style.display = "block";
      moriEntity.setAttribute("model-rotation", {
        speed: 2.5,
        autoRotate: true,
      });
      moriEntity.setAttribute("float-animation", {
        amplitude: 0.05,
        speed: 1.5,
      });

      if (rotationControls.controls) rotationControls.controls.style.display = "flex";
    });

    moriMarker.addEventListener("markerLost", () => {
      updateStatus(markerStatus, "👀 Marcador Moriviví: Buscando...", "warning");

      if (moriPanel) moriPanel.style.display = "none";
      moriEntity.removeAttribute("float-animation");
      if (rotationControls.controls) rotationControls.controls.style.display = "none";
    });
  }

  // --- INICIALIZACIÓN PARA ZUMBADORCITO ---
  const zumbMarker = document.getElementById("marker-boo");
  const zumbEntity = document.getElementById("entity-zumb");
  const zumbPanel = createBooInfoPanel();

  if (zumbMarker && zumbEntity) {
    zumbMarker.addEventListener("markerFound", () => {
      updateStatus(markerStatus, "🎯 Marcador Zumbadorcito: Detectado", "success");
      updateStatus(cameraStatus, "📷 Cámara: Activada", "info");

      if (zumbPanel) zumbPanel.style.display = "block";
      zumbEntity.setAttribute("model-rotation", {
        speed: 2.5,
        autoRotate: true,
      });
      zumbEntity.setAttribute("float-animation", {
        amplitude: 0.07,
        speed: 1.8,
      });

      if (rotationControls.controls) rotationControls.controls.style.display = "flex";
    });

    zumbMarker.addEventListener("markerLost", () => {
      updateStatus(markerStatus, "👀 Marcador Zumbadorcito: Buscando...", "warning");

      if (zumbPanel) zumbPanel.style.display = "none";
      zumbEntity.removeAttribute("float-animation");
      if (rotationControls.controls) rotationControls.controls.style.display = "none";
    });
  }

// INICIALIZACIÓN PARA C3TK (ACTUALIZADO CON CONTROLES Y ROTACIÓN)
const c3tkMarker = document.getElementById("marker-c3tk");
const c3tkEntity = document.getElementById("entity-c3tk");
const c3tkPanel = createC3TKInfoPanel();

if (c3tkMarker && c3tkEntity) {
  c3tkMarker.addEventListener("markerFound", () => {
    updateStatus(markerStatus, "🎯 Marcador C3TK: Detectado", "success");
    updateStatus(cameraStatus, "📷 Cámara: Activada", "info");

    if (c3tkPanel) c3tkPanel.style.display = "block";
    c3tkEntity.setAttribute("model-rotation", {
      speed: 2.5,
      autoRotate: true,
    });
    c3tkEntity.setAttribute("float-animation", {
      amplitude: 0.07,
      speed: 1.8,
    });

    if (rotationControls.controls) rotationControls.controls.style.display = "flex";
  });

  c3tkMarker.addEventListener("markerLost", () => {
    updateStatus(markerStatus, "👀 Marcador C3TK: Buscando...", "warning");

    if (c3tkPanel) c3tkPanel.style.display = "none";
    c3tkEntity.removeAttribute("float-animation");
    if (rotationControls.controls) rotationControls.controls.style.display = "none";
  });
}

// INICIALIZACIÓN PARA CASA ALCALDÍA DE CAGUAS - WILLIAM MIRANDA MARÍN
const alcalMarker = document.getElementById("marker-alcal");
const alcalEntity = document.getElementById("entity-alcal");
const alcalPanel = createALCALInfoPanel();

if (alcalMarker && alcalEntity) {
  alcalMarker.addEventListener("markerFound", () => {
    updateStatus(markerStatus, "🎯 Marcador Alcaldía: Detectado", "success");
    updateStatus(cameraStatus, "📷 Cámara: Activada", "info");

    if (alcalPanel) alcalPanel.style.display = "block";
    alcalEntity.setAttribute("model-rotation", {
      speed: 2.5,
      autoRotate: true,
    });
    alcalEntity.setAttribute("float-animation", {
      amplitude: 0.07,
      speed: 1.8,
    });

    if (rotationControls.controls) rotationControls.controls.style.display = "flex";
  });

  alcalMarker.addEventListener("markerLost", () => {
    updateStatus(markerStatus, "👀 Marcador Alcaldía: Buscando...", "warning");

    if (alcalPanel) alcalPanel.style.display = "none";
    alcalEntity.removeAttribute("float-animation");
    if (rotationControls.controls) rotationControls.controls.style.display = "none";
  });
}


// INICIALIZACIÓN PARA CENTRO DE BELLAS ARTES DE CAGUAS
const bellasMarker = document.getElementById("marker-centr");
const bellasEntity = document.getElementById("entity-centr");
const bellasPanel = createCENTRInfoPanel();

if (bellasMarker && bellasEntity) {
  bellasMarker.addEventListener("markerFound", () => {
    updateStatus(markerStatus, "🎯 Marcador Bellas Artes: Detectado", "success");
    updateStatus(cameraStatus, "📷 Cámara: Activada", "info");

    if (bellasPanel) bellasPanel.style.display = "block";
    bellasEntity.setAttribute("model-rotation", {
      speed: 2.5,
      autoRotate: true,
    });
    bellasEntity.setAttribute("float-animation", {
      amplitude: 0.07,
      speed: 1.8,
    });

    if (rotationControls.controls) rotationControls.controls.style.display = "flex";
  });

  bellasMarker.addEventListener("markerLost", () => {
    updateStatus(markerStatus, "👀 Marcador Bellas Artes: Buscando...", "warning");

    if (bellasPanel) bellasPanel.style.display = "none";
    bellasEntity.removeAttribute("float-animation");
    if (rotationControls.controls) rotationControls.controls.style.display = "none";
  });
}


// INICIALIZACIÓN PARA MONUMENTO DE LA TAÍNA DE CAGUAS
const tainaMarker = document.getElementById("marker-india");
const tainaEntity = document.getElementById("entity-india");
const tainaPanel = createTAINAInfoPanel();

if (tainaMarker && tainaEntity) {
  tainaMarker.addEventListener("markerFound", () => {
    updateStatus(markerStatus, "🎯 Marcador Taína: Detectado", "success");
    updateStatus(cameraStatus, "📷 Cámara: Activada", "info");

    if (tainaPanel) tainaPanel.style.display = "block";
    tainaEntity.setAttribute("model-rotation", {
      speed: 2.5,
      autoRotate: true,
    });
    tainaEntity.setAttribute("float-animation", {
      amplitude: 0.07,
      speed: 1.8,
    });

    if (rotationControls.controls) rotationControls.controls.style.display = "flex";
  });

  tainaMarker.addEventListener("markerLost", () => {
    updateStatus(markerStatus, "👀 Marcador Taína: Buscando...", "warning");

    if (tainaPanel) tainaPanel.style.display = "none";
    tainaEntity.removeAttribute("float-animation");
    if (rotationControls.controls) rotationControls.controls.style.display = "none";
  });
}


// INICIALIZACIÓN PARA ESTATUA JUNGLE GUARDIAN - JARDÍN BOTÁNICO DE CAGUAS
const guardianMarker = document.getElementById("marker-jung");
const guardianEntity = document.getElementById("entity-jung");
const guardianPanel = createJungleGuardianInfoPanel();

if (guardianMarker && guardianEntity) {
  guardianMarker.addEventListener("markerFound", () => {
    updateStatus(markerStatus, "🎯 Marcador Jungle Guardian: Detectado", "success");
    updateStatus(cameraStatus, "📷 Cámara: Activada", "info");

    if (guardianPanel) guardianPanel.style.display = "block";
    guardianEntity.setAttribute("model-rotation", {
      speed: 2.5,
      autoRotate: true,
    });
    guardianEntity.setAttribute("float-animation", {
      amplitude: 0.07,
      speed: 1.8,
    });

    if (rotationControls.controls) rotationControls.controls.style.display = "flex";
  });

  guardianMarker.addEventListener("markerLost", () => {
    updateStatus(markerStatus, "👀 Marcador Jungle Guardian: Buscando...", "warning");

    if (guardianPanel) guardianPanel.style.display = "none";
    guardianEntity.removeAttribute("float-animation");
    if (rotationControls.controls) rotationControls.controls.style.display = "none";
  });
}


// INICIALIZACIÓN PARA EL PITIRRE
const pitirreMarker = document.getElementById("marker-pitirre");
const pitirreEntity = document.getElementById("entity-pitirre");
const pitirrePanel = createPitirreInfoPanel();

if (pitirreMarker && pitirreEntity) {
  pitirreMarker.addEventListener("markerFound", () => {
    updateStatus(markerStatus, "🎯 Marcador Pitirre: Detectado", "success");
    updateStatus(cameraStatus, "📷 Cámara: Activada", "info");

    if (pitirrePanel) pitirrePanel.style.display = "block";
    pitirreEntity.setAttribute("model-rotation", {
      speed: 2.5,
      autoRotate: true,
    });
    pitirreEntity.setAttribute("float-animation", {
      amplitude: 0.07,
      speed: 1.8,
    });

    if (rotationControls.controls) rotationControls.controls.style.display = "flex";
  });

  pitirreMarker.addEventListener("markerLost", () => {
    updateStatus(markerStatus, "👀 Marcador Pitirre: Buscando...", "warning");

    if (pitirrePanel) pitirrePanel.style.display = "none";
    pitirreEntity.removeAttribute("float-animation");
    if (rotationControls.controls) rotationControls.controls.style.display = "none";
  });
}

// INICIALIZACIÓN PARA EL RELOJ FLORAL DE CAGUAS
const relojMarker = document.getElementById("marker-reloj");
const relojEntity = document.getElementById("entity-reloj");
const relojPanel = createRelojFloralInfoPanel();

if (relojMarker && relojEntity) {
  relojMarker.addEventListener("markerFound", () => {
    updateStatus(markerStatus, "🎯 Marcador Reloj Floral: Detectado", "success");
    updateStatus(cameraStatus, "📷 Cámara: Activada", "info");

    if (relojPanel) relojPanel.style.display = "block";
    relojEntity.setAttribute("model-rotation", {
      speed: 2.5,
      autoRotate: true,
    });
    relojEntity.setAttribute("float-animation", {
      amplitude: 0.07,
      speed: 1.8,
    });

    if (rotationControls.controls) rotationControls.controls.style.display = "flex";
  });

  relojMarker.addEventListener("markerLost", () => {
    updateStatus(markerStatus, "👀 Marcador Reloj Floral: Buscando...", "warning");

    if (relojPanel) relojPanel.style.display = "none";
    relojEntity.removeAttribute("float-animation");
    if (rotationControls.controls) rotationControls.controls.style.display = "none";
  });
}


// INICIALIZACIÓN PARA ESCULTURA DE WILLIAM MIRANDA MARÍN
const willieMarker = document.getElementById("marker-willie");
const willieEntity = document.getElementById("entity-willie");
const williePanel = createWillieInfoPanel();

if (willieMarker && willieEntity) {
  willieMarker.addEventListener("markerFound", () => {
    updateStatus(markerStatus, "🎯 Marcador William Miranda Marín: Detectado", "success");
    updateStatus(cameraStatus, "📷 Cámara: Activada", "info");

    if (williePanel) williePanel.style.display = "block";
    willieEntity.setAttribute("model-rotation", {
      speed: 2.5,
      autoRotate: true,
    });
    willieEntity.setAttribute("float-animation", {
      amplitude: 0.07,
      speed: 1.8,
    });

    if (rotationControls.controls) rotationControls.controls.style.display = "flex";
  });

  willieMarker.addEventListener("markerLost", () => {
    updateStatus(markerStatus, "👀 Marcador William Miranda Marín: Buscando...", "warning");

    if (williePanel) williePanel.style.display = "none";
    willieEntity.removeAttribute("float-animation");
    if (rotationControls.controls) rotationControls.controls.style.display = "none";
  });
}

// El resto del código permanece sin cambios.


  // --- INICIALIZACIÓN PARA FLAMBOYÁN ---
  const starMarker = document.getElementById("marker-flamb");
  const starEntity = document.getElementById("entity-flamb");
  const starPanel = createStarInfoPanel();

  if (starMarker && starEntity) {
    starMarker.addEventListener("markerFound", () => {
      updateStatus(markerStatus, "🎯 Marcador Flamboyán: Detectado", "success");
      updateStatus(cameraStatus, "📷 Cámara: Activada", "info");

      if (starPanel) starPanel.style.display = "block";
      starEntity.setAttribute("model-rotation", {
        speed: 1,
        autoRotate: true,
      });
      starEntity.setAttribute("float-animation", {
        amplitude: 0,
        speed: 2.5,
      });

      if (rotationControls.controls) rotationControls.controls.style.display = "flex";
    });

    starMarker.addEventListener("markerLost", () => {
      updateStatus(markerStatus, "👀 Marcador Flamboyán: Buscando...", "warning");

      if (starPanel) starPanel.style.display = "none";
      starEntity.removeAttribute("float-animation");
      if (rotationControls.controls) rotationControls.controls.style.display = "none";
    });
  }

  // VERIFICACIÓN DE LIBRERÍAS
  const checkLibraries = () => {
    if (typeof AFRAME === "undefined") {
      showError(
        "La librería A-Frame es requerida. Recarga la página.",
        aframeStatus
      );
      return;
    }

    updateStatus(aframeStatus, "✅ A-Frame: Cargado correctamente", "success");

    setTimeout(() => {
      if (typeof ARjs === "undefined") {
        showError(
          "La librería AR.js no se cargó. Recarga la página.",
          arjsStatus
        );
      } else {
        updateStatus(arjsStatus, "✅ AR.js: Cargado correctamente", "success");
        enableARFunctionality();
      }
    }, 100);
  };

  // HABILITAR FUNCIONALIDAD AR
  const enableARFunctionality = () => {
    updateStatus(markerStatus, "🔍 Marcador: Listo para detectar", "info");

    if (!startButton) {
      console.error("Botón de inicio no encontrado");
      return;
    }

    startButton.addEventListener("click", () => {
      loadingScreen.style.display = "none";
    });
  };

  // FUNCIONES UTILITARIAS
  function updateStatus(element, message, type) {
    if (!element) {
      console.error("Elemento de estado no encontrado");
      return;
    }
    const colors = {
      success: "#4CAF50",
      warning: "#FFC107",
      error: "#F44336",
      info: "#2196F3",
    };
    element.innerHTML = message;
    element.style.color = colors[type] || "#FFFFFF";
  }

  function showError(message, element = errorMessage) {
    console.error(message);
    if (!element) return;

    updateStatus(element, "❌ " + message, "error");
    if (element === errorMessage && errorMessage) {
      errorMessage.style.display = "block";
    }
  }

  // INICIAR LA APLICACIÓN
  setTimeout(checkLibraries, 50);
});