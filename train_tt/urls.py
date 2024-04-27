from django.contrib import admin
from django.urls import path
from train_tt import views


urlpatterns = [
    path("", views.home, name='home'),
    path("home", views.home, name='home'),
    path("raw", views.raw, name='raw'),
    path("display", views.display, name='display'),
    path("sync_data", views.sync_data, name='sync_data')

]
