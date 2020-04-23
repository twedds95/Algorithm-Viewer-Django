# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from .algorithms import generate_random_array

size = 300
number_list = generate_random_array(size, 500)
numbers = []
for i in range(size):
    numbers.append({'numbers': number_list[i],
                    'index': (i*3)})


def algorithm_viewer(request):
    return render(request, 'AlgorithmViewer/ViewingWindow.html', {'numbers': numbers})
