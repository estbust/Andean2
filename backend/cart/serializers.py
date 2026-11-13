from rest_framework import serializers
from products.models import Product
from .models import Cart, CartItem


class CartProductSerializer(serializers.ModelSerializer):
    """
    Compact representation of Product for cart item listings.
    """
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'price', 'image']

    def get_image(self, obj):
        if not obj.image:
            return None
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url


class CartItemSerializer(serializers.ModelSerializer):
    """
    Serializer for items within the shopping cart.
    """
    product = CartProductSerializer(read_only=True)
    subtotal = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'subtotal', 'added_at']
        read_only_fields = ['id', 'product', 'subtotal', 'added_at']


class CartSerializer(serializers.ModelSerializer):
    """
    Full representation of the shopping cart including nested items, total, and count.
    """
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    total_items = serializers.IntegerField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'session_key', 'items', 'total', 'total_items', 'created_at', 'updated_at']
        read_only_fields = ['id', 'session_key', 'items', 'total', 'total_items', 'created_at', 'updated_at']


class AddToCartSerializer(serializers.Serializer):
    """
    Validates input for adding a product to the cart.
    """
    product_id = serializers.IntegerField(required=True)
    quantity = serializers.IntegerField(required=False, default=1, min_value=1)

    def validate_product_id(self, value):
        if not Product.objects.filter(id=value, is_active=True).exists():
            raise serializers.ValidationError("El producto especificado no existe o no se encuentra activo.")
        return value

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError("La cantidad debe ser mayor o igual a 1.")
        return value

    def validate(self, attrs):
        attrs['product'] = Product.objects.get(id=attrs['product_id'])
        return attrs


class UpdateCartItemSerializer(serializers.Serializer):
    """
    Validates quantity update for an existing cart item.
    """
    quantity = serializers.IntegerField(required=True, min_value=1)

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError("La cantidad debe ser mayor o igual a 1.")
        return value
