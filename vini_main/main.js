/**
* @author JAIME ENRIQUEZ
* @date 20-02-2019
*/
let cajas=[]; //array de cajas
let wh = 40; //width/height
let row = 20; //filas
let col = 20; //columnas
let numCajas = col*row;
/////////////////////////////////////////////////////
let bombas = [];
let numBombas = 30; //30
let modo = 0; //1-> banderas; 0->sin banderas
let pais=0; //0 -> brasil; 1 -> francia ; 2 -> españa
let game_end = false;
let flagged_bombs = 0;
let bombas_puestas=0;
/////////////////////////////////////////////////////
let img1;
let img2;
let caja_img;
let loose_vini;
let parabens;
function preload() {
	caja_img = loadImage('img/caja.jpg');
	loose_vini = loadImage('img/parabens.jpg');
	parabens = loadImage('img/parabens2.jpeg');
	if( pais == 0){
	  img1 = loadImage('img/vini1.png');
		img2 = loadImage('img/bandera1.png');
	}
	else if(pais == 1){
		img1 = loadImage('img/benzi.png');
		img2 = loadImage('img/bandera2.png');
	}
	else if(pais == 2){
		img1 = loadImage('img/lucas.png');
		img2 = loadImage('img/bandera3.png');
	}
}
/////////////////////////////////////////////////////
function setup() {
    // createCanvas(401,402);
		createCanvas(wh*row + 300 ,wh*col+2);
		textSize(32);

		//elegir coordenadas aleatorias de n para bombas
		for(let b = 0; b < numBombas;b++){
			let randomCoor=random(0,numCajas);
			randomCoor = randomCoor - randomCoor % 1;
			if(bombas.includes(randomCoor)==false){
				bombas.push(randomCoor);
			}
			else{
				b--;
			}
		}
		//loop de creacion de cajas
		for (let i = 0; i < row; i++) {
			for(let j=0; j < col; j++){
				if(bombas.includes(cajas.length)){
					cajas.push(new Caja(i*wh,j*wh, wh, wh, true, img1, img2, caja_img));
				}
				else{
					cajas.push(new Caja(i*wh,j*wh, wh, wh, false, img1, img2, caja_img));
				}
			}
  	}
		//creacion de numeros con cajas cerca de bombas
		for (let m = 0; m < numCajas; m++) {
			if(cajas[m].bomb){
				if(cajas[m].x == 0){ //izq
					cajas[m+col].nextToBomb();
					if(cajas[m].y!=0 && cajas[m].y != wh*(col-1)){
						cajas[m+col-1].nextToBomb();
						cajas[m+1].nextToBomb();
						cajas[m+col+1].nextToBomb();
						cajas[m-1].nextToBomb();
					}
					else if(cajas[m].y==0){
						cajas[m+col+1].nextToBomb();
						cajas[m+1].nextToBomb();

					}
					else if(cajas[m].y==wh*(col-1)){
						cajas[m+col-1].nextToBomb();
						cajas[m-1].nextToBomb();
					}
				}

				else if(cajas[m].x == wh * (col-1)){ //der
					cajas[m-col].nextToBomb();
					if(cajas[m].y!=0 && cajas[m].y != wh*(col-1)){
						cajas[m-col+1].nextToBomb();
						cajas[m-1].nextToBomb();
						cajas[m-col-1].nextToBomb();
						cajas[m+1].nextToBomb();
					}
					else if(cajas[m].y==0){
						cajas[m-col+1].nextToBomb();
						cajas[m+1].nextToBomb();

					}
					else if(cajas[m].y==wh*(col-1)){
						cajas[m-col-1].nextToBomb();
						cajas[m-1].nextToBomb();
					}
				}

				else if(cajas[m].y == 0){ //si esta arriba y no en corner
					cajas[m-col].nextToBomb();
					cajas[m-col+1].nextToBomb();
					cajas[m+1].nextToBomb();
					cajas[m+col+1].nextToBomb();
					cajas[m+col].nextToBomb();
				}

				else if(cajas[m].y == (col-1)*wh){ //si esta abajo y no en corner
					cajas[m-col].nextToBomb();
					cajas[m-col-1].nextToBomb();
					cajas[m-1].nextToBomb();
					cajas[m+col-1].nextToBomb();
					cajas[m+col].nextToBomb();
				}
				else{ //tiene 8 celdas a sus lados
					cajas[m-col].nextToBomb();
					cajas[m-col-1].nextToBomb();
					cajas[m-1].nextToBomb();
					cajas[m+col-1].nextToBomb();
					cajas[m+col].nextToBomb();
					cajas[m+col+1].nextToBomb();
					cajas[m+1].nextToBomb();
					cajas[m-col+1].nextToBomb();
				}

			}

		}
}
///////////////////////////////////////////////////////////////////
function draw() {

	background(51);
	fill("white");
	textSize(10);
	if(pais == 0)
		text("Pais: Brasil",width-100, 10);
	else if(pais == 1)
		text("Pais: Francia",width-100, 10);
	else
		text("Pais: Espania",width-100, 10);

	text("By Jaime Enriquez", width-290, height - 10);
	if(numBombas < numCajas * 0.2)
		text("Dificultad: Baja",width-290, 10);
	else if(numBombas < numCajas * 0.3)
		text("Dificultad: Media",width-290, 10);
	else if(numBombas < numCajas * 0.4)
		text("Dificultad: Alta",width-290, 10);
	else if(numBombas == numCajas - 1)
		text("Dificultad: Loco",width-290, 10);

	if(!game_end){
		fill("white");
		textSize(20);
		text("Bombas restantes: "+bombas_puestas+"/"+numBombas, width-260, 110);
		if(modo == 1){//banderas
			text("Modo banderas", width-220, 140);
		}
		else{
			text("Modo minas", width-220, 140);
		}
	}
	else{
		fill("white");
		textSize(20);
		text("GAME OVER.", width-220,110);
		textSize(15);
		text("Recarga la pagina para volver a jugar", width-290, 160);
		image(loose_vini, width-290, 190, 170, 200);
		text("SIENTO MOITO", width-115, 250);
		text("IRMAO", width-105, 270);
	}
	flagged_bombs=0;
	for (let i = 0; i < cajas.length; i++) {

		textSize(20);
		if(cajas[i].bomb && cajas[i].flag){
			flagged_bombs ++;
		}
		if(flagged_bombs == numBombas){
			image(parabens, width-290, 210, 280, 170);
			text("PARABENS IRMAO", width-220, 190);
		}
		textSize(32);

		if(cajas[i].clicked && cajas[i].bomb){
			fill('brown');
			cajas[i].display();
			game_end = true;
		}
		else if(cajas[i].clicked && cajas[i].bomb == false){
			if(cajas[i].isNumber ==0){
				fill('gray');
				//abrir todas las celdas que tocan con celda vacia
				if(cajas[i].x == 0){ //izq
					if(cajas[i].y!=0 && cajas[i].y != wh*(col-1)){ //no estan en esquinas
						cajas[i+col].clicked=true;
						cajas[i+col-1].clicked=true;
						cajas[i+col+1].clicked=true;
						cajas[i+1].clicked=true;
						cajas[i-1].clicked=true;
					}
					else if(cajas[i].y==0){
						cajas[i+col].clicked=true;
						cajas[i+col+1].clicked=true;
						cajas[i+1].clicked=true;
					}
					else if(cajas[i].y==wh*9){
						cajas[i+col-1].clicked=true;
						cajas[i+col].clicked=true;
						cajas[i-1].clicked=true;
					}
				}
				else if(cajas[i].x == wh * (col-1)){ //der
					if(cajas[i].y!=0 && cajas[i].y != wh*(col-1)){ //no estan en esquinas
						cajas[i-col].clicked=true;
						cajas[i-col+1].clicked=true;
						cajas[i-col-1].clicked=true;
						cajas[i-1].clicked=true;
						cajas[i+1].clicked=true;
					}
					else if(cajas[i].y==0){
						cajas[i-col].clicked=true;
						cajas[i-col+1].clicked=true;
						cajas[i+1].clicked=true;
					}
					else if(cajas[i].y==wh*(col-1)){
						cajas[i-col-1].clicked=true;
						cajas[i-col].clicked=true;
						cajas[i-1].clicked=true;
					}
				}
				else if(cajas[i].y == 0){ //arriba
					cajas[i-col].clicked = true;
					cajas[i-col+1].clicked = true;
					cajas[i+1].clicked = true;
					cajas[i+col+1].clicked = true;
					cajas[i+col].clicked = true;
				}
				else if(cajas[i].y == (col-1)*wh){ //abajo
					cajas[i-col].clicked = true;
					cajas[i-col-1].clicked = true;
					cajas[i-1].clicked = true;
					cajas[i+col-1].clicked = true;
					cajas[i+col].clicked = true;
				}
				else{
					cajas[i-col].clicked = true;
					cajas[i-col-1].clicked = true;
					cajas[i-1].clicked = true;
					cajas[i+col-1].clicked = true;
					cajas[i+col].clicked = true;
					cajas[i+col+1].clicked = true;
					cajas[i+1].clicked = true;
					cajas[i-col+1].clicked = true;
				}
			}
			else if(cajas[i].isNumber ==1){
				fill('blue');
			}
			else if(cajas[i].isNumber ==2){
				fill('green');
			}
			else if(cajas[i].isNumber ==3){
				fill('red');
			}
			else if(cajas[i].isNumber ==4){
				fill('purple');
			}
			else if(cajas[i].isNumber ==5){
				fill('orange');
			}
			cajas[i].display();

		}
		else if(!cajas[i].clicked && cajas[i].flag){
			fill('white');
			cajas[i].display();

		}
		else{
			fill('white');
			cajas[i].display();

		}
  }
}

