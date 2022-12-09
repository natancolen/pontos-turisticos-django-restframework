from rest_framework.fields import SerializerMethodField
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from atracoes.models import Atracao
from avaliacoes.api.serializers import AvaliacaoSerializer
from avaliacoes.models import Avaliacao
from comentarios.api.serializers import ComentarioSerializer
from comentarios.models import Comentario
from core.models import PontoTuristico
from atracoes.api.serializers import AtracaoSerializer
from enderecos.api.serializers import EnderecoSerializer
from enderecos.models import Endereco


class PontoTuristicoSerializer(ModelSerializer):
    atracoes = AtracaoSerializer()
    comentarios = ComentarioSerializer()
    avaliacoes = AvaliacaoSerializer()
    endereco = EnderecoSerializer()

    class Meta:
        model = PontoTuristico
        fields = (
            'id', 'nome', 'descricao', 'aprovado', 'comentarios', 'avaliacoes', 'endereco', 'atracoes'
        )


    def criar_atracoes(self, atracoes, ponto):
        at = Atracao.objects.create(**atracoes)
        ponto.atracoes.add(at)

    def criar_comentarios(self, comentarios, ponto):
        com = Comentario.objects.create(**comentarios)
        ponto.comentarios.add(com)


    def criar_avaliacoes(self, avaliacoes, ponto):
        av = Avaliacao.objects.create(**avaliacoes)
        ponto.avaliacoes.add(av)

    def create(self, validade_data):
        atracoes = validade_data['atracoes']
        del validade_data['atracoes']

        endereco = validade_data['endereco']
        del validade_data['endereco']

        comentarios = validade_data['comentarios']
        del validade_data['comentarios']

        avaliacoes = validade_data['avaliacoes']
        del validade_data['avaliacoes']

        ponto = PontoTuristico.objects.create(**validade_data)
        self.criar_atracoes(atracoes, ponto)
        self.criar_comentarios(comentarios, ponto)
        self.criar_avaliacoes(avaliacoes, ponto)

        ponto.save()

        return ponto
    #
    # def get_descricao_completa(self, obj):
    #     return '%s - %s' % (obj.nome, obj.descricao)
