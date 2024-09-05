from django.urls import path
from . import views
from .views import( CattleListView, 
                   DeathListView, 
                   SaleListView, 
                   RecoverListView,  
                   SlaughterListView,
                   TransferListView,
                    ComplementaryListView,
                    BoughtListView,
                    BirthListView,
                    LostListView,
                    RanchListView,
)


urlpatterns = [
    path('', views.dashboard_home, name='index'), 
    path('register_user/', views.register_user, name='register_user'),
    path('login/', views.login, name='login'), 
    path('cattle_list/', CattleListView.as_view(), name='cattle_list'),  
    path('death_list/', DeathListView.as_view(), name='death_list'),  
    path('sale_list/', SaleListView.as_view(), name='sale_list'),  
    path('recovery_list/', RecoverListView.as_view(), name='recovery_list'),
    path('slaughter_list/', SlaughterListView.as_view(), name='slaughter_list'),
    path('transfer_list/', TransferListView.as_view(), name='transfer_list'),
    path('ranch_list/', RanchListView.as_view(), name='ranch_list'),
    path('complementary_list/', ComplementaryListView.as_view(), name='complementary_list'),
    path('bought_list/', BoughtListView.as_view(), name='bought_list'),
    path('birth_list/', BirthListView.as_view(), name='birth_list'),
    path('lost_list/', LostListView.as_view(), name='lost_list'),
]
