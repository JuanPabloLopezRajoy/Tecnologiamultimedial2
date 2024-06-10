/*acá iria lo que vemos primero, el fondo de un color uniforme
 enseguida aparecerian manchas con opacidad*/

class Escena1 {
  PImage manchas[];
  int cantidad = 12;
  PImage mascara;
  Paleta paleta;

  Escena1() {

    paleta = new Paleta("cuadrorojo.jpg");



    manchas = new PImage[ cantidad ];
    for (int i=0; i<cantidad; i++) {
      String nombre = "mancha0"+i+".png";
      mascara = loadImage (nombre);
      mascara.filter( INVERT );
      manchas[i] = createImage( 715, 295, RGB );
      manchas[i].filter( INVERT );
      manchas[i].mask( mascara );
    }
  }
  void dibujarEscena1() {
    int cual = int(random(cantidad));
    float x = random(0-100,width-100);
    float y = random(0-100,height-100);

    image(manchas[cual], x, y);

    tint (paleta.darUnColor(), 200);
  }
}
