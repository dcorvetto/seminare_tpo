# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-07-22 13:48
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('escuela', '0023_auto_20170722_1341'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='alumno',
            unique_together=set([('numero_doc', 'tipo_doc')]),
        ),
    ]
