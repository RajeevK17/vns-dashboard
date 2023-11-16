from django.shortcuts import render

def BASE(request):
    return render(request, 'base.html')

def dashboard(request):
    return render(request, 'dashboard.html')
