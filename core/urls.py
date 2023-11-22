
from django.urls import path
from . import views
urlpatterns = [
    path('', views.BASE, name='BASE'),
     path('dashboard/', views.dashboard, name='dashboard'),
     path('security/', views.security, name='security'), #change password
     path('logintrails/', views.logintrails, name='logintrails'),
     path('activity/', views.activity, name='activity'),
     path('rateplan/', views.rateplan, name='rateplan'),
     path('edit_profile/', views.editprofile, name='edit_profile'),
]
