#!/usr/bin/env node
// Importe les packages
const validator = require("email-validator");
const axios = require("axios");
const ora = require('ora'); //spinner
const chalk = require('chalk');//couleurs
var figlet = require('figlet');//Dessin ascii

// Importe les arguments fournis
const [,, ...email] = process.argv

// Spinner de chargement
const spinner = ora({
        text: '',
        spinner: {
            "interval": 100,
            "frames": [
                "☀️ ",
                "☀️ ",
                "☀️ ",
                "🌤 ",
                "⛅️ ",
                "🌥 ",
                "☁️ ",
                "🌧 ",
                "🌨 ",
                "🌧 ",
                "🌨 ",
                "🌧 ",
                "🌨 ",
                "⛈ ",
                "🌨 ",
                "🌧 ",
                "🌨 ",
                "☁️ ",
                "🌥 ",
                "⛅️ ",
                "🌤 ",
                "☀️ ",
                "☀️ "
        ]
    }
});

figlet('Pwned!?', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.magenta(data))
});

spinner.start();

// Affiche l'argument fourni
console.log(chalk.black.bgBlue(`E-mail a valider: ${email}`))

//Vérifie qu'il s'agit d'un e-mail valide
if (validator.validate(`${email}`) == true){
    // Si oui, fais une requête axios vers powned / Promesse, récupérer la réponse et l'afficher
    axios.get(`https://haveibeenpwned.com/api/breachedaccount/${email}`, {headers:{"User-Agent" : "request"}})
        .then(function (response) {
        spinner.stop()
        console.log(chalk.blue(`Liste des brèches pour l'adresse email "${email}" : ` + chalk.red(response.data)));
            spinner.warn(chalk.red([" Adresse e-mail analysée, des brèches ont été trouvées"]))
    })
        .catch(function (error) {
        spinner.stop()
            if (error.response.status == 404){
                console.log(chalk.green("Félicitations, cet e-mail ne présente aucune brèche."));
                    spinner.succeed(chalk.green(["Adresse e-mail analysée avec succès"]))
            }
            
    });
 
    
} else {
    console.log(`Votre adresse mail n\'est pas valide`)
};
