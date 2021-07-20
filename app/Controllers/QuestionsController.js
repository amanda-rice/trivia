import { ProxyState } from "../AppState.js";
import NotificationService from "../Services/NotificationService.js";
import { questionsService } from "../Services/QuestionsService.js";
import { loadState, saveState } from "../Utils/LocalStorage.js"

function _draw() {
  let question = ProxyState.questions
  let template = ``
  question.forEach(q => template += q.Template)
  document.getElementById('question').innerHTML = template
  document.getElementById('score').innerText = ProxyState.correct
  document.getElementById('level').innerText = ProxyState.level.toUpperCase()
}


export default class QuestionsController {
  constructor() {
    // REGISTER ALL LISTENERS
    ProxyState.on('questions', _draw)
    ProxyState.on('correct', saveState)
    ProxyState.on('level', saveState)

    loadState()
    this.getQuestion()
    _draw()
    // GET DATA FOR CONTROLLER
    // this.getAll()
    this.getQuestion()
  }
  async getQuestion() {
    try {
      await questionsService.getQuestions()
    } catch (error) {
      window.alert("Couldn't get question" + error)
    }
  }
  async checkAnswer(choice) {
    console.log("checking")
    if (questionsService.checkAnswer(choice)) {
      await NotificationService.correctAnswer("That is correct!")
      this.getQuestion()
    }
    else {
      await NotificationService.incorrectAnswer("Nope. Not that one.")
    }
  }
}