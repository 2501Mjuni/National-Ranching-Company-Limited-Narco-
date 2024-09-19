import requests
from django.shortcuts import render,get_object_or_404
from django.views import View
from django.views.generic import TemplateView, DetailView
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
    
# class RanchView(TemplateView):
#     template_name = 'Ranches/ranch.html'



# class RanchView(View):
#     template_name = 'Ranches/ranch.html'

#     def get(self, request, ranch_id):
#         # Fetch ranch details from the API
#         response = requests.get(f'http://127.0.0.1:8000/api/ranches/{ranch_id}/')
        
#         if response.status_code == 200:
#             ranch = response.json()  # Convert API response to JSON
#         else:
#             ranch = None  # Handle case where ranch is not found or API fails

#         return render(request, self.template_name, {'ranch': ranch})
    


class RanchView(View):
    template_name = 'Ranches/ranch.html'

    def get(self, request, name):
        # Fetch ranch details from the API
        try:
            response = requests.get(f'http://127.0.0.1:8000/api/ranches/{name}/')
            response.raise_for_status()  # Raises an HTTPError for bad responses (4xx and 5xx)
            ranch = response.json()  # Convert API response to JSON
        except requests.RequestException as e:
            # Handle errors such as network issues or invalid responses
            ranch = None
            # Optionally, you could log the exception or provide more specific error handling

        return render(request, self.template_name, {'ranch': ranch})
