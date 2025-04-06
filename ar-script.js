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
  
    // 1. CREAR CONTROLES DE ROTACIÓN EN PANTALLA (COMPLETO)
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
  
      return { leftBtn, rightBtn, stopBtn };
    };
  
    // 2. CREAR PANEL DE INFORMACIÓN DEL HONGO (COMPLETO)
    const createMushroomInfoPanel = () => {
      const panel = document.createElement("div");
      panel.id = "mushroom-info";
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
              <h2 style="margin-top: 0; text-align: center; color: white; text-shadow: 2px 2px 0 red;">Hongo de Vida</h2>
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <img src="/images/1up.png" 
                       style="width: 50px; height: 50px; margin-right: 10px;">
                  <div>
                      <p style="margin: 5px 0; font-weight: bold;">Super Mario Series</p>
                      <p style="margin: 5px 0;">⭐ ⭐ ⭐ ⭐ ⭐</p>
                  </div>
              </div>
              <p style="margin: 10px 0;">El Hongo de Vida (1UP Mushroom) es un power-up que:</p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>Otorga un punto de vida adicional</li>
                  <li>Aparece desde 1985 en Super Mario Bros.</li>
              </ul>
              <p style="text-align: center; font-style: italic; margin-bottom: 0;">
                  "¡Mario gana 1 vida  extra!"
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
  
    const createBooInfoPanel = () => {
      const panel = document.createElement("div");
      panel.id = "boo-info";
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
              <h2 style="margin-top: 0; text-align: center; color: white; text-shadow: 2px 2px 0 purple;">👻 King Boo</h2>
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <img src="/images/boo.png" 
                       style="width: 50px; height: 50px; margin-right: 10px;">
                  <div>
              <p style="text-align: center;">El fantasma tímido de Super Mario</p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>Se esconde cuando lo miras 👀</li>
                  <li>Aparece desde <strong>Super Mario Bros. 3</strong></li>
                  <li>¡Peligroso pero adorable!</li>
              </ul>
              <p style="text-align: center; font-style: italic; margin-bottom: 0;">
                  "¡No te des la vuelta!"
              </p>
          `;
  
      //
      const createStarInfoPanel = () => {
        const panel = document.createElement("div");
        panel.id = "star-info";
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
      <h2 style="margin-top: 0; text-align: center; color: yellow; text-shadow: 2px 2px 0 orange;">⭐ Estrella</h2>
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="/images/star.png"
             style="width: 50px; height: 50px; margin-right: 10px;">
        <div>
          <p style="margin: 5px 0; font-weight: bold;">Super Mario Series</p>
          <p style="margin: 5px 0;">💫 Invencibilidad</p>
        </div>
      </div>
      <p style="margin: 10px 0;">La estrella otorga invulnerabilidad temporal a Mario:</p>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>Permite eliminar enemigos al tocarlos</li>
        <li>Es un ícono clásico desde 1985</li>
      </ul>
      <p style="text-align: center; font-style: italic; margin-bottom: 0;">
        "¡Nada puede detenerte!"
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
  
      // --- INICIALIZACIÓN PARA STAR ---
      const starMarker = document.getElementById("marker-star");
      const starEntity = document.getElementById("entity-star");
      const starPanel = createStarInfoPanel();
  
      if (starMarker && starEntity) {
        starMarker.addEventListener("markerFound", () => {
          updateStatus(
            markerStatus,
            "🎯 Marcador Estrella: Detectado",
            "success"
          );
          updateStatus(cameraStatus, "📷 Cámara: Activada", "info");
  
          if (starPanel) starPanel.style.display = "block";
          starEntity.setAttribute("model-rotation", {
            speed: 3,
            autoRotate: true,
          });
          starEntity.setAttribute("float-animation", {
            amplitude: 0.05,
            speed: 2.5,
          });
  
          const controls = document.getElementById("rotation-controls");
          if (controls) controls.style.display = "flex";
        });
  
        starMarker.addEventListener("markerLost", () => {
          updateStatus(
            markerStatus,
            "👀 Marcador Estrella: Buscando...",
            "warning"
          );
  
          if (starPanel) starPanel.style.display = "none";
          starEntity.removeAttribute("float-animation");
  
          const controls = document.getElementById("rotation-controls");
          if (controls) controls.style.display = "none";
        });
      }
  
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
  
    // Inicializar controles y panel
    const rotationControls = createRotationControls();
    const infoPanel = createMushroomInfoPanel();
  
    // 3. COMPONENTE PARA CONTROL DE ROTACIÓN (COMPLETO)
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
  
        if (
          !rotationControls.leftBtn ||
          !rotationControls.rightBtn ||
          !rotationControls.stopBtn
        ) {
          console.error("Los controles de rotación no están definidos");
          return;
        }
  
        // Configurar eventos de los botones
        rotationControls.leftBtn.addEventListener("touchstart", () =>
          this.startManualRotation("left")
        );
        rotationControls.leftBtn.addEventListener("touchend", () =>
          this.stopManualRotation()
        );
        rotationControls.leftBtn.addEventListener("mousedown", () =>
          this.startManualRotation("left")
        );
        rotationControls.leftBtn.addEventListener("mouseup", () =>
          this.stopManualRotation()
        );
        rotationControls.leftBtn.addEventListener("mouseleave", () =>
          this.stopManualRotation()
        );
  
        rotationControls.rightBtn.addEventListener("touchstart", () =>
          this.startManualRotation("right")
        );
        rotationControls.rightBtn.addEventListener("touchend", () =>
          this.stopManualRotation()
        );
        rotationControls.rightBtn.addEventListener("mousedown", () =>
          this.startManualRotation("right")
        );
        rotationControls.rightBtn.addEventListener("mouseup", () =>
          this.stopManualRotation()
        );
        rotationControls.rightBtn.addEventListener("mouseleave", () =>
          this.stopManualRotation()
        );
  
        rotationControls.stopBtn.addEventListener("click", () =>
          this.toggleAutoRotation()
        );
  
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
        rotationControls.stopBtn.innerHTML = "⏹ Detener";
        rotationControls.stopBtn.style.backgroundColor = "rgba(255,0,0,0.7)";
  
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
        rotationControls.stopBtn.innerHTML = "▶ Rotar";
        rotationControls.stopBtn.style.backgroundColor = "rgba(0,255,0,0.7)";
      },
  
      toggleAutoRotation: function () {
        if (this.isAutoRotating) {
          this.stopAutoRotation();
        } else {
          this.startAutoRotation();
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
  
    // 4. VERIFICACIÓN DE LIBRERÍAS (COMPLETO)
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
  
    // 5. HABILITAR FUNCIONALIDAD AR (COMPLETO)
    const enableARFunctionality = () => {
      updateStatus(markerStatus, "🔍 Marcador: Listo para detectar", "info");
  
      if (!startButton) {
        console.error("Botón de inicio no encontrado");
        return;
      }
  
      startButton.addEventListener("click", () => {
        loadingScreen.style.display = "none";
        initializeMarkerTracking();
      });
    };
  
    // 6. INICIALIZAR SEGUIMIENTO DE MARCADOR (COMPLETO)
    const initializeMarkerTracking = () => {
      const marker = document.getElementById("main-marker");
      const model = document.getElementById("model-entity");
  
      if (!marker || !model) {
        showError("Elementos AR no encontrados", markerStatus);
        return;
      }
  
      updateStatus(markerStatus, "👀 Marcador: Monitoreando...", "info");
      updateStatus(cameraStatus, "📷 Cámara: Activada", "info");
  
      marker.addEventListener("markerFound", () => {
        updateStatus(markerStatus, "🎯 Marcador: Detectado", "success");
  
        // Mostrar panel de información
        if (infoPanel) infoPanel.style.display = "block";
  
        // Activar controles de rotación con rotación automática
        model.setAttribute("model-rotation", {
          speed: 2.5,
          autoRotate: true,
        });
  
        if (document.getElementById("rotation-controls")) {
          document.getElementById("rotation-controls").style.display = "flex";
        }
      });
  
      marker.addEventListener("markerLost", () => {
        updateStatus(markerStatus, "👀 Marcador: Buscando...", "warning");
  
        // Ocultar panel y controles
        if (infoPanel) infoPanel.style.display = "none";
        if (document.getElementById("rotation-controls")) {
          document.getElementById("rotation-controls").style.display = "none";
        }
      });
    };
  
    // --- INICIALIZACIÓN PARA BOO ---
    const booMarker = document.getElementById("marker-boo");
    const booEntity = document.getElementById("entity-boo");
    const booPanel = createBooInfoPanel();
  
    if (booMarker && booEntity) {
      booMarker.addEventListener("markerFound", () => {
        updateStatus(markerStatus, "🎯 Marcador Boo: Detectado", "success");
        updateStatus(cameraStatus, "📷 Cámara: Activada", "info");
  
        if (booPanel) booPanel.style.display = "block";
        booEntity.setAttribute("model-rotation", {
          speed: 2.5,
          autoRotate: true,
        });
        booEntity.setAttribute("float-animation", {
          amplitude: 0.07,
          speed: 1.8,
        });
  
        const controls = document.getElementById("rotation-controls");
        if (controls) controls.style.display = "flex";
      });
  
      booMarker.addEventListener("markerLost", () => {
        updateStatus(markerStatus, "👀 Marcador Boo: Buscando...", "warning");
  
        if (booPanel) booPanel.style.display = "none";
        booEntity.removeAttribute("float-animation");
        const controls = document.getElementById("rotation-controls");
        if (controls) controls.style.display = "none";
      });
    }
  
    // FUNCIONES UTILITARIAS (COMPLETO)
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
  