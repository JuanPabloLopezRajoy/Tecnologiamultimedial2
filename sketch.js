let paleta;

let fondo=[];

let numeroRandom;

let explosion1 = [];
let explosion2 = [];
let explosion3 = [];
let explosion4 = [];

let c; 
let x; 
let y; 

let imagen;

let mancha = [];
let mancha1 = [];
let mancha2 = [];
let mancha3 = [];
let mancha4 = [];
let mancha5 = [];

let mancha6 = [];
let mancha7 = [];
let mancha8 = [];
let mancha9 = [];
let mancha10 = [];
let mancha11 = [];

let opacidad=0;

let cantidad = 4;
let cant = 2;
let can = 2;
let contador = 0;
let coordenadas = [];

let tam;
let tiempo;
let pantallas = 0;


//----CONFIGURACION-----
let AMP_MIN = 0.02; // umbral mínimo de sonido qiu supera al ruido de fondo
let AMP_MAX = 0.2 // amplitud máxima del sonido

let AMORTIGUACION = 0.9; // factor de amortiguación de la señal

//mic
let mic;

let amp; //variable para cargar la amplitud de la señal de entrada del mic

let fft;

let haySonido = false;
let antesHabiaSonido = false; // memoria del estado de "haySonido" un fotograma atrás


function setup() {
  contador=0;
  numeroRandom = Math.floor( random(0,3) );
  createCanvas(715, 1200);
  imageMode(CENTER);

  fondo[0] = loadImage("imagenes/fondo00.jpeg");
  fondo[1] = loadImage("imagenes/fondo01.jpeg");
  fondo[2] = loadImage("imagenes/fondo02.jpeg");
  fondo[3] = loadImage("imagenes/fondo03.jpeg");


  imagen = loadImage("imagenes/cuadrorojo.jpg");




    //----MICROFONO-----
    mic = new p5.AudioIn(); // objeto que se comunica con la enrada de micrófono
    mic.start(); // se inicia el flujo de audio


    
   // Crear un objeto FFT para el análisis de frecuencia
   fft = new p5.FFT();
   fft.setInput(mic);


      //----GESTOR----
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX); // inicilizo en goestor con los umbrales mínimo y máximo de la señal

  gestorAmp.f = AMORTIGUACION;
  //------MOTOR DE AUDIO-----
  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)

  //esto dibuja la misma imagen varias veces ( la cantidad quemarca la variable)
  explosion1 = new Array(cantidad); 
  for (let i = 0; i < cantidad; i++) {
    let nombre = "explosion1" + i + "explosion1.png";
    explosion1[i] = loadImage("imagenes/explosion1.png");
  }

  explosion2 = new Array(cantidad);
  for (let i = 0; i < cantidad; i++) {
    let nombre = "explosion2" + i + "explosion2.png";
    explosion2[i] = loadImage("imagenes/explosion2.png");
  }

  explosion3 = new Array(can);
  for (let i = 0; i < can; i++) {
    let nombre = "explosion3" + i + "explosion3.png";
    explosion3[i] = loadImage("imagenes/explosion3.png");
  }
  explosion4 = new Array(can);
  for (let i = 0; i < can; i++) {
    let nombre = "explosion4" + i + "explosion3.png";
    explosion4[i] = loadImage("imagenes/explosion4.png");
  }


  //Esto crea la cantidad de objetos que se dibujaran en el programa al hablar

  mancha = new Array(cant);
  for (let i = 0; i < can; i++) {
    let nombre = "mancha" + i + "linea.png";
    mancha[i] = loadImage("imagenes/mancha00.png");
  }
  mancha1 = new Array(cant);
  for (let i = 0; i < can; i++) {
    let nombre = "mancha1" + i + "linea1.png";
    mancha1[i] = loadImage("imagenes/mancha01.png");
  }
  mancha2 = new Array(cant);
  for (let i = 0; i < can; i++) {
    let nombre = "mancha2" + i + "linea2.png";
    mancha2[i] = loadImage("imagenes/mancha02.png");
  }

  mancha3 = new Array(cant);
  for (let i = 0; i < can; i++) {
    let nombre = "mancha3" + i + "linea.png";
    mancha3[i] = loadImage("imagenes/mancha03.png");
  }
  mancha4 = new Array(cant);
  for (let i = 0; i < can; i++) {
    let nombre = "mancha4" + i + "linea1.png";
    mancha4[i] = loadImage("imagenes/mancha04.png");
  }
  mancha5 = new Array(cant);
  for (let i = 0; i < can; i++) {
    let nombre = "mancha5" + i + "linea2.png";
    mancha5[i] = loadImage("imagenes/mancha05.png");
  }

  

    lineasCuadro = loadImage("imagenes/lineascuadro.png");
  


  pantallas = 1;

}


