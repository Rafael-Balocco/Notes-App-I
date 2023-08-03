const fs = require('fs')
const chalk = require ('chalk')
const { title } = require('process')

const addNote = ((title, body) =>{

    const notes = loadNotes()

    const duplicateNotes = notes.filter((note) => note.title === title) //compara os objetos para ver se tem algum repetido  // compara o titulo que sera inserido com cada titulo que ja está inserido na lista
    const duplicateNote= notes.find ((note)=> note.title === title)

    if (!duplicateNote){ //se o array criado que teria essas repetições estiver vazio, não há repetição, podemos fazer push 
        notes.push({
            title:title, //load the data passed by argument to a new arg
            body:body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen.black("Note saved at the list"))
    }else{
        console.log(chalk.bgRed.black("Note title already exists"))
    }
 
})

const saveNotes = (notes) => {

    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}

const loadNotes = () =>{ //retorna array das notas
    try{

        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)   

    }catch(e){

        return []

    }
}

const listNotes = () =>{
    const notes = loadNotes()

    console.log(chalk.black.bgGreen("Printing Notes"))

    notes.forEach (note => console.log(note.title))
}

const removeNote = (title) =>{

    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(JSON.stringify(notes)==JSON.stringify(notesToKeep)) console.log(chalk.black.bgRed("Note doesn't exist!"))
    
    else console.log(chalk.black.bgGreen("Note Removed!"))
    
    saveNotes(notesToKeep)
}

const readNote = (title) => {
    const notes = loadNotes()

    const finder = notes.find ((note)=> note.title === title)
    if(finder){
        console.log(chalk.black.bgGreen(finder.title))
        console.log(chalk.black(finder.body))
    }
    else console.log(chalk.black.bgRed("Note doesn't exist!")) 
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}