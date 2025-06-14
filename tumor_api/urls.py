from django.urls import path
from .views import (
    PatientListView, 
    PatientDetailView, 
    MediaUploadView, 
    MediaDownloadView,
    ImageSeriesUploadView,
    ImageSeriesDownloadView
)

urlpatterns = [
    path('patients/', PatientListView.as_view(), name='patient-list'),
    path('patients/<int:patient_id>/', PatientDetailView.as_view(), name='patient-detail'),
    path('media/upload/', MediaUploadView.as_view(), name='media-upload'),
    path('media/download/<int:pk>/', MediaDownloadView.as_view(), name='media-download'),
    path('series/upload/', ImageSeriesUploadView.as_view(), name='series-upload'),
    path('series/download/<int:pk>/', ImageSeriesDownloadView.as_view(), name='series-download'),
]