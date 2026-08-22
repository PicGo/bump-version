import Ora from 'ora'

// Pinned to ora 6.x in package.json on purpose. From ora 7 onwards the spinner
// kills the process when it is started after an inquirer prompt has restored
// the TTY: the confirm is answered, the spinner draws one frame, and the
// process exits before the release finishes — leaving a bumped package.json
// with no commit and no tag. Verified against ora 3/4/5/6 (fine) and 7/8/9
// (broken), with inquirer 13 and 14 alike.
export default new Ora({
  text: ''
})
