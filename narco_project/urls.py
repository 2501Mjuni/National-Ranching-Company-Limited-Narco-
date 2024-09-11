
from django.urls import path, include, re_path
from django.views.generic.base import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='/dashboard/', permanent=False)),
    path('dashboard/', include('dashboard.urls')),
    re_path(r'^api/users/', include('users.urls')),  # more specific API pattern for users
    re_path(r'^api/', include('core.urls')),    # other API routes
]
