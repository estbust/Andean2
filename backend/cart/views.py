import uuid
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Cart, CartItem
from .serializers import (
    CartSerializer,
    AddToCartSerializer,
    UpdateCartItemSerializer,
)


def get_or_create_cart(request) -> Cart:
    """
    Retrieves or creates a shopping Cart based on the session_key found in:
    1. HTTP header 'X-Session-Key'
    2. Query parameter 'session_key'
    3. Request body 'session_key' (for POST/PATCH requests)
    If no session_key is provided, generates a new UUID.
    """
    session_key = (
        request.headers.get('X-Session-Key')
        or request.META.get('HTTP_X_SESSION_KEY')
        or request.query_params.get('session_key')
        or (request.data.get('session_key') if isinstance(request.data, dict) else None)
    )

    if not session_key or not str(session_key).strip():
        session_key = str(uuid.uuid4())
    else:
        session_key = str(session_key).strip()[:40]

    cart, _ = Cart.objects.get_or_create(session_key=session_key)
    return cart


class CartDetailView(APIView):
    """
    GET /api/cart/
    Retrieve the current shopping cart by session_key.
    """
    def get(self, request):
        cart = get_or_create_cart(request)
        cart = Cart.objects.prefetch_related('items__product').get(id=cart.id)
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddToCartView(APIView):
    """
    POST /api/cart/add/
    Add a product to the shopping cart. Increments quantity if already present.
    """
    def post(self, request):
        cart = get_or_create_cart(request)
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']

        with transaction.atomic():
            # Lock the cart to prevent race conditions
            cart = Cart.objects.select_for_update().get(id=cart.id)
            item, created = CartItem.objects.select_for_update().get_or_create(
                cart=cart,
                product=product,
                defaults={'quantity': quantity}
            )
            if not created:
                item.quantity += quantity
                item.save(update_fields=['quantity'])

        cart = Cart.objects.prefetch_related('items__product').get(id=cart.id)
        cart_serializer = CartSerializer(cart, context={'request': request})
        return Response(cart_serializer.data, status=status.HTTP_200_OK)


class UpdateCartItemView(APIView):
    """
    PATCH /api/cart/update/<item_id>/
    Update the quantity of a specific cart item. Enforces cart isolation.
    """
    def patch(self, request, item_id):
        cart = get_or_create_cart(request)
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        quantity = serializer.validated_data['quantity']

        with transaction.atomic():
            cart_item = get_object_or_404(
                CartItem.objects.select_for_update().select_related('product'),
                id=item_id,
                cart=cart
            )
            cart_item.quantity = quantity
            cart_item.save(update_fields=['quantity'])

        cart = Cart.objects.prefetch_related('items__product').get(id=cart.id)
        cart_serializer = CartSerializer(cart, context={'request': request})
        return Response(cart_serializer.data, status=status.HTTP_200_OK)


class RemoveCartItemView(APIView):
    """
    DELETE /api/cart/remove/<item_id>/
    Remove a specific item from the cart. Enforces cart isolation.
    """
    def delete(self, request, item_id):
        cart = get_or_create_cart(request)

        with transaction.atomic():
            cart_item = get_object_or_404(
                CartItem.objects.select_for_update(),
                id=item_id,
                cart=cart
            )
            cart_item.delete()

        cart = Cart.objects.prefetch_related('items__product').get(id=cart.id)
        cart_serializer = CartSerializer(cart, context={'request': request})
        return Response(cart_serializer.data, status=status.HTTP_200_OK)


class ClearCartView(APIView):
    """
    DELETE /api/cart/clear/
    Empty all items from the shopping cart.
    """
    def delete(self, request):
        cart = get_or_create_cart(request)

        with transaction.atomic():
            cart = Cart.objects.select_for_update().get(id=cart.id)
            cart.items.all().delete()

        cart = Cart.objects.prefetch_related('items__product').get(id=cart.id)
        cart_serializer = CartSerializer(cart, context={'request': request})
        return Response(cart_serializer.data, status=status.HTTP_200_OK)
