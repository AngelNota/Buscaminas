/*
    Crear un arreglo unidimensional de 10 posiciones que obtenga en cada posicion un número aleatorio entre 1 y 100

    Generar una representación visual de este arreglo utilizando divs, al hacer click en cada div mostrar en pantalla el número que tine esta posición en el arreglo

    Convertir este arreglo unidimensional a bidimensional e implementar la misma funcionalidad

    paso 1: Verificar que la página haya cargado (OnLoad)
    paso 2: Crear el arreglo y asignar valores aleatorios en cada posición
    paso 3: Creal la representación gráfica mediante divs
    paso 4: Agregar la funcionalidad (OnClick) 
*/

var tam = 10;
var minas = 10;
var tablero;
var nombre;
var tiempo;
var segundos = 0;

function inicio(){

    nombre = prompt("Escribe tu nombre:");

    tablero = new Array(tam);
    //Inicializar el arreglo bidimensional
    for(var i = 0; i <tam; i++)
        tablero[i] = new Array(tam);

    for(var i = 0; i < tam; i++)
        for(var j = 0; j < tam; j++)
            tablero[i][j] = 0;
    
    agregaMinasAleatorias();
    imprimeTablero();
    document.getElementsByClassName("nombre")[0].innerHTML = nombre;
    tiempo = window.setInterval(
        function(){
            segundos++;
            document.getElementsByClassName("tiempo")[0].innerHTML = segundos;
        },1000
    )
}

function verificaValor(posicionI, posicionJ){
    if(tablero[posicionI][posicionJ] == -1){
        document.getElementById(posicionI+posicionJ).innerHTML = "<img src='img/mina.png' width='45px' height='45px'>";
        alert("Perdiste"); // Fin del juego
        location.reload();
    } //mina
    else{
        document.getElementById(posicionI+posicionJ).innerHTML = tablero[posicionI][posicionJ];
        tablero[posicionI][posicionJ] = 1000;
        if(yaGano()){
            alert("Ganaste");
        }
    }
}

function imprimeTablero(){
    for(var i = 0; i<tam;i++)
        console.log(tablero[i]);
}

function agregaMinasAleatorias(){
    var j = 0, i = 0;

    for(var cont = 0; cont < minas; cont++){
        i = Math.floor(Math.random()*tam);
        j = Math.floor(Math.random()*tam);
        if(tablero[i][j] == -1)
            cont--;
        else{
            tablero[i][j] = - 1;
            aumentaAlrededor(i, j);
        }
    }
}

function aumentaAlrededor(i, j){
    //Arriba
    if((j-1) >= 0)
        if(tablero[i][j-1] != -1)
            tablero[i][j-1] = tablero[i][j-1] + 1;
    //Abajo
    if((j+1) < tam)
        if(tablero[i][j+1] != -1)
            tablero[i][j+1] = tablero[i][j+1] + 1;
    //izquierda
    if((i-1) >= 0)
        if(tablero[i-1][j] != -1)
            tablero[i-1][j] = tablero[i-1][j] + 1;

    //Derecha
    if((i+1) < tam)
        if(tablero[i+1][j] != -1)
            tablero[i+1][j] = tablero[i+1][j] + 1;

    //Arriba - izquierda
    if((i-1) >= 0 && (j-1) >= 0)
        if(tablero[i-1][j-1] != -1)
            tablero[i-1][j-1] = tablero[i-1][j-1] + 1;

    //Arriba - derecha
    if((i+1) < tam && (j-1) >= 0)
        if(tablero[i+1][j-1] != -1)
            tablero[i+1][j-1] = tablero[i+1][j-1] + 1;

    //Abajo - izquierda
    if((i-1) >= 0 && (j+1) < tam)
        if(tablero[i-1][j+1] != -1)
            tablero[i-1][j+1] = tablero[i-1][j+1] + 1;

    //Abajo - derecha
    if((i+1) < tam && (j+1) < tam)
        if(tablero[i+1][j+1] != -1)
            tablero[i+1][j+1] = tablero[i+1][j+1] + 1;
}

function yaGano(){
    for(var i = 0; i <tam; i++)
        for(var j = 0; j < tam; j++)
            if(tablero[i][j] != 1000 && tablero[i][j] != -1)
                return false;

    return true;
}