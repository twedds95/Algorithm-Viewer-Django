# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import random
from django.shortcuts import render
from .algorithms import generate_random_array, get_sorting_alg
from .models import NumberList, NumberForList

algorithm_list = [{'code': 'bubble', 'algo': 'Bubble Sort'},
                  {'code': 'insertion', 'algo': 'Insertion Sort'},
                  {'code': 'selection', 'algo': 'Selection Sort'},
                  {'code': 'merge', 'algo': 'Merge Sort'},
                  {'code': 'quick_low', 'algo': 'Quick Sort (Low Pivot)'},
                  {'code': 'quick_random', 'algo': 'Quick Sort (Random Pivot)'}]


def generate_new_array():
    size = 700
    max_h = 500
    numbers = []
    lid = random.randint(0, 9999999)
    number_list = NumberList(list_id=lid, list_size=size, list_max_value=max_h)
    num_for_list = generate_random_array(size, max_h)
    for i in range(size):
        NumberForList(number=num_for_list[i], index=i, number_list=number_list)
        numbers.append({'index': (i * 900 / size),
                        'number': num_for_list[i]})
    context = {'numbers': numbers, 'numberList': number_list.list_id, 'algorithms': algorithm_list}
    return context


def sort_given_array(algorithm, num_list):
    numbers = NumberForList.objects.filter(number_list=num_list)
    index = 0
    nums = []
    for num in numbers:
        if num.index == index:
            nums.append(num.number)
            index += 1
    n_list = get_sorting_alg(algorithm, nums)
    size = len(n_list)
    for i in range(size):
        numbers.append({'index': (i * 900 / size),
                        'number': n_list[i]})
    context = {'numbers': numbers, 'numberList': num_list.list_id, 'algorithms': algorithm_list}
    return context


def algorithm_viewer(request):
    context = generate_new_array()
    return render(request, 'AlgorithmViewer/ViewingWindow.html', context)


def sorting_viewer(request, numberlist):
    num_list = NumberList.objects.get(list_id=numberlist)  # this isn't working rn :(
    algorithm = request.GET('algorithm_list')
    context = sort_given_array(algorithm, num_list)
    return render(request, 'AlgorithmViewer/ViewingWindow.html', context)