function mouseClicked(){
	if(game_end){
		for(let i=0;i<cajas.length;i++){
			if(cajas[i].bomb){
				cajas[i].clicked = true;
			}
		}
	}
	else if(!game_end){
		if(modo==0){

			for(let i =0;i<cajas.length;i++){
				if(mouseX > cajas[i].x && mouseX < cajas[i].x + wh && mouseY > cajas[i].y && mouseY < cajas[i].y + wh){
					if(!cajas[i].flag && !cajas[i].clicked)
						cajas[i].clickedon();
					else if(cajas[i].clicked && cajas[i].isNumber>0){
						let bombMarcadas = 0;
						if(cajas[i].x == 0){ //izq
							if(cajas[i].y!=0 && cajas[i].y != wh*(col-1)){ //no estan en esquinas
								bombMarcadas+=cajas[i+col].flag+cajas[i+col-1].flag+cajas[i+1+col].flag+cajas[i+1].flag+cajas[i-1].flag;
								if(bombMarcadas==cajas[i].isNumber){
									cajas[i+col].clicked=!cajas[i+col].flag;
									cajas[i+col-1].clicked=!cajas[i+col-1].flag;
									cajas[i+col+1].clicked=!cajas[i+col+1].flag;
									cajas[i+1].clicked=!cajas[i+1].flag;
									cajas[i-1].clicked=!cajas[i-1].flag;
								}
							}
							else if(cajas[i].y==0){
								bombMarcadas+=cajas[i+col].flag+cajas[i+col+1].flag+cajas[i+1].flag;
								if(bombMarcadas==cajas[i].isNumber){
									cajas[i+col].clicked=!cajas[i+col].flag;
									cajas[i+col+1].clicked=!cajas[i+col+1].flag;
									cajas[i+1].clicked=!cajas[i+1].flag;
								}
							}
							else if(cajas[i].y==wh*(col-1)){
								bombMarcadas+=cajas[i+col-1].flag+cajas[i+col].flag+cajas[i-1].flag;
								if(bombMarcadas==cajas[i].isNumber){
									cajas[i+col-1].clicked=!cajas[i+col-1].flag;
									cajas[i+col].clicked=!cajas[i+col].flag;
									cajas[i-1].clicked=!cajas[i-1].flag;
								}
							}
						}
						else if(cajas[i].x == wh * (col-1)){ //der
							if(cajas[i].y!=0 && cajas[i].y != wh*(col-1)){ //no estan en esquinas
								bombMarcadas+=cajas[i-col].flag+cajas[i-col+1].flag+cajas[i-col-1].flag+cajas[i-1].flag+cajas[i+1].flag;
								if(bombMarcadas==cajas[i].isNumber){
									cajas[i-col].clicked=!cajas[i-col].flag;
									cajas[i-col+1].clicked=!cajas[i-col+1].flag;
									cajas[i-col-1].clicked=!cajas[i-col-1].flag;
									cajas[i-1].clicked=!cajas[i-1].flag;
									cajas[i+1].clicked=!cajas[i+1].flag;
								}
							}
							else if(cajas[i].y==0){
								bombMarcadas+=cajas[i-col].flag+cajas[i-col+1].flag+cajas[i+1].flag;
								if(bombMarcadas==cajas[i].isNumber){
									cajas[i-col].clicked=!cajas[i-col].flag;
									cajas[i-col+1].clicked=!cajas[i-col+1].flag;
									cajas[i+1].clicked=!cajas[i+1].flag;
								}
							}
							else if(cajas[i].y==wh*(col-1)){
								bombMarcadas+=cajas[i-col-1].flag+cajas[i-col].flag+cajas[i-1].flag;
								if(bombMarcadas==cajas[i].isNumber){
									cajas[i-col-1].clicked=!cajas[i-col-1].flag;
									cajas[i-col].clicked=!cajas[i-col].flag;
									cajas[i-1].clicked=!cajas[i-1].flag;
								}
							}
						}
						else if(cajas[i].y == 0){ //arriba
							bombMarcadas+=cajas[i-col].flag+cajas[i-col+1].flag+cajas[i+1].flag+cajas[i+11].flag+cajas[i+col].flag;
							if(bombMarcadas==cajas[i].isNumber){
								cajas[i-col].clicked = !cajas[i-col].flag;
								cajas[i-col+1].clicked = !cajas[i-col+1].flag;
								cajas[i+1].clicked = !cajas[i+1].flag;
								cajas[i+col+1].clicked = !cajas[i+col+1].flag;
								cajas[i+col].clicked = !cajas[i+col].flag;
							}
						}
						else if(cajas[i].y == (col-1)*wh){ //abajo
							bombMarcadas+=cajas[i-col].flag+cajas[i+col-1].flag+cajas[i-col-1].flag+cajas[i+col].flag+cajas[i-1].flag;
							if(bombMarcadas==cajas[i].isNumber){
								cajas[i-col].clicked = !cajas[i-col].flag;
								cajas[i-col-1].clicked = !cajas[i-col-1].flag;
								cajas[i-1].clicked = !cajas[i-1].flag;
								cajas[i+col-1].clicked = !cajas[i+col-1].flag;
								cajas[i+col].clicked = !cajas[i+col].flag;
							}
						}
						else{
							bombMarcadas+=cajas[i-col].flag+cajas[i-col-1].flag+cajas[i-1].flag+cajas[i+col-1].flag+cajas[i+col].flag+cajas[i+col+1].flag+cajas[i+1].flag+cajas[i-col+1].flag;
							if(bombMarcadas==cajas[i].isNumber){
								cajas[i-col].clicked = !cajas[i-col].flag;
								cajas[i-col-1].clicked = !cajas[i-col-1].flag;
								cajas[i-1].clicked = !cajas[i-1].flag;
								cajas[i+col-1].clicked = !cajas[i+col-1].flag;
								cajas[i+col].clicked = !cajas[i+col].flag;
								cajas[i+col+1].clicked = !cajas[i+col+1].flag;
								cajas[i+1].clicked = !cajas[i+1].flag;
								cajas[i-col+1].clicked = !cajas[i-col+1].flag;
							}
						}
					}
				}
			}
		}
		else if(modo==1){
			for(let i =0;i<cajas.length;i++){
				if(mouseX > cajas[i].x && mouseX < cajas[i].x + wh && mouseY > cajas[i].y && mouseY < cajas[i].y + wh){
					if(!cajas[i].clicked){
						if(cajas[i].flag)
							bombas_puestas--;

						else
							bombas_puestas++;
						cajas[i].clicked=false;
						cajas[i].putFlagOn();
					}
					else if(cajas[i].clicked && cajas[i].isNumber>0){
						let bombMarcadas = 0;
						if(cajas[i].x == 0){ //izq
							if(cajas[i].y!=0 && cajas[i].y != wh*(col-1)){ //no estan en esquinas
								bombMarcadas+=cajas[i+col].flag+cajas[i+col-1].flag+cajas[i+1+col].flag+cajas[i+1].flag+cajas[i-1].flag;
								if(bombMarcadas==cajas[i].isNumber){
									cajas[i+col].clicked=!cajas[i+col].flag;
									cajas[i+col-1].clicked=!cajas[i+col-1].flag;
									cajas[i+col+1].clicked=!cajas[i+col+1].flag;
									cajas[i+1].clicked=!cajas[i+1].flag;
									cajas[i-1].clicked=!cajas[i-1].flag;
								}
							}
							else if(cajas[i].y==0){
								bombMarcadas+=cajas[i+col].flag+cajas[i+col+1].flag+cajas[i+1].flag;
								if(bombMarcadas==cajas[i].isNumber){
									cajas[i+col].clicked=!cajas[i+col].flag;
									cajas[i+col+1].clicked=!cajas[i+col+1].flag;
									cajas[i+1].clicked=!cajas[i+1].flag;
								}
							}
							else if(cajas[i].y==wh*(col-1)){
								bombMarcadas+=cajas[i+col-1].flag+cajas[i+col].flag+cajas[i-1].flag;
								if(bombMarcadas==cajas[i].isNumber){
									cajas[i+col-1].clicked=!cajas[i+col-1].flag;
									cajas[i+col].clicked=!cajas[i+col].flag;
									cajas[i-1].clicked=!cajas[i-1].flag;
								}
							}
						}
						else if(cajas[i].x == wh * (col-1)){ //der
							if(cajas[i].y!=0 && cajas[i].y != wh*(col-1)){ //no estan en esquinas
								bombMarcadas+=cajas[i-col].flag+cajas[i-col+1].flag+cajas[i-col-1].flag+cajas[i-1].flag+cajas[i+1].flag;
								if(bombMarcadas==cajas[i].isNumber){
									cajas[i-col].clicked=!cajas[i-col].flag;
									cajas[i-col+1].clicked=!cajas[i-col+1].flag;
									cajas[i-col-1].clicked=!cajas[i-col-1].flag;
									cajas[i-1].clicked=!cajas[i-1].flag;
									cajas[i+1].clicked=!cajas[i+1].flag;
								}
							}
							else if(cajas[i].y==0){
								bombMarcadas+=cajas[i-col].flag+cajas[i-col+1].flag+cajas[i+1].flag;
								if(bombMarcadas==cajas[i].isNumber){
									cajas[i-col].clicked=!cajas[i-col].flag;
									cajas[i-col+1].clicked=!cajas[i-col+1].flag;
									cajas[i+1].clicked=!cajas[i+1].flag;
								}
							}
							else if(cajas[i].y==wh*(col-1)){
								bombMarcadas+=cajas[i-col-1].flag+cajas[i-col].flag+cajas[i-1].flag;
								if(bombMarcadas==cajas[i].isNumber){
									cajas[i-col-1].clicked=!cajas[i-col-1].flag;
									cajas[i-col].clicked=!cajas[i-col].flag;
									cajas[i-1].clicked=!cajas[i-1].flag;
								}
							}
						}
						else if(cajas[i].y == 0){ //arriba
							bombMarcadas+=cajas[i-col].flag+cajas[i-col+1].flag+cajas[i+1].flag+cajas[i+11].flag+cajas[i+col].flag;
							if(bombMarcadas==cajas[i].isNumber){
								cajas[i-col].clicked = !cajas[i-col].flag;
								cajas[i-col+1].clicked = !cajas[i-col+1].flag;
								cajas[i+1].clicked = !cajas[i+1].flag;
								cajas[i+col+1].clicked = !cajas[i+col+1].flag;
								cajas[i+col].clicked = !cajas[i+col].flag;
							}
						}
						else if(cajas[i].y == (col-1)*wh){ //abajo
							bombMarcadas+=cajas[i-col].flag+cajas[i+col-1].flag+cajas[i-col-1].flag+cajas[i+col].flag+cajas[i-1].flag;
							if(bombMarcadas==cajas[i].isNumber){
								cajas[i-col].clicked = !cajas[i-col].flag;
								cajas[i-col-1].clicked = !cajas[i-col-1].flag;
								cajas[i-1].clicked = !cajas[i-1].flag;
								cajas[i+col-1].clicked = !cajas[i+col-1].flag;
								cajas[i+col].clicked = !cajas[i+col].flag;
							}
						}
						else{
							bombMarcadas+=cajas[i-col].flag+cajas[i-col-1].flag+cajas[i-1].flag+cajas[i+col-1].flag+cajas[i+col].flag+cajas[i+col+1].flag+cajas[i+1].flag+cajas[i-col+1].flag;
							if(bombMarcadas==cajas[i].isNumber){
								cajas[i-col].clicked = !cajas[i-col].flag;
								cajas[i-col-1].clicked = !cajas[i-col-1].flag;
								cajas[i-1].clicked = !cajas[i-1].flag;
								cajas[i+col-1].clicked = !cajas[i+col-1].flag;
								cajas[i+col].clicked = !cajas[i+col].flag;
								cajas[i+col+1].clicked = !cajas[i+col+1].flag;
								cajas[i+1].clicked = !cajas[i+1].flag;
								cajas[i-col+1].clicked = !cajas[i-col+1].flag;
							}
						}
					}
				}
			}
		}
	}
}

function keyPressed() {
  if (keyCode === CONTROL) {
    modo=!modo;
		if(modo)
			print("Modo banderas");
		else
			print("Modo normal");
	}

}
