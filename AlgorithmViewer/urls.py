from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^sorting/(?P<numberlist>\d+)/$', views.sorting_viewer, name='sorting'),
    url(r'', views.algorithm_viewer, name='algorithm-viewer'),
]
