
//1º CRIAR UMA VARIÁVEL PARA CADA UMA DAS INFORMAÇÕES
let seuVotoPara = document.querySelector('.divisao1-1 span');
let cargo = document.querySelector('.divisao1-2 span');
let descricao = document.querySelector('.divisao1-4');
let aviso = document.querySelector('.divisao2');
let lateralTela= document.querySelector('.divisao1-rightImg');
let numeros = document.querySelector('.divisao1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];//GUARDAR OS VOTOS

function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numerosHtml = '';
    numero = '';
    votoBranco = false;

    for(let i = 0; i < etapa.numeros; i++){
        if(i === 0){
            numerosHtml += '<div class="numero pisca"></div>'
        } else {
            numerosHtml += '<div class="numero "></div>'
        }
       
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateralTela.innerHTML = '';
    numeros.innerHTML = numerosHtml;
}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato= etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else {
            return false;
        }
    });

    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display= 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos){ 
            if(candidato.fotos[i].small){
                fotosHtml +=`<div class="divisao1-image small"> <img src="${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda} </div>`
            } else{
                fotosHtml +=`<div class="divisao1-image"> <img src="${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda} </div>`
            }
       
       // fotosHtml += `<div class="divisao1-image"> <img src="${candidato.fotos[i].url} alt=""/>${candidato.fotos[i].legenda} </div>`
        }

        lateralTela.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display= 'block';
        descricao.innerHTML = `<div class="avisoGrande pisca">VOTO NULO</div>`;
    }
    
}

function clicou (n){
    let numeroCandidato = document.querySelector('.numero.pisca');
    if(numeroCandidato !== null){
        numeroCandidato.innerHTML = n;
        numero = `${numero}${n}`;

        numeroCandidato.classList.remove('pisca')
        if(numeroCandidato.nextElementSibling !== null){
            numeroCandidato.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
        
    }
}
        let etapa = etapas[etapaAtual];
        
        let votoConfirmado = false;

function branco(){
        numero = '';//numero zerado
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display= 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="avisoGrande pisca">VOTO EM BRANCO</div>`
        lateralTela.innerHTML = '';
   
    }

function corrige(){
   comecarEtapa();
}
function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;
    
    if(votoBranco === true){
    votoConfirmado = true;
    votos.push({
        etapa: etapas[etapaAtual].titulo, 
        voto: 'branco'
    })
    } else if (numero.length === etapa.numeros){
         votos.push({
        etapa: etapas[etapaAtual].titulo, 
        voto: 'numero'
    })
        votoConfirmado = true;
    }
    
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = `<div class="avisoGigante pisca">FIM</div>`
            console.log(votos);
        }
    }
}
comecarEtapa();