var app = angular.module('pessoaModule',[]);

app.controller('pessoaControl',function($scope, $http){
	var url = "http://localhost:8080/Extensao/rs/pessoa";
	$scope.pessoas = [
		{'codigo':'1','nome':'carlos'},
		{'codigo':'2','nome':'marcos'}]

	$scope.pesquisar = function(){
		 $http.get(url).success(function(response){
			$scope.pessoas = (response);
		 }).error(function(e){
			 alert('Erro'+e);
		 });
	}
	$scope.pesquisarPorNome = function(){

	}

	$scope.novo = function(){
		$scope.pessoa = {};
		// $scope.pessoa.telefones = [];
		$scope.mensagens = [];
	}

	$scope.montaMensagemErro = function(listaErro) {
		$scope.mensagens = [];
		$scope.mensagens.push('Falha de validação retornada do servidor');
		angular.forEach(listaErro, function(value, key){
			 $scope.mensagens.push(value.message);
		});
	}

    $scope.salvar = function() {
			if(typeof $scope.pessoa.id == 'undefined'){//se nao possui id vai criar
					$http.post(url, $scope.pessoa).success(function(r){
						$scope.mensagens.push('Pessoa criada com sucesso');
						$scope.pesquisar();

					}).error(function(){
						$scope.mensagens.push('Erro ao criar pessoa');
					})
			}else{
				$http.put(url, $scope.pessoa).success(function(r){
					$scope.mensagens.push('Pessoa Alterada com sucesso');
					$scope.pesquisar();

				}).error(function(){
					$scope.mensagens.push('Erro ao alterar pessoa');
				})
			}
			$scope.novo();

	}

	$scope.excluir = function() {
		if ($scope.pessoa.id == '') {
			alert('Selecione um pessoa');
		} else {
			$http.delete(url+'/'+$scope.pessoa.id).success(function(r){
				$scope.mensagens.push('Pessoa removida com sucesso');
				$scope.pesquisar();

			}).error(function(){
				$scope.mensagens.push('Erro ao alterar pessoa');
			})
			$scope.novo();
		}
	}
	$scope.excluirId = function(id) {
		if (id == '') {
			alert('Selecione um pessoa');
		} else {
			$http.delete(url+'/'+id).success(function(r){
				$scope.mensagens.push('Pessoa removida com sucesso');
				$scope.pesquisar();

			}).error(function(){
				$scope.mensagens.push('Erro ao alterar pessoa');
			})

		}
	}

	$scope.seleciona = function(pessoaTabela) {
		$scope.pessoa = pessoaTabela;
	}

	$scope.pesquisar();
	$scope.novo();
});
