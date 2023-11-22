from django.shortcuts import redirect, render

def base(request):
    return render(request, 'base.html')

def dashboard(request):
    return render(request, 'dashboard.html')

def security(request):
    return render(request, 'security.html')

def login_trails(request):
    return render(request, 'login_trails.html')

def activity(request):
    return render(request, 'activity.html')

def edit_profile(request):
    return render(request, 'edit_profile.html')

def rate_plan(request):
    return render(request, 'rate_plan.html')

def ip_whitelist(request):
    return render(request, 'ip_whitelist.html')

def notification_settings (request):
    return render(request, 'notification_settings.html')