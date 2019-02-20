/**
* @author JAIME ENRIQUEZ
* @date 20-02-2019
*/
class Caja {
	constructor(cx, cy, cw, ch, b, im1, im2, caja_img){
		this.x = cx;
		this.y = cy;
		this.width = cw;
		this.height = ch;
		this.clicked = false;
		this.bomb = b;
		this.isNumber=0;
		this.flag=false;
		this.img1 = im1; //jugador
		this.img2 = im2; //bandera
		this.caja = caja_img;
	}
	clickedon(){
		if(this.clicked == false){
			this.clicked=true;
		}
	}
	putFlagOn(){
		this.flag=!this.flag;
	}
	nextToBomb(){
		this.isNumber = this.isNumber + 1;
	}
	display(){
		rect(this.x, this.y, this.width, this.height);
		if(!this.bomb && this.isNumber!=0 && !this.flag && this.clicked){
			fill("white");
			text(this.isNumber, this.x+this.width/4.5, this.y+this.height-this.height/5);
		}
		else if(this.flag){
			image(this.caja,this.x, this.y, this.width, this.height);
			image(this.img2, this.x+5, this.y+5, this.width-10, this.height-10);
		}
		else if(this.bomb && this.clicked){
			image(this.img1, this.x, this.y, this.width, this.height);
		}
		else if(!this.clicked){
			image(this.caja,this.x, this.y, this.width, this.height);
		}
	}

}
