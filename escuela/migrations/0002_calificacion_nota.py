# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-15 03:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('escuela', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='calificacion',
            name='nota',
            field=models.FloatField(default=1),
        ),
    ]
