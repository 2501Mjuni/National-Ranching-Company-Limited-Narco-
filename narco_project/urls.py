

from django.urls import path, include, re_path
from django.views.generic.base import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='/Site/login/', permanent=False)),
    path('Site/', include('Site.urls')),
    re_path(r'^api/ranch/', include('ranch_core.urls')),
    re_path(r'^api/users/', include('users.urls')), 
    re_path(r'^api/', include('core.urls')),    
]
