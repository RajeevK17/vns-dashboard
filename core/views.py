from django.shortcuts import redirect, render

def BASE(request):
    return render(request, 'base.html')

def dashboard(request):
    return render(request, 'dashboard.html')

def security(request):
    return render(request, 'security.html')

def logintrails(request):
    return render(request, 'login_trails.html')