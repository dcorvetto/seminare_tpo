# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-07-23 02:28
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('escuela', '0024_auto_20170722_1348'),
    ]

    operations = [
        migrations.AddField(
            model_name='docente',
            name='titulo',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='calificacion',
            name='curso',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='calificaciones', to='escuela.Curso'),
        ),
        migrations.AlterField(
            model_name='calificacion',
            name='docente',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='calificaciones', to='escuela.Docente'),
        ),
    ]
