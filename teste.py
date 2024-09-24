from datetime import datetime

tempo = datetime.now()
hora = int(tempo.strftime("%H"))
if hora == 16:
    print('oaaai')