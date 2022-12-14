# Generated by Django 4.1.1 on 2022-11-30 21:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('avaliacoes', '0001_initial'),
        ('atracoes', '0002_rename_idade_minima_atracao_idade_min'),
        ('comentarios', '0003_alter_comentario_usuario'),
        ('core', '0008_alter_pontoturistico_endereco'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pontoturistico',
            name='atracoes',
            field=models.ManyToManyField(blank=True, to='atracoes.atracao'),
        ),
        migrations.AlterField(
            model_name='pontoturistico',
            name='avaliacoes',
            field=models.ManyToManyField(blank=True, to='avaliacoes.avaliacao'),
        ),
        migrations.AlterField(
            model_name='pontoturistico',
            name='comentarios',
            field=models.ManyToManyField(blank=True, to='comentarios.comentario'),
        ),
    ]
