const btn = document.querySelector('button');
btn.addEventListener('click', function(event){
    event.preventDefault()
    var valorPeso = (document.getElementById('peso').value)
    var valorAltura = (document.getElementById('altura').value)

    if (valorPeso == "" || valorAltura == ""){
        document.getElementById('resultado').innerHTML = '<font color="red">Por favor, o campo PESO e ALTURA não podem ser vazios!</font>'
    }

    else{

    console.log(calculoFuncao(valorPeso, valorAltura));

    var resultadoIMC = calculoFuncao(valorPeso, valorAltura);

    document.getElementById('resultadoImc').value = resultadoIMC.toFixed(2);

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "listagem.js")

    xhr.addEventListener("load", function() {
        var resposta = xhr.responseText
        console.log(resposta)        
        var categorias = JSON.parse(resposta)
        categorias.forEach(function(categoria){
           if (resultadoIMC >= categoria.imc_minimo && resultadoIMC <= categoria.imc_maximo){
            document.getElementById('resultado').innerHTML = 'Seu IMC se encontra na categoria '+categoria.categoria
           }
        })})

    xhr.send()
}})

function calculoFuncao(valorPeso, valorAltura) {

    return valorPeso / ((valorAltura / 100) ** 2)

}