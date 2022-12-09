from rest_framework.serializers import ModelSerializer
from atracoes.models import Atracao

class AtracaoSerializer(ModelSerializer):
    class Meta:
        model = Atracao
        # fields = '__all__'
        fields = ('id', 'nome', 'descricao', 'horario_fun', 'idade_min')