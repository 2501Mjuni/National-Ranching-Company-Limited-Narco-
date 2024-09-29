from rest_framework import serializers
from .models import Cattle, Ranch, Category, Subcategory

class RanchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ranch
        fields = ['id', 'name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ['id', 'name']

class CattleSerializer(serializers.ModelSerializer):
    ranch_id = serializers.IntegerField(write_only=True)
    category_id = serializers.IntegerField(write_only=True)
    subcategory_id = serializers.IntegerField(write_only=True)

    ranch = RanchSerializer(read_only=True)  
    category = CategorySerializer(read_only=True)  
    subcategory = SubcategorySerializer(read_only=True)

    class Meta:
        model = Cattle
        fields = [
            'tag_number', 
            'birth_date', 
            'ranch_id', 
            'category_id', 
            'subcategory_id',
            'ranch', 
            'category', 
            'subcategory'
        ]

    def create(self, validated_data):
        ranch = Ranch.objects.get(id=validated_data.pop('ranch_id'))
        category = Category.objects.get(id=validated_data.pop('category_id'))
        subcategory = Subcategory.objects.get(id=validated_data.pop('subcategory_id'))
        
        cattle = Cattle.objects.create(
            ranch=ranch, 
            category=category, 
            subcategory=subcategory, 
            **validated_data
        )
        return cattle
