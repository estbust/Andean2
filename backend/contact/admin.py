from django.contrib import admin
from .models import ContactMessage


@admin.action(description="Marcar seleccionados como leídos")
def mark_as_read(modeladmin, request, queryset):
    queryset.update(is_read=True)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)
    actions = [mark_as_read]
    ordering = ('-created_at',)
