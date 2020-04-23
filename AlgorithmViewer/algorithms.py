# module to store all algorithms
import random


def bubble_sort(number_list):
    n = len(number_list)
    for i in range(n):
        for j in range(0, n - i - 1):
            if number_list[j] > number_list[j + 1]:
                number_list[j], number_list[j + 1] = number_list[j + 1], number_list[j]
    return number_list


def quick_sort_low(number_list):
    n = len(number_list) - 1
    pivot = 'low'
    quick(number_list, 0, n, pivot)
    return number_list


def quick_sort_med(number_list):
    n = len(number_list) - 1
    pivot = 'med'
    quick(number_list, 0, n, pivot)
    return number_list


def quick_sort_high(number_list):
    n = len(number_list) - 1
    pivot = 'high'
    quick(number_list, 0, n, pivot)
    return number_list


def quick_sort_random(number_list):
    n = len(number_list) - 1
    pivot = 'random'
    quick(number_list, 0, n, pivot)
    return number_list


def quick(number_list, low, high, p):
    if low < high:
        pivot = split_for_quick(number_list, low, high, p)
        quick(number_list, low, pivot - 1, p)
        quick(number_list, pivot + 1, high, p)


def split_for_quick(number_list, low, high, p):
    if p == 'low':
        piv = low
        pivot = number_list[low]
    if p == 'med':
        piv = (high + low) / 2
        pivot = number_list[piv]
    if p == 'high':
        piv = high
        pivot = number_list[high]
    if p == 'random':
        piv = random.randint(low, high)
        pivot = number_list[piv]
    number_list[piv], number_list[low] = number_list[low], number_list[piv]

    i = low + 1
    for j in range(low+1, high+1):
        if number_list[j] < pivot:
            number_list[i], number_list[j] = number_list[j], number_list[i]
            i = i + 1
    number_list[i-1], number_list[low] = number_list[low], number_list[i-1]
    return i-1


def insertion_sort(number_list):
    n = len(number_list)
    for i in range(1, n):
        key = number_list[i]
        j = i - 1
        while j >= 0 and key < number_list[j]:
            number_list[j + 1] = number_list[j]
            j -= 1
        number_list[j + 1] = key
    return number_list


def selection_sort(number_list):
    n = len(number_list)
    for i in range(n):
        min_index = i
        for j in range(min_index + 1, n):
            if number_list[j] < number_list[min_index]:
                min_index = j
        number_list[min_index], number_list[i] = number_list[i], number_list[min_index]
    return number_list


def merge_sort(number_list):
    split_for_merge(number_list, 0, len(number_list) - 1)
    return number_list


def merge(number_list, left, right, mid):
    left_length = mid - left + 1
    right_length = right - mid
    left_list = [0] * left_length
    right_list = [0] * right_length

    for i in range(0, left_length):
        left_list[i] = number_list[left + i]

    for j in range(0, right_length):
        right_list[j] = number_list[mid + j + 1]

    i = 0
    j = 0
    k = left
    while i < left_length and j < right_length:
        if left_list[i] <= right_list[j]:
            number_list[k] = left_list[i]
            i += 1
        else:
            number_list[k] = right_list[j]
            j += 1
        k += 1

    while i < left_length:
        number_list[k] = left_list[i]
        i += 1
        k += 1

    while j < right_length:
        number_list[k] = right_list[j]
        j += 1
        k += 1


def split_for_merge(number_list, left, right):
    if left < right:
        middle = (left + right) / 2
        split_for_merge(number_list, left, middle)
        split_for_merge(number_list, middle + 1, right)
        merge(number_list, left, right, middle)


# Tester code for Algorithms
arr = [12, 1, 3, 5, 6, 7, 29, 0, 2, 2, 44, 27, 2, 5]
m = len(arr)
print ("Given array is")
for ij in range(m):
    print ("%d" % arr[ij]),

quick_sort_med(arr)
print ("\n\nSorted array is")
for ij in range(m):
    print ("%d" % arr[ij]),
