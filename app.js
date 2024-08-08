const ROWS = 6; //ligne
const COLUMNS = 7; //colonne
const IN_A_ROW = 4; //puissance 4
const PLAYER_COLORS = ["", "red", "yellow"]; //couleur joueur
let tableau = []; //tableau grille
let currentPlayerTurn = 1; //tour joueur
let maGrilleHTML = document.getElementById("grille"); //affiche le tableau
let htmlGrid = ""; //tableau cellule
let pseudo_Joueur = [""]; //pseudo joueur

//Déclaration tableau
for (let i = 0; i < ROWS; i++) {
	tableau.push([]);
	for (let j = 0; j < COLUMNS; j++) {
		tableau[i].push(0);
	}
}

//Changement de joueur 1 et 2
function ChangerTour() {
	let tourJ = document.getElementById("tourJ");
	if(currentPlayerTurn == 1) {
		currentPlayerTurn = 2;
		tourJ.innerHTML = currentPlayerTurn; //Changement tour
	} else {
		currentPlayerTurn = 1;
		tourJ.innerHTML = currentPlayerTurn; //Changement tour
	}
}

//Définit le tableau avec le HTML
//Récupère la div "grille" dans le HTML
for (let i = 0; i < ROWS; i++) {
	//Ouverture de la balise ROWS
	htmlGrid += '<div class="row">';
	for (let j = 0; j < COLUMNS; j++) {
		let cellID = i + "," + j;
		//Cellule COLUMNS et numérote les cellules
		htmlGrid += '<div class="cell" id = "'+ cellID +'"></div>';
	}
	//Fermeture de la balise ROWS
	htmlGrid += "</div>";
}
//Donne la grille
maGrilleHTML.innerHTML = htmlGrid

//Evènement touche digit et enter
function Touche(event) {
	if(event.key == "Enter") {
		reset();
	}

	let keyCode = event.code;
	if(!keyCode.includes("Digit")) {
		//Mauvaise touche
		return
	}
	//Bonne touche
	let characterIndex = keyCode.length - 1;
	let columnString = keyCode.substring(characterIndex);
	let column = parseInt(columnString);
	insertionJeton(column - 1);
  	//console.log(keyCode); //Test
}
document.addEventListener("keydown", Touche);

//Jetons dans la grille
function insertionJeton(column) {
	for(let i = 0; i < tableau.length; i++) {
		//Deux conditions bas case prise et limite haut
		if (i + 1 >= ROWS || tableau[i + 1][column] != 0 && tableau[i][column] == 0) {
			//Drop jeton par rapport au tour de jeu
			tableau[i][column] = currentPlayerTurn;
			//Appel fonction
			insertionHTMLJeton(i, column);
			verificationVictoire(i, column);
			ChangerTour();
			MatchNul();
		break;
		}
	}
	return true;
}

//Valeur différente pour les joueurs avec les couleurs rouge et jaune
function insertionHTMLJeton(red, yellow) {
	const currentPlayerColor = PLAYER_COLORS[currentPlayerTurn]
	document.getElementById(red + "," + yellow).classList.add(
		currentPlayerColor);
}

//Vérification victoire base principale
function verificationVictoire(row, column) {
	for (let i = 0; i < ROWS; i++) {
		for(let j = 0; j < COLUMNS; j++) {
			if(HorizontalAlignment(i, j) ||
				VerticalAlignment(i, j) ||
				DiagonalLeftAlignment(i, j) ||
				DiagonalRightAlignment(i, j)) {
				//Affichage pour l'utilisateur
				alert("Bravo le joueur : " + currentPlayerTurn + " a gagné !!!");
				alert("Partie terminée appuyer sur ENTER pour recommencer");
				return true;
			}
		}
	}
	//Retourne rien
	return false;
}

//Vérification victoire horizontal
function HorizontalAlignment(row, column){
	if(column + IN_A_ROW > COLUMNS) {
		return false;
	}
	for(let i = 0; i < IN_A_ROW; i++) {
		if(tableau[row][column + i] != currentPlayerTurn) {
			return false;
		}
	}
	return true;
}

//Vérification victoire vertical
function VerticalAlignment(row, column){
	if(row + IN_A_ROW > ROWS) {
		return false;
	}
	for(let i = 0; i < IN_A_ROW; i++) {
		if(tableau[row + i][column] != currentPlayerTurn) {
			return false;
		}
	}
	return true;
}

//Vérification victoire diagonal droite
function DiagonalRightAlignment(row, column){
	if(column + IN_A_ROW > COLUMNS || row + IN_A_ROW > ROWS) {
		return false;
	}
	for(let i = 0; i < IN_A_ROW; i++) {
		if(tableau[row + i][column + i] != currentPlayerTurn) {
			return false;
		}
	}
	return true;
}

//Vérification victoire diagonal gauche
function DiagonalLeftAlignment(row, column){
	if(column - (IN_A_ROW - 1) < 0 || row + IN_A_ROW > ROWS) {
		return false;
	}
	for(let i = 0; i < IN_A_ROW; i++) {
		if(tableau[row + i][column - i] != currentPlayerTurn) {
			return false;
		}
	}
	return true;
}

//Match nul
function MatchNul() {
	for(let i = 0; i < ROWS; i++) {
		for(let j = 0; j < COLUMNS; j++) {
			if(tableau[i][j] == 0) {
				return false;
			}
		}
	}
	//Affichage pour l'utilisateur
	alert("Egalité dommage ☺");
	return true;
}

//Permet d'enlever les jetons en liaison avec la fonction event
function reset() {
	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLUMNS; j++) {
			tableau[i][j] = 0;
			let cell = document.getElementById(i + "," + j);
			cell.classList.remove("red", "yellow");
		}
	}
	ChangerTour();
}

 //Interface joueur demande un pseudo et l'affiche dans un bloc
function choixPseudo() {
	pseudo_Joueur[1] = prompt("Insérer votre pseudo pour le joueur 1", "Joueur 1");
	if (pseudo_Joueur[1] == null || pseudo_Joueur[1] === "") {
		pseudo_Joueur[1] = "Joueur 1";
	}
	pseudo_Joueur[2] = prompt("Insérer votre pseudo pour le joueur 2", "Joueur 2");
	if (pseudo_Joueur[2] == null || pseudo_Joueur[2] === "") {
		pseudo_Joueur[2] = "Joueur 2";
	}
	let txt = "Joueur 1 : " + pseudo_Joueur[1] + " VS " + "Joueur 2 : " + pseudo_Joueur[2];
	document.getElementById("insertionPseudoJoueur").innerHTML = txt;

	// Permet d'afficher le tour de joueur
	document.getElementById("tourJ").innerHTML = pseudo_Joueur[currentPlayerTurn];
}