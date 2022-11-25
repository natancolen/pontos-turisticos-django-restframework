from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from core.models import PontoTuristico
from .serializers import PontoTuristicoSerializer


class PontoTuristicoViewSet(ModelViewSet):
    queryset = PontoTuristico.objects.all()
    serializer_class = PontoTuristicoSerializer
    filter_backends = [filters.SearchFilter]
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication,]
    search_fields = ['nome', 'descricao','endereco__linha1']

    # def get_queryset(self):
    #     id = self.request.query_params.get('id', None)
    #     nome = self.request.query_params.get('nome', None)
    #     descricao = self.request.query_params.get('descricao', None)
    #     queryset = PontoTuristico.objects.all()
    #
    #     if id:
    #         queryset = PontoTuristico.objects.filter(pk=id)
    #
    #     if nome:
    #         queryset = PontoTuristico.objects.filter(nome__iexact=nome)
    #
    #     if descricao:
    #         queryset = PontoTuristico.objects.filter(descricao__iexact=descricao)
    #
    #     return queryset

    # def list(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #     serializer = PontoTuristicoSerializer(queryset, many=True)
    #     return Response(serializer.data)

