import './style.css'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import {v4} from 'uuid'

// const app = document.querySelector<HTMLDivElement>('#app')!
// app.innerHTML = `<h1>Hello World!</h1>`
interface Task{
  title: string
  description: string
  id: string
}
let tasks: Task[] = []
const taskForm = document.querySelector<HTMLFormElement>('#taskForm')
const tasksList = document.querySelector<HTMLDivElement>('#tasksList')
taskForm?.addEventListener('submit', e => {
  e.preventDefault()
  const title = taskForm['title'] as unknown as HTMLInputElement 
  const description = taskForm['description'] as unknown as HTMLTextAreaElement
  tasks.push({
    title: title.value,
    description: description.value,
    id: v4(),
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
  Toastify({
    text: 'Task addes',
  }).showToast()
  renderTasks(tasks)
  taskForm.reset()
  title.focus()
  // console.log(tasks)
})
document.addEventListener('DOMContentLoaded', () => {
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  renderTasks(tasks)
  // console.log(tasks)
})
function renderTasks(tasks: Task[]){
  tasksList!.innerHTML = ''
  tasks.forEach(task => {
    const taskElement = document.createElement('div')
    taskElement.className = 'bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-600 hover:cursor-pointer'
    const header = document.createElement('header')
    header.className = 'flex justify-between'
    const title = document.createElement('span')
    title.innerText = task.title
    const btnDelete = document.createElement('button')
    btnDelete.className = 'bg-red-500 px-2 py-1 rounded-md'
    btnDelete.innerText = 'delete'
    btnDelete.addEventListener('click', (/*puede ir la variable del evento*/) => {
      /*console.log(task.id)*/
      const index = tasks.findIndex(t => t.id === task.id)
      tasks.splice(index, 1)
      localStorage.setItems('tasks', JSON.stringify(tasks))
      Toastify({
        text: 'Task deleted',
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast()
      renderTasks(tasks)
    })
    header.append(title)
    header.append(btnDelete)
    const description = document.createElement('span')
    description.innerText = task.description
    taskElement.append(header)
    taskElement.append(description)

    const id = document.createElement('p')
    id.innerText = task.id
    id.className = 'text-gray-400'
    taskElement.append(id)
    tasksList?.append(taskElement)
  })
}