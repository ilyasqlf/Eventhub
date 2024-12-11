const users = [
    {
 name: "julie",
 age: 34
    }
    , {
        name: "Bernard",
        age: 67
    },
];
console.log("Users", users[1].name)
const monPremierArray = [30, 9, 878, 3, 56];
console.log ("log de mon premier array =>", monPremierArray);
console.log("Longueur de mon Array =>", monPremierArray.length)

const notes = [3, 16, 20, 1, 0, 3, 10, 17, 19]
console.log("Notes avant push :", notes)
notes.push(15)
console.log("Notes", notes)
notes.unshift(1)
console.log("Notes après unshift :",notes)
console.log("Première valeur du tableau",notes[5])
console.log("Dernière case de l'array :",notes[notes.length-1]);

const monSecondArray = [30, "Jean", 33, 1099, 299, 200, 277399, 2777399990, 2899]
function lastValue0fArray(array) {
    return array[array.length - 1];
}
    console.log("test function :", lastValue0fArray(monSecondArray))
    monSecondArray.push("foo");
    console.log("Secont test :", lastValue0fArray(monSecondArray));


/*Pour récuperer le N de "Bonjour" en sachant que "B"=0 et "O"= 1*/

let str ="Bonjour";
console.log("String", str[2])

/*pour retrouver un eleve, ici c'est moi que je dois retrouver (utilisez la methode du tableau pour vous orienter) */
const assofaciens = [{
    prenom: "Yacine",
    promo: "DWWM5"

},
{
    prenom: "Asma",
    promo: "DWWM5"
}
]
console.log("Mon second assofacien est :" + assofaciens[1].prenom)

/*Pour retrouver une note, ici 10, et c'etait maximum 5 conditions*/
function note(a)
{
    if(a>=90){
        return "excellent";
    }
    else if(a>=80)
        return "tres bien";
    else if(a>=70)
        return "bien";
    else if(a>=60)
        return "ok";
    else
    {
    return "pas bien";
    }
}
console.log(note(10))
/* si le montant > 100 c'est 10% de remise si >200 15% et si le client est fidèle 5% en plus calculer le taux de remise*/
function CalculRemise(Montant, ClientFidele) {
    let tauxRemise = 0; /* c'est le taux de remise de base qui est a 0% et cette formule sers a appliquer le taux de remise */
    if(Montant > 100) {
        tauxRemise = 0.10;
    }
    
    else if(Montant > 200){  /* if else = sinon si*/
        tauxRemise = 0.15;
    }
    if(ClientFidele) {
        tauxRemise += 0.05;
    
    }
    /* pour avoir le montant final */
    const remise = Montant * tauxRemise;
    const MontantFinal = Montant - remise;
return {
    montantInitial: Montant,
    tauxRemise: tauxRemise * 100 +'%',
    MontantRemise: remise,
    MontantFinal: MontantFinal.toFixed(2)
 };
}
console.log("test", CalculRemise(250, true));

/* Tableau imbriqué, il faut trouver Mardi*/
const array0fArrays = [
    [1, 3, 4, 6, 98],
    [true, false, false, true],
    ["Hi !", "bonjour", "Mardi"],
    [{
        name:"Frigo", price: 600
    },
{
    name: "car",
    price: 10000
}
]
] 

console.log("tableau imbriqué=>", array0fArrays[3][1].name) /* le 3 représente le 4eme tableau avec 0,1,2,3 puis on cherche le car donc ce sera 1 parceque 0,1, puis on rajoute name pour le nom du car*/
let word = "Salut Sami !"
let word1 = "Hello!"
console.log(word1[3], word[3]) /* le 3 c'est la 4eme lettre donc la lettre u de salut et aussi la lettre l de hello*/
/* incrémentation et décrémentation */
let x = 0;
console.log(x)
console.log("___________");
x = x + 1;
console.log("_____________")
x += 1
console.log(x)
console.log("___________")
x += 10; /*=> x = x + 10*/
console.log(x)
x++;
console.log(x);
x--;
console.log(x);

//WHILE
let count = 0

while(count<= 20){
    console.log(count)
    count++;
    /*! While tourne en boucle, il faut toujours lui donner une condition de sorti, si on ne le lui donne pas on vas cracher la machine entière*/
}
let superMario = {
    score: 0,
    life: 100,

};
let nombreEnnemis = 0;
console.log("avant la boucle :", superMario);

while(superMario.life>0){
    nombreEnnemis++
    superMario.life--;
}
console.log("Ennemis : ", nombreEnnemis);
console.log("après la boucle", superMario);

