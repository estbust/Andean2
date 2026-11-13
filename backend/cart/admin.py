from django.contrib import admin
from .models import Cart, CartItem


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    fields = ('product', 'quantity', 'subtotal_display', 'added_at')
    readonly_fields = ('subtotal_display', 'added_at')

    @admin.display(description="Subtotal")
    def subtotal_display(self, obj):
        return f"{obj.subtotal:.2f}"


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('session_key', 'total_items_display', 'total_display', 'created_at')
    search_fields = ('session_key',)
    readonly_fields = ('session_key', 'total_items_display', 'total_display', 'created_at', 'updated_at')
    inlines = [CartItemInline]
    ordering = ('-updated_at',)

    @admin.display(description="Total Ítems")
    def total_items_display(self, obj):
        return obj.total_items

    @admin.display(description="Total")
    def total_display(self, obj):
        return f"{obj.total:.2f}"


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'quantity', 'subtotal_display', 'added_at')
    list_filter = ('added_at',)
    search_fields = ('cart__session_key', 'product__name')
    readonly_fields = ('subtotal_display', 'added_at')
    ordering = ('-added_at',)

    @admin.display(description="Subtotal")
    def subtotal_display(self, obj):
        return f"{obj.subtotal:.2f}"
