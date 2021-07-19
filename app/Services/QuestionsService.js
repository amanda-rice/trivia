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
    // NOTE any string passed into the request, is concat'ed on to the end of baseURL with an optional '/'
    // ALL AXIOS REQUESTS RETURN A PROMISE  

    const res = await api.get(url)
    // whenever you work with axios it wraps the response in an object, with the property 'data' being the response info

    // itterate over the array of POJOs and turn them into Person
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
