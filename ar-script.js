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
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Chlorostilbon_maugaeus.jpg/1280px-Chlorostilbon_maugaeus.jpg" 
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