
from django.urls import path
from . import views
urlpatterns = [
    path('', views.BASE, name='BASE'),
     path('dashboard/', views.dashboard, name='dashboard'),
     path('security/', views.security, name='security'), #change password
     path('logintrails/', views.logintrails, name='logintrails'),
     path('activity/', views.activity, name='activity'),
]
