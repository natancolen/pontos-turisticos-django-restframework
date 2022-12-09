from django.db import models

class Atracao(models.Model):
    nome = models.CharField(max_length=150)
    descricao = models.TextField()
    horario_fun = models.TextField()
    idade_min = models.IntegerField(default=0)

    def __str__(self):
        return  self.nome