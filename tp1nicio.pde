/* TP1 / TECNOLOGIA MULTIMEDIAL 2/ 2024 /

COMISION: Matias Jauregui Lorda
ALUMNOS: Alumno 1, Alumno2, Alumno3
VIDEO:
*/

//Cuadro c;
PImage manchas[];
PImage salpicados[];

int cantidad = 12;
PImage mascara, fondo, sello;
Paleta paleta;
boolean estado1, estado2, estado4;
Escena1 e1;
Escena2 e2;
Escena4 e4;
Escena3 e3;

void setup() {
  
size(715, 1200);


e1 = new Escena1();
e2 = new Escena2();
e4 = new Escena4();
e3 = new Escena3();
e3.dibujarEscena3();

  


}

void draw(){

 /*
 if( estado1){
 e1.dibujarEscena1();
 }
 if( estado2){
 e2.dibujarEscena2();
 }
/*if( estado4 ){
 e4.dibujarEscena4();
 }*/

}

void keyPressed() {
  if (key == 's' ) {
    
    
  e1.dibujarEscena1();
  } 
 if (key == 'd' ) {
    
    
    e2.dibujarEscena2();
  } 
 if(key == 'g' ) {
  
    
    e4.dibujarEscena4();
  } 
  
 if(key == 'b' ) {
   setup();
 }

}
