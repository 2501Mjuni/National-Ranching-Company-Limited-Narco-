from django.shortcuts import render

def some_view(request):
    # Handle the request and return a response
    return render(request, 'some_template.html')
