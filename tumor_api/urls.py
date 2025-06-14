from django.urls import path
from .views import PatientListView, PatientDetailView, MediaUploadView, MediaDownloadView

urlpatterns = [
    path('patients/', PatientListView.as_view(), name='patient-list'),
    path('patients/<int:patient_id>/', PatientDetailView.as_view(), name='patient-detail'),
    path('media/upload/', MediaUploadView.as_view(), name='media-upload'),
    path('media/download/<int:pk>/', MediaDownloadView.as_view(), name='media-download'),
]