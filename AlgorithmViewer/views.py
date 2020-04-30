# -*- coding: utf-8 -*-
from __future__ import unicode_literals
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
    if len(NumberList.objects.filter(list_size=size, list_max_value=max_h)) > 0:
        number_list = NumberList.objects.first()
        nfl = NumberForList.objects.filter(number_list=number_list)

    else:
        number_list = NumberList(list_size=size, list_max_value=max_h)
        number_list.save()
        for i in range(size):
            nfl = NumberForList(number=1, index=i, number_list=number_list)
            nfl.save()

    num_for_list = generate_random_array(size, max_h)

    for i in range(size):
        NumberForList.objects.filter(index=i, number_list=number_list).update(number=num_for_list[i])
        numbers.append({'index': float(i * 900 / size),
                        'number': num_for_list[i]})

    context = {'numbers': numbers, 'numberList': number_list.id, 'algorithms': algorithm_list}
    return context


def sort_given_array(algorithm, num_list):
    numbers_in_list = NumberForList.objects.filter(number_list=num_list)
    index = 0
    nums = []
    for num in numbers_in_list:
        if num.index == index:
            nums.append(num.number)
            index += 1
    # n_list = get_sorting_alg(algorithm, nums)
    n_list = nums
    size = len(n_list)
    numbers = []
    for i in range(size):
        numbers.append({'index': float(i * 900 / size),
                        'number': n_list[i]})
    context = {'numbers': numbers, 'numberList': num_list.id,
               'algorithm': [a['algo'] for a in algorithm_list if a.get('code') == algorithm][0]}
    return context


def algorithm_viewer(request):
    context = generate_new_array()
    return render(request, 'AlgorithmViewer/ViewingWindow.html', context)


def sorting_viewer(request, numberlist):
    num_list = NumberList.objects.get(id=numberlist)
    algorithm = request.GET['algorithm_list']
    context = sort_given_array(algorithm, num_list)
    return render(request, 'AlgorithmViewer/SortingWindow.html', context)
