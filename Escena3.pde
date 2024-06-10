class Escena3 {

  int cantidad = 4;
  PImage [] fondo = new PImage [cantidad];


  Escena3() {
    for (int i=0; i<cantidad; i++) {
      String nombre = "fondo0"+i+".jpeg";
      fondo[i] = loadImage(nombre);
      imageMode(CORNER);
    }
  }
  void dibujarEscena3() {
    int cual = int(random(cantidad));

    image(fondo[cual],0,0, width, height);

  }
}
