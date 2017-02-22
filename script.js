var moral_atacante = 50;//moral inicial exercito A em %
var moral_defensor = 50;//moral inicial exercito B em %
var rolagemA = null;
var rolagemB = null;
var diferenca_dados = 2;//diferenca entre rolagem gerando moral
var atacante = {
	total_exercito : 0
};
var defensor = {
	total_exercito : 0
};
console.log();
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function rolaDado(qtdDados, totalDado) {
	for (j = 0; j < 2;j++) {
		var sum = 0;
		if (!qtdDados) {
			qtdDados = 3;
		}
		if (!totalDado) {
			totalDado = 6;
		}
		for (i = 0; i < qtdDados; i++) {
			sum += Math.floor(Math.random()*totalDado);
		}

		if (j == 0) {
			rolagemA = sum;
		} else {//j == 1
			rolagemB = sum;
		}
	}

	if (rolagemA > rolagemB) {
		if (rolagemA - rolagemB < diferenca_dados) {
			moral_atacante += 5;
		} else {
			moral_atacante += (((rolagemA - rolagemB)-((rolagemA - rolagemB) % diferenca_dados))/diferenca_dados) * 10;
		}
	} else if (rolagemA < rolagemB) {
		if (rolagemB - rolagemA < diferenca_dados) {
			moral_defensor += 5;
		} else {
			moral_atacante += (((rolagemB - rolagemA)-((rolagemB - rolagemA) % diferenca_dados))/diferenca_dados) * 10;
		}
		
	}
}

function addToExercito(field, tipo_jogador) {
	var input_value = $(field).val();
	if (input_value.length > 0) {
		window[tipo_jogador]['total_exercito'] += parseInt(input_value);
	}
}


