allVotacoes = {'voto': [{'id': 7, 'opcao': 1, 'userId': 12}, {'id': 8, 'opcao': 2, 'userId': 11}, {'id': 9, 'opcao': 4, 'userId': 10}]}

listVotacao = (allVotacoes['voto'])
for i in listVotacao:
    print(i)
    print(i['opcao'])