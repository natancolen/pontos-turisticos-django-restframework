from rest_framework.fields import SerializerMethodField
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from atracoes.models import Atracao
from core.models import PontoTuristico
from atracoes.api.serializers import AtracaoSerializer
from enderecos.api.serializers import EnderecoSerializer
from enderecos.models import Endereco

import enderecos.models


class PontoTuristicoSerializer(ModelSerializer):
    atracoes = AtracaoSerializer(many=True)
    endereco = EnderecoSerializer()
    descricao_completa = SerializerMethodField()

    class Meta:
        model = PontoTuristico
        fields = (
            'id', 'nome', 'descricao', 'aprovado',
            'atracoes', 'comentarios', 'avaliacoes', 'endereco', 'descricao_completa'
        )
        read_onlyne_fields=('comentarios', 'avaliacoes')

    def criar_atracoes(self, atracoes, ponto):
        for atracao in atracoes:
            at = Atracao.objects.create(**atracao)
            ponto.atracoes.add(at)

    def create(self, validade_data):
        atracoes = validade_data['atracoes']
        del validade_data['atracoes']
        ponto = PontoTuristico.objects.create(**validade_data)
        self.criar_atracoes(atracoes, ponto)

        end = Endereco.objects.create(**enderecos)
        ponto.endereco = end

        ponto.save()

        return ponto

    def get_descricao_completa(self, obj):
        return '%s - %s' % (obj.nome, obj.descricao)
