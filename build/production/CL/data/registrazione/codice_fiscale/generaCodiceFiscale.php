<?php

$cognome=strtolower($_POST["cognome"]);
$nome=strtolower($_POST["nome"]);
$anno= "".$_POST["anno"];
$mese= "".$_POST["mese"];
if(count($mese) == 1)
    $mese = "0".$mese;
$giorno= "".$_POST["giorno"];
if(count($giorno) == 1)
    $giorno = $giorno;
$sesso=$_POST["sesso"];
$codcomune= $_POST["codice_comune"];

/*
$cognome="cerini";
$nome="luca";
//$data_nascita=$_POST["data_nascita"];

$anno= "1992";
$mese= "05";
$giorno= "12";
$sesso="m";
$codcomune= "H501"; //codice comune di roma
*/

/*
$cognome="lena";
$nome="fulvio";
$anno= "1976";
$mese= "02";
$giorno= "02";
$sesso="m";
$codcomune= "F839"; //codice comune di napoli
*/
/*
$cognome="cerini";
$nome="dario";
$anno= "1998";
$mese= "04";
$giorno= "12";
$sesso="m";
$codcomune= "H501"; //codice comune di napoli
*/

$vocali=array("a","e","i","o","u");
$consonanti=array("b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z");
$mesi=array("01"=>"A","02"=>"B","03"=>"C","04"=>"D","05"=>"E","06"=>"F","07"=>"G","08"=>"H","09"=>"I","10"=>"J","11"=>"K","12"=>"L");
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
for($i=0;$i<strlen($cognome);$i++){
 if(in_array($cognome[$i],$vocali) && $e<3){
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
}else{
        $codice.=$giorno+40;
}

//CRNLCU92E12H501G

// Codice del comune di nascita
$codice.=$codcomune;

$pre2 = 0;
for($i=0;$i<strlen($codice);$i++){
    if($i%2==1)
        $pre2 += $pari[strtolower($codice[$i])];
    else
        $pre2 += $dispari[strtolower($codice[$i])];
}


// Al resto della divisione del codice corrisponde una lettera
$codice.=$lettere[($pre2%26)];

// Ritorno il codice fiscale
echo json_encode(array(
    "codice_fiscale" => strtoupper($codice)
));
