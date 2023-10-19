document.getElementById('cadastroForm').addEventListener('submit', cadastrarJogo);
function cadastrarJogo(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const plataform = document.getElementById('plataform').value;
    fetch('http://localhost:8080/game', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({name, plataform}),
    })

    .then(response => response.json())
    .then(data => {
        alert('jogo cadastrado com sucesso!');
        document.getElementById('cadastroForm').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar Jogo:', error);
    });

}

function pesquisarJogo(){
    const seachId = document.getElementById('seachId').value;
    fetch(`http://localhost:8080/game/${searchId}`)
        .then(response => {
            if(response.status === 404){
                return Promise.reject('Jogo não encontrado')
            }
            return response.json();
        })

        .then(data => {
            const resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = `
            <h3>ID: ${data.id}</h3>
            <p>Nome: ${data.name}</p>
            <p>Plataforma: ${data.plataform}</p>
    `})
    .catch(error => {
        console.error('Erro ao pesquisar jogo:', error);
        const resultadoPesquisa = document.getElementById('resultadoPesquisa');
        resultadoPesquisa.innerHTML = 'Jogo não encontrado';
    })
}