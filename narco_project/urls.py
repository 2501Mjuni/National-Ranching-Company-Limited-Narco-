
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic.base import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', RedirectView.as_view(url='/dashboard/', permanent=False)),
    path('dashboard/', include('dashboard.urls')),
    re_path(r'^api/', include('core.urls')),
]
