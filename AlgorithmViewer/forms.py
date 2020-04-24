from django import forms
from .models import NumberList


algorithm_list = [('bubble', 'Bubble Sort'),
                  ('insertion', 'Insertion Sort'),
                  ('selection', 'Selection Sort'),
                  ('merge', 'Merge Sort'),
                  ('quick_low', 'Quick Sort (Low Pivot)'),
                  ('quick_random', 'Quick Sort (Random Pivot)')]


class AlgorithmForm(forms.Form):
    algorithm = forms.ChoiceField(label="Select Sorting Algorithm: ", choices=algorithm_list)
    number_list_id = forms.IntegerField()
