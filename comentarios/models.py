from django.contrib.auth.models import User
from django.db import models

class Comentario(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    comentarios = models.TextField()
    data = models.DateField(auto_now_add=True)
    aprovado = models.BooleanField(default=True)

    def __str__(self):
        return  self.usuario.username
