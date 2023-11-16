
from django.urls import path
from . import views
urlpatterns = [
    path('', views.BASE, name='BASE'),
     path('dashboard/', views.dashboard, name='dashboard'),
]
