# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponseRedirect
from django.shortcuts import render
from .algorithms import generate_random_array, get_sorting_alg
from .forms import AlgorithmForm
from .models import NumberList, NumberForList


def generate_new_array():
    size = 700
    numbers = []
    number_list = NumberList(list_size=size, list_max_value=500)
    num_for_list = generate_random_array(size, 500)
    for i in range(size):
        NumberForList(number=num_for_list[i], index=i, number_list=number_list)
        numbers.append({'index': (i * 900 / size),
                        'number': num_for_list[i]})
    context = {'numbers': numbers, 'NumberList': number_list}
    return context


def algorithm_viewer(request):
    if request.method == 'POST':
        form = AlgorithmForm(request.POST)
        if form.is_valid():
            numbers = get_sorting_alg(form.cleaned_data['algorithm'], generate_new_array())
            return HttpResponseRedirect('/sorting/')
    else:
        form = AlgorithmForm()
        context = generate_new_array()
        return render(request, 'AlgorithmViewer/ViewingWindow.html', {'context': context, 'form': form})


def start_sort(request):
    if request.method == 'GET':
        form = AlgorithmForm(request.GET)
        if form.is_valid():
            numbers = get_sorting_alg(form.algorithm, generate_new_array())
            return HttpResponseRedirect('/sorting/')
    else:
        numbers = generate_new_array()
        return render(request, 'AlgorithmViewer/ViewingWindow.html', {'numbers': numbers})
