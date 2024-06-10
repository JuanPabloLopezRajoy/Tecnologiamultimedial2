
class Escena2 {

  int cantidad = 4;
  PImage [] salpicados = new PImage [cantidad];
  PImage mascara1;


  Escena2() {
    for (int i=0; i<cantidad; i++) {
      String nombre = "salpic0"+i+".png";
      salpicados[i] = loadImage(nombre);    
    }
  }
  void dibujarEscena2() {
    int cual = int(random(cantidad));
    float x = random(0-50,width-50);
    float y = random(0-50,height-50);

    image(salpicados[cual], x, y,300,300);

  }
}
