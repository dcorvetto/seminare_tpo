# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-07-10 01:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('escuela', '0007_auto_20170709_2250'),
    ]

    operations = [
        migrations.RenameField(
            model_name='alumno',
            old_name='lugar_nacimiento',
            new_name='nacionalidad',
        ),
        migrations.RemoveField(
            model_name='docente',
            name='anio_egreso',
        ),
        migrations.RemoveField(
            model_name='docente',
            name='baja',
        ),
        migrations.AddField(
            model_name='alumno',
            name='abandono',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='alumno',
            name='anio_abandono',
            field=models.IntegerField(blank=True, max_length=8, null=True),
        ),
        migrations.AlterField(
            model_name='alumno',
            name='tipo_doc',
            field=models.CharField(choices=[('DNI', 'Documento Nacional de Identidad'), ('LE', 'Libreta de enrolamiento'), ('PS', 'Pasaporte'), ('DE', 'Documento Extranjero')], default='DNI', max_length=3),
        ),
    ]
