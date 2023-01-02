
//Variaveis (VAR= Escopo global ou de função, podem ser atualizadas e declaradas novamente dentro de seu escopo. 
//LET= Escopo de bloco, podem ser atualizadas, mas não podem ser declaradas novamente 
//CONST = Escopo de bloco, não podem ser atualizadas nem declaradas novamente).

//Variaveis const
const modal = document.querySelector('.modal-container'); //Document.querySelector() Retorna o primeiro elemento dentro do documento 
//(usando ordenação em profundidade, pré-ordenada e transversal dos nós do documento) que corresponde ao grupo especificado de seletores.
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome'); 
const btnSalvar = document.querySelector('#btnSalvar');
//Variáveis let
let itens
let id

//Função openModal vai abrir uma janela modal que é é um tipo de caixa de diálogo que aparece quando você clica ou toca em algo em sua tela atual. 
//No caso deste projeto abre uma janela para inserir uma nova tarefa.
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    id = index
  } else {
    sNome.value = ''
  }
  
}

//funçao para editar um item (tarefa) que ja foi criada
function editItem(index) {

  openModal(true, index)
}
//funcao para excluir um item(tarefa)
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr') //document.createElement cria o elemento HTML especificado no caso um item pra lista de tarefas


  //Parte de código HTML
  tr.innerHTML = `
    <td>${item.nome}</td> 
    
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => { //Sinal de = significa que é uma atribuição
  
  if (sNome.value == '') {
    return
  }

  e.preventDefault(); //preventDefault() impede que o evento padrão ocorra

  if (id !== undefined) {
    itens[id].nome = sNome.value
    
  } else {
    itens.push({'nome': sNome.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
