import { ProxyState } from "../AppState.js"
import Question from "../Models/Question.js"
import { api } from "./AxiosService.js"

function _changeLevel() {
  if (ProxyState.correct >= 50) {
    ProxyState.level = "hard"
  }
  else if (ProxyState.correct >= 25) {
    ProxyState.level = "medium"
  }
}
class QuestionsService {
  async getQuestions() {
    let url = 'api.php?amount=1&difficulty=' + ProxyState.level
    console.log(url)
    const res = await api.get(url)
    let question = res.data.results.map(q => new Question(q))
    ProxyState.questions = question
  }
  checkAnswer(choice) {
    let question = ProxyState.questions[0]
    console.log(question)
    let isCorrect = question.correctAnswer == choice
    if (isCorrect) {
      ProxyState.correct = ProxyState.correct + 1
      _changeLevel()
    }
    return (isCorrect)
  }

}
export const questionsService = new QuestionsService()
