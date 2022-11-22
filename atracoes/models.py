from django.db import models

class Atracao(models.Model):
    nome = models.CharField(max_length=150)
    descricao = models.TextField()
    horario_fun = models.TextField()
    idade_minima = models.IntegerField()

    @property
    def descricao_completa(self):
        return '%s - %s' % (self.nome, self.descricao)

    def __str__(self):
        return  self.nome