const students = [
    { id: 1, name: "Alice", marks: [15, 17, 13], age: 20, city: "Paris" },
    { id: 2, name: "Bob", marks: [12, 14, 16], age: 22, city: "Lyon" },
    { id: 3, name: "Charlie", marks: [18, 16, 19], age: 19, city: "Paris" },
    { id: 4, name: "David", marks: [10, 13, 15], age: 21, city: "Lyon" },
    { id: 4, name: "Lucie", marks: [14, 11, 5], age: 31, city: "Paris" },
];

// Trouver les étudiants de Paris et calculer leur moyenne (map)
const parisStudentsWithAverage = students
    .map(student => 
        student.city === "Paris"
            ? {
                name: student.name,
                averageMarks: student.marks.reduce((sum, mark) => sum + mark, 0) / student.marks.length
              }
            : undefined // Retourne `undefined` pour les non-Parisiens
    )
    .filter(value => value !== undefined && value !== null)

console.log(parisStudentsWithAverage);

// Ajouter une notes aux étudiants ayant plus de 15 de moyenne (spread + conditions)
const PlusDe15 = students.map(student => {
    const averageMarks = student.marks.reduce((sum, mark) => sum + mark, 0) / student.marks.length;

    return averageMarks > 15
        ? { ...student, marks: [...student.marks, 20] } // Ajoute une note si moyenne > 15
        : student; // Sinon, retourne l'étudiant inchangé
});

console.log(PlusDe15);
// Catégoriser les étudiants en fonction de leur moyenne, si moyenne >= à 16 alors : 
// catégorie : Excellent, commentaire : Félicitations
// si moyenne >= 13 alors categorie : Bien, commentaire : Travail correct, si moyenne >= 10 
// alors categorie; Assez bien, commentaire : Peut mieux faire et si moyenne < 10 alors categorie : insuffisant,
// commentaire : "Vous devez travailler d'avantage"
function getCategoryAndComment(Marks) {
    if (Marks >= 16) {
        return { category: "Excellent", comment: "Félicitations" };
    } else if (Marks >= 13) {
        return { category: "Bien", comment: "Travail correct" };
    } else if (Marks >= 10) {
        return { category: "Assez bien", comment: "Peut mieux faire" };
    } else {
        return { category: "Insuffisant", comment: "Vous devez travailler davantage" };
    }
}

const categorieStudents = students.map(student => {
    const Marks = student.marks.reduce((sum, mark) => sum + mark, 0) / student.marks.length;
    const { category, comment } = getCategoryAndComment(Marks);

    return {
        ...student,
        category,
        comment
    };
});

console.log(categorieStudents);

const foods = [
    { name: "tomatoes", family: "fruits" },
    { name: "potatoes", family: "vegetables" },
    { name: "carrots", family: "vegetables" },
    { name: "apple", family: "fruits" },
    { name: "strawberries", family: "fruits" },
    { name: "bananas", family: "fruits" }
];

// Avec un .map() + une condition, retourner uniquement les fruits.
// sous forme de phrase (template literal)
const fruitPhrases = foods
    .map(food => 
        food.family === "fruits" 
            ? `${food.name} est un fruit.` // Template pour créer une phrase
            : null // Retourne `null` pour les autres
    )
    .filter(Boolean); // Supprime les valeurs null

console.log(fruitPhrases);