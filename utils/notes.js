const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
  return "Get Notes"
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('./notes.json')
    return JSON.parse(dataBuffer.toString())
  } catch (e) {
    return []
  }
}

const readNote = (title) => {
  const notes = loadNotes();
  const selected = notes.find(note => note.title === title)
  if (selected) {
    console.log(chalk.yellow.inverse(selected.title))
    console.log(selected.body)
  } else {
    console.log(chalk.red.inverse(`${title} not found!`))
  }
}

const saveNotes = (notes) => {
  const convertedNotes = JSON.stringify(notes)
  fs.writeFileSync('./notes.json', convertedNotes)
}

const addNote = (title, body) => {
  const notes = loadNotes()
  if (!notes.find(item => item.title === title)) {
    notes.push({
      title: title,
      body: body,
    })
    saveNotes(notes)
    console.log(chalk.green.inverse(`${title} is added!`))
  } else {
    console.log(chalk.red.inverse(`${title} is existed!`))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const toBeRemovedNote = notes.find(item => item.title === title)
  if (toBeRemovedNote) {
    const updatedNotes = notes.filter(item => item.title !== title)
    saveNotes(updatedNotes)
    console.log(chalk.green.inverse(`${title} is removed!`))
  } else {
    console.log(chalk.red.inverse(`${title} is not found!`))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.yellow('Your notes'))
  notes.forEach(note => console.log(note.title))
} 

module.exports = {
  addNote,
  removeNote,
  getNotes,
  listNotes,
  readNote
}