from django.contrib import admin
from .models import Note
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# Register your models here.


admin.site.site_header = 'Note Site Admin'
admin.site.site_title = 'Note for full-stack Site Admin'
admin.site.index_title = 'Note  Administration'

admin.site.register(Note)

# Token
# admin.site.register(TokenObtainPairView, admin.ModelAdmin)
# admin.site.register(TokenRefreshView, admin.ModelAdmin)
