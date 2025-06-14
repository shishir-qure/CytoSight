from django.urls import path
from .views import PatientListView, PatientDetailView, AddToTumorBoardView, AddMessageView

urlpatterns = [
    path('patients/', PatientListView.as_view(), name='patient-list'),
    path('patients/<int:patient_id>/', PatientDetailView.as_view(), name='patient-detail'),
    path('patients/<int:patient_id>/add_to_tumor_board/', AddToTumorBoardView.as_view(), name='add-to-tumor-board'),
    path('patients/<int:patient_id>/messages/add/', AddMessageView.as_view(), name='add-message'),
]