
from django.urls import path
from . import views
urlpatterns = [
    path('', views.base, name='base'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('security/', views.security, name='security'), #change password
    path('login_trails/', views.login_trails, name='login_trails'),
    path('activity/', views.activity, name='activity'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
    path('rate_plan/', views.rate_plan, name='rate_plan'),
]
