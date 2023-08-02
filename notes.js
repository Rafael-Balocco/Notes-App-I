const fs = require('fs')
const chalk = require ('chalk')


const getNotes = function (){
    return 'Your notes...'
}

const addNote = function(title, body){

    const notes = loadNotes()

    const duplicateNotes = notes.filter(function (note){ //compara os objetos para ver se tem algum repetido
        return note.title == title  // compara o titulo que sera inserido com cada titulo que ja está inserido na lista
    })

    if (duplicateNotes.length === 0){ //se o array criado que teria essas repetições estiver vazio, não há repetição, podemos fazer push 

        notes.push({
            title:title, //load the data passed by argument to a new arg
            body:body
        })

        saveNotes(notes)
        console.log(chalk.bgGreen.black("Note saved at the list"))
    }

    else{
        console.log(chalk.bgRed.black("Note title already exists"))
    }
 
}

const saveNotes = function (notes){

    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}

const loadNotes = function (){ //retorna array das notas
    try{

        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)   

    }catch(e){

        return []

    }
}

const removeNote = function(title){

    const notes = loadNotes()
    const notesToKeep = notes.filter(function(note){
        if (note.title === title){
            console.log(chalk.black.bgGreen("Note removed!"))  
            return false       
        }
        else{
            return true
        }
    })
    if(JSON.stringify(notes)==JSON.stringify(notesToKeep)) console.log(chalk.black.bgRed("Note doesn't exist!"))

    saveNotes(notesToKeep)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}