from decimal import Decimal
from django.db import models


class Cart(models.Model):
    """
    Shopping cart associated with a visitor session.
    """
    id = models.BigAutoField(primary_key=True)
    session_key = models.CharField(
        max_length=40,
        unique=True,
        db_index=True,
        verbose_name="Clave de sesión"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última actualización")

    class Meta:
        verbose_name = "Carrito"
        verbose_name_plural = "Carritos"
        ordering = ['-updated_at']

    def __str__(self):
        return f"Carrito {self.session_key} ({self.total_items} ítems)"

    @property
    def total(self) -> Decimal:
        """
        Total price of all items in the cart.
        """
        return sum((item.subtotal for item in self.items.all()), Decimal('0.00'))

    @property
    def total_items(self) -> int:
        """
        Total count of individual items across all products in the cart.
        """
        return sum((item.quantity for item in self.items.all()), 0)


class CartItem(models.Model):
    """
    Individual product item inside a shopping cart.
    """
    id = models.BigAutoField(primary_key=True)
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='items',
        verbose_name="Carrito"
    )
    product = models.ForeignKey(
        'products.Product',
        on_delete=models.CASCADE,
        related_name='cart_items',
        verbose_name="Producto"
    )
    quantity = models.PositiveIntegerField(default=1, verbose_name="Cantidad")
    added_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de agregado")

    class Meta:
        verbose_name = "Ítem del Carrito"
        verbose_name_plural = "Ítems del Carrito"
        unique_together = ('cart', 'product')
        ordering = ['added_at']

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

    @property
    def subtotal(self) -> Decimal:
        """
        Subtotal for this cart item: product price multiplied by quantity.
        """
        return self.product.price * self.quantity
