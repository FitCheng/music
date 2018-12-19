import { playMode } from './config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  miniScreen: true,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}

export default state
