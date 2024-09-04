# views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from .models import CustomUser

def register_user(request):
    if request.method == 'POST':
        full_name = request.POST.get('full_name')
        email = request.POST.get('email')
        phone_number = request.POST.get('phone_number')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        # Validate password match
        if password != confirm_password:
            messages.error(request, "Passwords do not match!")
            return redirect('register_user')
        
        # Create new user
        user = CustomUser.objects.create_user(
            username=email, 
            email=email, 
            password=password,
            first_name=full_name,
            phone_number=phone_number
        )
        user.save()
        messages.success(request, "Registration successful. Please log in.")
        return redirect('login')

    return render(request, 'users/register_user.html')

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('index')
        else:
            messages.error(request, "Invalid username or password.")
            return redirect('login')

    return render(request, 'users/login.html')

def dashboard_home(request):
    return render(request, 'dashboard/index.html')
