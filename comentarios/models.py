from django.contrib.auth.models import User
from django.db import models

class Comentario(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    comentarios = models.TextField(null=True, blank=True)
    data = models.DateField(auto_now_add=True)
    aprovado = models.BooleanField(default=True, null=True, blank=True)

    @property
    # def descricao_completa(self):
    #     return '%s -%s' % (self.usuario.username, self.comentarios)

    def __str__(self):
        return self.comentarios
        # return self.usuario.username
