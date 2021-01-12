const yargs = require('yargs')
const noteUtils = require('./utils/notes')

// Setting up commands with yargs
// Setting up option for commands
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {

    },
    body: {
      describe: 'Note body',
      type: 'string',
      demandOption: true
    }
  },
  handler: (argv) => {
    noteUtils.addNote(argv.title, argv.body)
  },
})

yargs.command({
  command: 'remove',
  describe: 'Remove an existing note',
  builder: {
    title: {
      describe: 'Note title',
      type: 'string',
      demandOption: true
    }
  },
  handler: (argv) => {
    noteUtils.removeNote(argv.title)
  }
})

yargs.command({
  command: 'list',
  describe: 'List all the notes',
  handler: () => noteUtils.listNotes()
})

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      type: 'string',
      demandOption: true
    }
  },
  handler: (argv) => noteUtils.readNote(argv.title)
})

yargs.parse()