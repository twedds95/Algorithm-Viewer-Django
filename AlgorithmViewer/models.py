# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


class NumberList(models.Model):
    list_id = models.IntegerField(auto_created=True)
    list_size = models.IntegerField()
    list_max_value = models.IntegerField()


class NumberForList(models.Model):
    number = models.PositiveIntegerField()
    index = models.PositiveIntegerField()
    number_list = models.ForeignKey(NumberList, on_delete=models.CASCADE)