function draw() {


   x =  Math.floor( random(imagen.width) );
   y =  Math.floor( random(imagen.height) );

   c = imagen.get( x, y);
 
  gestorAmp.actualizar(mic.getLevel());  

      amp = gestorAmp.filtrada;

      haySonido = amp > AMP_MIN; 

   let empezoElSonido = haySonido && !antesHabiaSonido; // EVENTO

   tam = map(amp ,AMP_MIN , 3, AMP_MIN,5); //mapea el valor minimo de amplitud y el maximo para modificar el tamaño

   let velocudad= 10; //para que se dibuje mas rapido o lento
  
   
     // Obtener el espectro de frecuencias
  let spectrum = fft.analyze();

    // Calcular la frecuencia dominante (pitch)
    let pitch = findPitch(spectrum);
  
          
    let freq = fft.getCentroid();

    console.log(freq/350);
  


if(haySonido){  // ESTADO    


      if(pantallas === 0){
        opacidad=0;
     

        push();
        translate(0, 0);
        rotate(0);
        contador = 0;
        pop();
      }

      if (contador < 2) {
        pantallas = 6;
      }

      if(pantallas === 6){
        scale(2);
        image(fondo[numeroRandom],0,0)
        pantallas = 1;
      }


      if(pantallas === 1 && freq/350 <= 21){  
        //CUANDO SE LLENE LA PANTALLA DE MANCHAS SE PASA AL SIGUIENTE ESTADO

        if(frameCount%velocudad==0){

          if (contador < 15 ) {
          
            
            let cua = int(random(cantidad));
            let x = random(width);
            let y = random(height);
      
            //calcula la densidad deseada
            let densidadDeseada = calcularDensidadDeseada(x, y); 
            let densidadActual = contarImagenesCercanas(x, y);
      
            if (densidadActual < densidadDeseada) { //dibuja la cantidad de objetos hasta llegar al deseado
              push();
              let angulo = radians(random(360));//map(x, 0, width, random(), random()));
              translate(x, y);
              rotate(angulo);
              scale(0.3);
              let cual = int(random(can));
              tint(c);
              image(mancha[cual], 0, 0); //dibuja las manchas   
              image(explosion1[cual], 0, 0);    
              pop();
      
              coordenadas.push({ x: x, y: y });
            }
    
          contador++;
        }
      }
      

      }
    }

      if (contador >= 15) {
        pantallas = 2;
        
      }
     

    if(pantallas === 2){
      if(frameCount%velocudad==0){
          if (contador < 35 && haySonido ) {
          
              let cua = int(random(cantidad));
              let x = random(width);
              let y = random(height);
        
              let densidadDeseada = calcularDensidadDeseada(x, y);
              let densidadActual = contarImagenesCercanas(x, y);
        
              if (densidadActual < densidadDeseada) {
                push();
                let angulo = radians(random(360));
                translate(x, y);
                rotate(angulo);
                scale(0.2);
                let cual = int(random(can));
                tint(c);
                image(explosion2[cual], x, y);
                image(mancha2[cual], 0, 0); 
                pop();
        
                coordenadas.push({ x: x, y: y });
               }
    
               contador++;
           }
       }
    }
    

      if (contador >= 35) {
        pantallas = 3;
        
      }


      if(pantallas === 3){
      if(frameCount%velocudad==0){
        if (contador < 60 && haySonido) {
          let cua = int(random(cantidad));
          let x = random(width);
          let y = random(height);
    
          let densidadDeseada = calcularDensidadDeseada(x, y);
          let densidadActual = contarImagenesCercanas(x, y);
    
          if (densidadActual < densidadDeseada) {
            push();
            let angulo = radians(random(360));
            translate(x, y);
            rotate(angulo);
            scale(tam+random(0.2, 0.6));
            let cual = int(random(can));
            tint(c);
            image(explosion3[cual], x, y); 
            image(mancha3[cual], 0, 0); 
            pop();
    
            coordenadas.push({ x: x, y: y });
          }
    
          contador++;
        }
      }
      }

      
      if (contador >= 60) {
        pantallas = 4;
        
      }

      if(pantallas === 4){
        if(frameCount%velocudad==0){
        if (contador < 80 && haySonido) {
          let cua = int(random(cantidad));
          let x = random(width);
          let y = random(height);
    
          let densidadDeseada = calcularDensidadDeseada(x, y);
          let densidadActual = contarImagenesCercanas(x, y);
    
          if (densidadActual < densidadDeseada) {
            push();
            let angulo = radians(random(360));
            translate(x, y);
            rotate(angulo);
            scale(random(0.7, 1.80));
            let cual = int(random(can));
            tint(c);
            image(explosion4[cual], x, y);
            pop();
    
            coordenadas.push({ x: x, y: y });
          }
    
          contador++;
        }
      }
      }

      if (contador >=80 ) {
        pantallas = 5;
        //else if ordenar diagraa de estados
      }

       if(pantallas === 5){
        if(frameCount%velocudad==0){
        if (contador < 100 && haySonido) {
            push();
            translate(width/2,height/2)
            scale(1);
            image(lineasCuadro,0,0)
            pop();
          contador++;
        }
      }
      }

      if (freq/350 >= 20) {
        background(255,opacidad);
        opacidad++;
      }

       if(opacidad >= 20){
        pantallas = 0;
      }
       
    

function contarImagenesCercanas(x, y) {
  let contador = 0;
  for (let i = 0; i < coordenadas.length; i++) {
  let distancia = dist(x, y, coordenadas[i].x, coordenadas[i].y);
  if (distancia < 20) { // Define un umbral de distancia adecuado
    contador++;
  }
  }
  return contador;
  }
  
  
  function calcularDensidadDeseada(x, y) {
  let distanciaCentro = dist(x, y, width / 2, height / 2);
  let densidadDeseada = map(distanciaCentro, 0, dist(0, 0, width / 2, height / 2), 4, 6);
  return densidadDeseada;
  }
  
  function findPitch(spectrum) {
    let nyquist = sampleRate() / 2;
    let maxAmp = 0;
    let maxIndex = -1;
  
    // Encontrar el índice con la amplitud más alta en el espectro
    for (let i = 0; i < spectrum.length; i++) {
      if (spectrum[i] > maxAmp) {
        maxAmp = spectrum[i];
        maxIndex = i;
      }
    }
    
    // Convertir el índice a frecuencia
    let freq = (maxIndex * nyquist) / spectrum.length;
    return freq;
  }
  
    
}






