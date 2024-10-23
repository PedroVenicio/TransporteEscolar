from datetime import datetime

""" allVotacoes = {'voto': [{'id': 7, 'opcao': 1, 'userId': 12}, {'id': 8, 'opcao': 2, 'userId': 11}, {'id': 9, 'opcao': 4, 'userId': 10}]}

listVotacao = (allVotacoes['voto'])
for i in listVotacao:
    print(i)
    print(i['opcao']) """

""" lista = [1, 2, 3, 4]
lista2 = [5, 6, 7, 8]

for i in lista:
    if i == 1:
        for x in lista2:
            if i == 1:
                print('oi') """

tempo = datetime.now()
dia = tempo.strftime("%Y-%m-%d")
hora = int(tempo.strftime("%H""%M""%S"))
print(hora)