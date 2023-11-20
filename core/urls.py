
from django.urls import path
from . import views
urlpatterns = [
    path('', views.BASE, name='BASE'),
     path('dashboard/', views.dashboard, name='dashboard'),
     path('security/', views.security, name='security'), #change password
     path('login_trails/', views.logintrails, name='login_trails'),
]
