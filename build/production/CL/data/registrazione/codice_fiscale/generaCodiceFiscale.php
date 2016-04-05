<?php

$cognome="cerini";
$nome="luca";
//$data_nascita=$_POST["data_nascita"];

$anno= "1992";
$mese= "5";
$giorno= "12";
$sesso="m";
$codcomune= "H501"; //codice comune di roma

$vocali=array("a","e","i","o","u");
$consonanti=array("b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z");
$mesi=array(1=>"A",2=>"B",3=>"C",4=>"D",5=>"E",6=>"F",7=>"G",8=>"H",9=>"I",10=>"J",11=>"K",12=>"L");
$lettere=array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");

$dispari=array(
    "a"=>1,"0"=>1,
    "b"=>0,"1"=>0,
    "c"=>5,"2"=>5,
    "d"=>7,"3"=>7,
    "e"=>9,"4"=>9,
    "f"=>13,"5"=>13,
    "g"=>15,"6"=>15,
    "h"=>17,"7"=>17,
    "i"=>19,"8"=>19,
    "j"=>21,"9"=>21,
    "k"=>2,
    "l"=>4,
    "m"=>18,
    "n"=>20,
    "o"=>11,
    "p"=>3,
    "q"=>6,
    "r"=>8,
    "s"=>12,
    "t"=>14,
    "u"=>16,
    "v"=>10,
    "w"=>22,
    "x"=>25,
    "y"=>24,
    "z"=>23);

$pari=array("0"=>0,"a"=>0,"b"=>1,"1"=>1,"c"=>2,"2"=>2,"d"=>3,"3"=>3,"e"=>4,"4"=>4,"f"=>5,"5"=>5,"g"=>6,"6"=>6,"h"=>7,"7"=>7,"i"=>8,"8"=>8,"j"=>9,"9"=>9,"k"=>10,"l"=>11,"m"=>12,"n"=>13,"o"=>14,"p"=>15,"q"=>16,"r"=>17,"s"=>18,"t"=>19,"u"=>20,"v"=>21,"w"=>22,"x"=>23,"y"=>24,"z"=>25);

$e=0;
$f=0;
$codice="";
$pre="";
$pre2="";

// Prime 3 consonanti del cognome
for($i=0;$i<strlen($cognome);$i++){
 if(in_array($cognome[$i],$consonanti) && $e<3){
  $codice.=$cognome[$i];
  $e++;
 }
}

// Prime 3 consonanti del nome
for($i=0;$i<strlen($nome);$i++){
 if(in_array($nome[$i],$consonanti) && $f<3){
  $codice.=$nome[$i];
  $f++;
 }
}
for($i=0;$i<strlen($nome);$i++){
 if(in_array($nome[$i],$vocali) && $f<3){
  $codice.=$nome[$i];
  $f++;
 }
}


// Ultime 2 cifre dell'anno di nascita
$codice.=$anno[2].$anno[3];

// Mese di nascita
$codice.=$mesi[$mese];

// Giorno di nascita. Per le femmine 40 giorni in più.
if($sesso=="m"){
        $codice.=$giorno;
}else if($sesso=="f"){
        $codice.=$giorno+40;
}

//CRNLCU 92E12H501G

// Codice del comune di nascita
$codice.=$codcomune;


/*
// Codice di controllo. Per i pari $pari e per i dispari $dispari
for($i=0;$i<strlen($codice);$i++){
 if($i%2==1){
         $pre.=$dispari[strtolower($codice[$i])];
 }else{
         $pre.=$pari[strtolower($codice[$i])];
 }
}

// Somma i valori del codice di controllo
for($i=0;$i<strlen($pre);$i++){
  $pre2+=$pre[$i];
}
*/
$pre2 = 0;
for($i=0;$i<strlen($codice);$i++){
    if($i%2==1)
        $pre2 += $pari[strtolower($codice[$i])];
    else
        $pre2 += $dispari[strtolower($codice[$i])];
}


// Al resto della divisione del codice corrisponde una lettera
$codice.=$lettere[($pre2%26)];

// Visualizza il codice fiscale
echo strtoupper($codice);
