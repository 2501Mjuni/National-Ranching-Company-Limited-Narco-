from django.urls import re_path
from .views import (CattleByRanchAndCategory)


#the Api urls
urlpatterns = [
    re_path(r'^cattle-by-ranch/(?P<ranch_id>\d+)/(?P<category_name>\w+)/$', CattleByRanchAndCategory.as_view(), name='cattle-by-ranch'),
]
