var joueur = 1; //num joueur en cours
var colonne = 5;
var ligne = 5;
var game = true; //jeu en cours
var texte = "";
var plateau = new Array();
//deuxième dimension du plateau
for(var i=0; i<ligne; i++) plateau[i] = new Array();

//creation d'un nouveau jeu
newGame();

function newGame(){
    for(var i=0; i < this.ligne; i++){
        for(var j=0; j < this.colonne; j++){
            plateau[i][j]=0;
        }
    }
    this.joueur = 1;
    afficheTexteAnnonce("Le jeu commence ! C'est au tour du joueur " + nomDuJoueur(this.joueur));
    this.game = true; 
    creerTableau();
}

function afficheTexteAnnonce(texte){
    document.getElementById("TexteAnnonce").innerHTML = texte;
}

function nomDuJoueur(numJoueur){
    if (numJoueur == 1){return "rouge";}else{ return "bleu";}
}

function creerTableau(){
    this.texte = "<table>";
    for(var i = 0; i < this.ligne; i++){
        this.texte += "<tr>";
        for( var j = 0; j < this.colonne; j++){
            this.texte += "<td onclick='detectClic("+j+")' id="+i+"-"+j+">";
            if(this.plateau[i][j] == 1) this.texte += "<div class='joueur1'></div>";
            else if(this.plateau[i][j] == 2) this.texte += "<div class='joueur2'></div>";
            this.texte += "</td>";
        }
        this.texte += "</tr>";
    }
    this.texte += "</table>";
    document.getElementById("Puissance4").innerHTML = this.texte;
}

function detectClic(j){
    //si il reste une case de libre dans la colonne et si le jeu est en cours
    if(verifPosition(j)&& this.game){
        var ligneEnCours = poseJeton(j); //numéro ligne encours
        
        //la verification si vainqueur
        var verifEnd = Puissance4(ligneEnCours,j,0,0); // renvoie true ou false si gagné ou perdu
        
        if(verifEnd){
            this.game = false; 
            afficheTexteAnnonce("Le joueur"+ nomDuJoueur(this.joueur) + "a gagné la partie.");
        }
    //partie non terminée, passe au joueur suivant
    else{
        this.joueur == 1 ? this.joueur = 2: this.joueur =1;
        afficheTexteAnnonce("C'est au tour du joueur "+ nomDuJoueur(this.joueur));
        }
    }
}

function verifPosition(j){
    //si la case du haut de la colonne est vide
    if(this.plateau[0][j] == 0) return true; 
    else return false;
}

function poseJeton(j){
    //retourne le numéro de ligne disponible ou le jeton a été posé
    for(var i = this.ligne-1; i>=0; i--){
        if(this.plateau[i][j] == 0){
            //informe la cellule du numéro du joueur qui lui est affecté
            this.plateau[i][j] = this.joueur;
            //met à jour la div avec le jeton
            refreshTableau(i,j,this.joueur);
            return i;  
        }
    }
}

function refreshTableau(x,y,i){
    document.getElementById( x+"-"+y).linnerHTML = "<div class='joueur"+i+"'><div>";
}

//"lig" et "col" sont les positions du point num ligne et num colonne
// c et l le type d'alignement
function Puissance4(lig,col,l,c){
    //commencement de l'analyse
    console.log("Valeurs: "+lig+" "+col+" / Incrément "+i+ " "+c);
    if(c == 0 && l == 0){
        //pour moi c'est inversé a verticale, b horizontal, c diag gauche et d diag droit
        // horizontalité
        var va = 1 +Puissance4(lig +1,col,1,0) + Puissance4(lig-1,col,-1,0);
        // verticalité
        var vb = 1 +Puissance4(lig,col+1,0,1) + Puissance4(lig,col-1,0,-1);
        // diagonale de droite
        var vc = 1 +Puissance4(lig+1,col+1,1,1) + Puissance4(lig-1,col-1,-1,-1); 
        // diagonale de gauche
        var vd = 1 +Puissance4(lig-1,col+1,-1,1) + Puissance4(lig+1,col-1,1,-1);
        console.log(va,vb,vc,vd);
        if(va == 4 || vb == 4 || vc == 4 || vd == 4)return true;
        else return false; 
    }
    //On vérifie que "lig" et "col" ne sortent pas du tableau 
    if (lig<this.ligne &&  lig>=0 && col<this.colonne && col>=0){
        if(this.plateau[lig][col]==joueur){
            return 1+ Puissance4(lig + l, col + c, l, c);}
            else {return 0;}
        }
        else return 0;
    }