/*  Exercice 1 bosser avec les if else, créer une fonction qui verifie si un mot de passe est valide :
- au moins 8 caractères
-au moins une majuscule
-au moins un chiffre
-au moins un caractère spécial
il va falloir aller regarder du coté des rejex (expressions régulières), faire une fonction qui verifie que mon mot de passe fait au moins 8 caractères */


function chechPassword (characters) {
const min_lenght = 8;
const console_length = "Erreur : le mot de passe doit faire au moins 8 charactères";
const valide_password = "mot de passe valide !";

const erreur_prefix = "il manque :";


const erreur = { 
    upper: "Majuscule"
    ,lower: "minuscule",
    Number : "un chiffre",
    special : "un caractère spécial"
};
const missing_element = [];
if (caractère, length < min_length){
    return error_length;
} else {
    const status = {
        hasUpper : false,
        hasLower : false,
        hasNumber: false,
        hasSpecial: false
    };

for (const char of character) {
    if (char >= 'A' && char <= 'Z') {
        status.hasUpper = true
        
    } else if (char >= 'a' && char <= 'z'){
        status.hasLower = true;
    }
        else if (char >= '0' && char <= '9'){
            status.hasNumber = true;
        } else{
            status.hasSpecial = true;
        }
    
    if (! status.hasUpper) {
        missingElement.push (ERRORS.UPPER);
    }
    if (!status.hasLower) {
        missingElement.push (ERRORS.LOWER);
        
    }
    if (!status.hasNumber) {
        missingElement.push (ERRORS.NUMBER);

    }
    if (!status.hasSpecial) {
        missingElement.push (ERROR.SPECIAL)
        
    }

    if (missingElement.length > 0) {
        return ERROR_PREFIX + missingElement.join(",")
        
    } else {
        return valide_password;

    }
}
  }  const testPasswords = [
        "abc",
        "abcdefgh",
        "ABCDEFGH",
        "abcd1234",
        "ABCD1234",
        "Abcdefgh",
        "abcd123!",
        "Abcd123!",
    ]
}



let bonbons = ["citron","abricot","peche","fraise"];
bonbons.forEach( bonbon => {
    console.log(`"${bonbon}"`);
})


/* Je veux faire la table  de multiplication de 2 */
for (let i = 0; i <= 10; i++){/* i++ c'est pour rajouter 1*/
    console.log(`2 x ${i} ={2 * i}`)
    }
        let i = 10;
        while(i >= 0) {
        console.log(i)
        i--;
        }
/* je veux récupérer que les nombres pairs */
const nombres = [1, 4, 8, 12, 98, 10005, 99304, 938839, 99288663090];
let liste = []; /* les crochets vide c'est le tableau */
for (let i = 0; i < nombres.length; i++) {
    if (nombres [i] % 2 == 0){ /*impaires = 1 paires = 0 et le 2 sers a dissequer la valeur que je lui donne */
        liste.push(nombres[i]) /* pour pusk les chiffres paires */
    }
}
/* pour les pourcentage utilisez modulo */
const nombres2 = [1, 4, 8, 12, 98, 10005, 99304, 93839, 92288663090
]; /* for each sers a parcourir chaques element du tableau pour js */
let liste2 = [];
nombres2.forEach((nombre) => {
    if (nombre % 2 ===0) {
        liste2.push(nombre)
    }
})

/* calculer le prix totale du panier */
const card = [{ name: "Ps5", price: 700},
{ name: "Xbox", price: 400},
{name: "PC", price: 2000},
{name: "Nintendo Switch", price: 300},];

let total = 0 /* 0 parceque le panier est vide, on a pas encore ajouter les articles */
card,forEach((article) =>{
    total += article.price
    console.log(`Article : $(article.name) - Price : $(article.price)`);
})
console.log(`Total : ${total} €`)

let a = 100;
function bar() {
    let count = 10;
    console.log("---1---")
    console.log("count dans bar :", count);
    console.log("x dans bar :", x);
}
console.log(bar())
function baz() {
    let count = 0
    console.log("---2---");
    console.log("count dans baz", count);
    console.log("x dans baz :", x)
}
console.log(baz());
let varGlobale = "je suis globale";
function test() {
    let varLocale = "je suis locale";
    console.log(varLocale)
    console.log(varGlobale)
}
console.log(varGlobale)
console.log(test())
console.log(varLocale)

function gateau(recette) {
    console.log("présentation des ingrédients");
    console.log("début de la préparation");
    recette();

}
function recette(){
    console.log("on fait le gateau ici !")
}

console.log(gateau(recette));


/* on vas filtrer les prix superieur ou egale a 1000*/
function productFiltered(productsFilter, length; index++) {
    if (let index =0;) index <
}

        

