function processaMoral() {
	/*$('form').validate();*/
	var formData = $('form').serializeObject();
	/*rolaDado();*/

	if (formData.distancia) {
		moral_atacante += parseInt(formData.distancia);
	}
	var tipo_jogador = 'atacante'
	for (i = 0; i < 2; i++) {
		if (i > 0) {
			tipo_jogador = 'defensor';
		}

		if (formData.hasOwnProperty('bonus_'+tipo_jogador) && formData['bonus_'+tipo_jogador]) {
			window['moral_'+tipo_jogador] += parseInt(formData['bonus_'+tipo_jogador]);
		}
		if (formData.hasOwnProperty('lealdade_'+tipo_jogador) && formData['lealdade_'+tipo_jogador]) {
			window['moral_'+tipo_jogador] += parseInt(formData['lealdade_'+tipo_jogador]);
		}
		if (formData.hasOwnProperty('comandante_'+tipo_jogador) && formData['comandante_'+tipo_jogador]) {
			window['moral_'+tipo_jogador] += parseInt(formData['comandante_'+tipo_jogador]);
		}
		if (formData.hasOwnProperty('causa_'+tipo_jogador) && formData['causa_'+tipo_jogador]) {
			window['moral_'+tipo_jogador] += parseInt(formData['causa_'+tipo_jogador]);
		}
		if (formData.hasOwnProperty('emboscada_'+tipo_jogador) && formData['emboscada_'+tipo_jogador]) {
			window['moral_'+tipo_jogador] += parseInt(formData['emboscada_'+tipo_jogador]);
		}
		if (formData.hasOwnProperty('tecnologia_'+tipo_jogador) && formData['tecnologia_'+tipo_jogador]) {
			window['moral_'+tipo_jogador] += parseInt(formData['tecnologia_'+tipo_jogador]);
		}
		if (formData.hasOwnProperty('clima_'+tipo_jogador) && formData['clima_'+tipo_jogador] && formData.hasOwnProperty('clima_local') && formData['clima_local']) {
			var clima_local = formData['clima_local'];
			var moral_resultante_clima = 0;
			switch(formData['clima_'+tipo_jogador]) {
				case 'artico':
					if (clima_local == 'frio') {
						moral_resultante_clima = -5;
					} else if (clima_local == 'fresco') {
						moral_resultante_clima = -15;
					} else if (clima_local == 'quente') {
						moral_resultante_clima = -20;
					} else if (clima_local == 'desertico') {
						moral_resultante_clima = -30;
					}
					break;
				case 'frio':
					if (clima_local == 'artico') {
						moral_resultante_clima = -10;
					} else if (clima_local == 'fresco') {
						moral_resultante_clima = -5;
					} else if (clima_local == 'quente') {
						moral_resultante_clima = -10;
					} else if (clima_local == 'desertico') {
						moral_resultante_clima = -20;
					}
					break;
				case 'fresco':
					if (clima_local == 'frio') {
						moral_resultante_clima = -5;
					} else if (clima_local == 'artico') {
						moral_resultante_clima = -15;
					} else if (clima_local == 'quente') {
						moral_resultante_clima = -5;
					} else if (clima_local == 'desertico') {
						moral_resultante_clima = -15;
					}
					break;
				case 'quente':
					if (clima_local == 'frio') {
						moral_resultante_clima = -10;
					} else if (clima_local == 'fresco') {
						moral_resultante_clima = -5;
					} else if (clima_local == 'artico') {
						moral_resultante_clima = -20;
					} else if (clima_local == 'desertico') {
						moral_resultante_clima = -10;
					}
					break;
				case 'desertico':
					if (clima_local == 'frio') {
						moral_resultante_clima = -20;
					} else if (clima_local == 'fresco') {
						moral_resultante_clima = -15;
					} else if (clima_local == 'quente') {
						moral_resultante_clima = -5;
					} else if (clima_local == 'artico') {
						moral_resultante_clima = -30;
					}
					break;
			}
			window['moral_'+tipo_jogador] += moral_resultante_clima;
		}

		$("input[name^='infantaria'][id $="+tipo_jogador+"]").each(function(key, value) {
			addToExercito(value, tipo_jogador);
		});
		$("input[name^='lanceiro'][id $="+tipo_jogador+"]").each(function(key, value) {
			addToExercito(value, tipo_jogador);
		});
		$("input[name^='arqueiro'][id $="+tipo_jogador+"]").each(function(key, value) {
			addToExercito(value, tipo_jogador);
		});
		$("input[name^='cavalaria'][id $="+tipo_jogador+"]").each(function(key, value) {
			addToExercito(value, tipo_jogador);
		});

	}
	
	//CALCULA MORAL DE TAMANHO - INICIO
	var maior_exercito = null;
	var menor_exercito = null;
	var jogador_moral_diminuida = null;
	if (atacante.total_exercito > defensor.total_exercito) {
		jogador_moral_diminuida = 'defensor';
		maior_exercito = atacante.total_exercito;
		menor_exercito = defensor.total_exercito;
	} else if (atacante.total_exercito < defensor.total_exercito) {
		jogador_moral_diminuida = 'atacante';
		maior_exercito = defensor.total_exercito;
		menor_exercito = atacante.total_exercito;
	}

	var moral_diminuida = 0;
	if (maior_exercito && menor_exercito) {//se for igual dai n faz nada
		moral_diminuida = -5;
		if (maior_exercito > (menor_exercito*2)) {
			moral_diminuida = -10;
		}
		if (maior_exercito > (menor_exercito*3)) {
			moral_diminuida = -15;
		}
		if (maior_exercito > (menor_exercito*4)) {
			moral_diminuida = -20;
		}
	}
	window['moral_'+jogador_moral_diminuida] += moral_diminuida;
	//CALCULA MORAL DE TAMANHO - FIM

	//CALCULA MORAL DE CLIMA - INICIO


	//CALCULA MORAL DE CLIMA - FIM



	$('form').toggle();
	$('#reinicie').toggle();
	alert('Dados rolados:\nAtacante:'+rolagemA+'\nDefensor:'+rolagemB+'\nMoral atacante: '+moral_atacante+'   moral defensor: '+ moral_defensor);
	return false;
}

