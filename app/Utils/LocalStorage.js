
import { ProxyState } from "../AppState.js";

export function saveState() {
  localStorage.setItem('UserScore', JSON.stringify({
    correct: ProxyState.correct,
    level: ProxyState.level
  }))
}

export function loadState() {
  let data = JSON.parse(localStorage.getItem('UserScore'))
  if (data != null) {
    ProxyState.correct = (JSON.stringify(data.correct)) * 1
    console.log(data.level)
    ProxyState.level = data.level
  }

}