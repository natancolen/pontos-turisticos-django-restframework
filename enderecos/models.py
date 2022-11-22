from django.db import models

# Create your models here.
class Endereco(models.Model):
    linha1 = models.CharField(max_length=150)
    linha2 = models.CharField(max_length=150, null=True,blank=True)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=70)
    pais = models.CharField(max_length=150)
    latitude = models.IntegerField(null=True,blank=True)
    longitude = models.IntegerField(null=True,blank=True)

    @property
    def descricao_completa(self):
        return '%s - %s' % (self.linha1, self.linha2)

    def __str__(self):
        return self.linha1