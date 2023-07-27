interface IWordle {
  wins: number
  winStatus: boolean
  gueesExceeded: boolean
}

type TguessExceeded = {
  type: string
  payload: IWordle
}

type Twins = {
  type: string
  payload: IWordle
}

type TwinStatus = {
  type: string
  payload: IWordle
}