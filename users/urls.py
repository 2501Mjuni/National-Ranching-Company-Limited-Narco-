from django.urls import re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import AdminRegisterView, LoginView

urlpatterns = [
    re_path(r'^register_ad/$', AdminRegisterView.as_view(), name='admin-register'),
    re_path(r'login_ad/$', LoginView.as_view(), name='login-ad'),
    re_path(r'^login/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'^token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
]


