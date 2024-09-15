   
from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

# render index.html


def dashboard_home(request):
    return render(request, 'home/index.html')
    

def register_user(request):
    return render(request, 'users/register_user.html')

def login(request):
    return render(request, 'users/login.html')


class SaleListView(TemplateView):
    template_name = 'ListOfReg/sale_list.html'
    
class RecoverListView(TemplateView):
    template_name = 'ListOfReg/recovery_list.html'
    
class SlaughterListView(TemplateView):
    template_name = 'ListOfReg/slaughter_list.html'
    
class TransferListView(TemplateView):
    template_name = 'ListOfReg/transfer_list.html'
    
class CattleListView(TemplateView):
    template_name = 'ListOfReg/cattle_list.html'
  
class DeathListView(TemplateView):
    template_name = 'ListOfReg/death_list.html'

class RanchListView(TemplateView):
    template_name = 'ListOfReg/ranch_list.html'

class ComplementaryListView(TemplateView):
    template_name = 'ListOfReg/complementary_list.html'
    
class BoughtListView(TemplateView):
    template_name = 'ListOfReg/bought_list.html'
    
class BirthListView(TemplateView):
    template_name = 'ListOfReg/birth_list.html'
    

class LostListView(TemplateView):
    template_name = 'ListOfReg/lost_list.html'
    
class RanchView(TemplateView):
    template_name = 'Ranches/ranch.html'



    