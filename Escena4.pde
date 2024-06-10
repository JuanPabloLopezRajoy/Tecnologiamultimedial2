

class Escena4 {
  
  PImage mascara;
  PImage sello;
  Paleta paleta;

  Escena4() {

    paleta = new Paleta("cuadrorojo.jpg");
    sello = loadImage("lineascuadro.png");


    
    
      String nombre = "lineascuadro.png";
     // mascara = loadImage (nombre);
      //mascara.filter( INVERT );
      //sello = createImage( 400, 400, RGB );
     // sello.filter( INVERT );
      //sello.mask( mascara );
    
  }
  void dibujarEscena4() {
   
    float x = width/2-200;
    float y = height/2-400;

    image(sello, x, y, 450, 450);

    //tint (paleta.darUnColor());
  }
}
  
