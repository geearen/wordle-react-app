interface IWordle {
  wins: number
  winStatus: boolean
  gueesExceeded: boolean
}

type TguessExceeded = {
  type: string
  payload: IWordle.gueesExceeded
}

type Twins = {
  type: string
  payload: IWordle.win
}

type TwinStatus = {
  type: string
  payload: IWordle.winStatus
}