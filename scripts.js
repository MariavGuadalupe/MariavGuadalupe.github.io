


    const {
      useQuasar,
      QSpinnerGears
    } = Quasar
    const {
      ref
    } = Vue
    const app = Vue.createApp({
      setup() {
        const $q = useQuasar()

        function showCustom() {
          $q.notify({
            message: '<div><br>Al continuar navegando, aceptas la <a href="/politicadecookies.html">Política de Cookies</a>. Puedes gestionar tus preferencias en cualquier momento a través de la configuración de tu navegador.</div>',
            color: 'primary',
            multiLine: true,
            html: true,
            actions: [{
              label: 'Aceptar',
              color: 'yellow',
              handler: () => {
                 }
            }]
          })
        }
        return {
          showCustom,
          persistent: ref(false),
          tab: ref('Verdades'),
          fullHeight: ref(false),
          drawer: ref(false),
          slide: ref(1),
          slide: ref(1),
          autoplay: ref(false),
          persistent: ref(false),
          dialog: ref(false),
          maximizedToggle: ref(true)
        }
      }
    })
    app.use(Quasar, {
      config: {}
    })
    app.mount('#q-app')
 
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });
    document.getElementById('btninstalar').addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('La página se ha instalado correctamente');
            document.getElementById('btninstalar').style.display = 'none';
            document.getElementById('banner1').style.display = 'none';
          }
          deferredPrompt = null;
        });
      }
    });

    let promptEvent;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      promptEvent = e;
    });

    const aside = document.querySelector('.q-drawer.q-drawer--left.q-drawer--on-top.q-drawer--mobile.q-drawer--top-padding');
    aside.style.opacity = "0.8";
    aside.style.background = "#B2EBF2";
    //window.addEventListener("load", finicio);
    function finicio() {
      if (navigator.userAgent.match(/Android/i)) {} else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {}
      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone || document.referrer.includes('android-app://')) {} else {
        document.getElementById('banner1').style.display = 'block';
        if (bowser.name !== "Chrome") {
          document.getElementById('btninstalar').style.display = 'none';
        } else {
          document.getElementById('btnChrome').style.display = 'none';
        }
      }
      if (Notification.permission === 'denied') {
        const btnModal = document.getElementById('btn_modal');
        btnModal.click();
      }
    }


        document.addEventListener('DOMContentLoaded', () => {
            let canvas = document.getElementById('glscreen');
            let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) {
                console.error('WebGL no está soportado en este navegador.');
                return;
            }

            let program, buffer;
            let locationOfTime, locationOfResolution;
            const startTime = performance.now();
            
            function init() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                gl.viewport(0, 0, canvas.width, canvas.height);

                // Crear y configurar el buffer
                buffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                    -1.0, -1.0,
                    1.0, -1.0,
                    -1.0, 1.0,
                    -1.0, 1.0,
                    1.0, -1.0,
                    1.0, 1.0
                ]), gl.STATIC_DRAW);

                // Compilar y verificar shaders
                const vertexShader = createShader(gl.VERTEX_SHADER, '2d-vertex-shader');
                const fragmentShader = createShader(gl.FRAGMENT_SHADER, '2d-fragment-shader');

                // Crear el programa WebGL
                program = gl.createProgram();
                gl.attachShader(program, vertexShader);
                gl.attachShader(program, fragmentShader);
                gl.linkProgram(program);
                if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                    console.error('Error al vincular el programa:', gl.getProgramInfoLog(program));
                    return;
                }
                gl.useProgram(program);

                // Obtener ubicaciones de los uniformes
                locationOfResolution = gl.getUniformLocation(program, "u_resolution");
                locationOfTime = gl.getUniformLocation(program, "u_time");

                // Establecer valores iniciales
                gl.uniform2f(locationOfResolution, canvas.width, canvas.height);
                gl.uniform1f(locationOfTime, 0);

                render();
            }

            function createShader(type, scriptId) {
                const shaderSource = document.getElementById(scriptId).text;
                const shader = gl.createShader(type);
                gl.shaderSource(shader, shaderSource);
                gl.compileShader(shader);
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    console.error(`Error al compilar el shader ${scriptId}:`, gl.getShaderInfoLog(shader));
                    return null;
                }
                return shader;
            }

            function render() {
                const currentTime = (performance.now() - startTime) / 1000;
                gl.uniform1f(locationOfTime, currentTime);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                
                const positionLocation = gl.getAttribLocation(program, "a_position");
                gl.enableVertexAttribArray(positionLocation);
                gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

                gl.drawArrays(gl.TRIANGLES, 0, 6);
                requestAnimationFrame(render);
            }

            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.uniform2f(locationOfResolution, canvas.width, canvas.height);
            });

            init();
        });
 
   document.addEventListener('DOMContentLoaded', () => {
            // Obtén referencias a los elementos del DOM
            const container1 = document.getElementById('container1');
            const glscreen = document.getElementById('glscreen');
            const qApp = document.getElementById('q-app');
            const buttonNa = document.getElementById('buttonNa');

            // Función para cambiar el fondo de container1
            function resetBackground() {
                container1.style.backgroundImage = "none";
            }

            // Inicializar el estilo del contenedor
            container1.style.backgroundImage = "radial-gradient(circle at 75.98% 68.19%, #ffb600 0, #ffbf00 8.33%, #f9c700 16.67%, #e5cf00 25%, #d0d500 33.33%, #b9db00 41.67%, #a1e000 50%, #86e42a 58.33%, #64e843 66.67%, #2feb5a 75%, #00ee71 83.33%, #00f087 91.67%, #00f29f 100%)";

            // Evento de clic en el botón
            buttonNa.addEventListener('click', () => {
                glscreen.style.display = 'none';
                container1.style.display = 'none';
                qApp.style.display = 'block';
                
                // Asegúrate de que los estilos de desbordamiento sean visibles
                document.documentElement.style.overflow = 'visible';
                document.body.style.overflow = 'visible';
                
                // Llama a finicio si está definida (asegúrate de que la función finicio esté definida en tu código)
                if (typeof finicio === 'function') {
                    finicio();
                } else {
                    console.warn('Función finicio no definida.');
                }
            });

            // Llame a la función de gradiente después de la carga
            window.addEventListener('load', resetBackground);
        });

  // Función para manipular elementos de manera segura
  function manipulateDOM() {
    const divConta1 = document.getElementById("container1");
    const fondoColores = document.getElementById("glscreen");
    const divQ2 = document.getElementById('q-app');
    
    // Asegúrate de que los elementos existen antes de manipularlos
    if (divConta1 && fondoColores && divQ2) {
      fondoColores.style.display = 'none';
      divConta1.style.display = 'none';
      divQ2.style.display = 'block';

      const htmlElement = document.querySelector('html');
      const bodyElement = document.querySelector('body');

      if (htmlElement && bodyElement) {
        htmlElement.style.overflow = 'visible';
        bodyElement.style.overflow = 'visible';
      } else {
        console.warn('Elementos <html> o <body> no encontrados.');
      }
    } else {
      console.warn('Uno o más elementos necesarios no están presentes en el DOM.');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Verifica el entorno de visualización de la aplicación antes de manipular el DOM
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone || document.referrer.includes('android-app://')) {
      manipulateDOM();
    }
  });




  document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('loader3');
    const men1 = document.getElementById('b1');
    const btnCookies = document.getElementById('btncookies');

    if (preloader && men1 && btnCookies) {
      setTimeout(() => {
        try {
          const swiperContainer = document.getElementById('swiperContainer');
          if (swiperContainer) {
            swiperContainer.style.display = 'block';
          }

          men1.style.display = 'none';
          preloader.style.display = 'none';
btnCookies.click();
          
        } catch (error) {
          console.error('Error al manipular los elementos del DOM:', error);
        }
      }, 4000);
    } else {
      console.warn('Uno o más elementos necesarios no están presentes en el DOM.');
    }
  });

