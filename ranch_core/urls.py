
from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^some-endpoint/$', views.some_view, name='some-endpoint'),
]
