from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'', views.algorithm_viewer, name='algorithm-viewer'),
    url(r'sorting/', views.start_sort, name='sorting'),
]
