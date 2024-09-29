from rest_framework import serializers

class CattleSerializer(serializers.Serializer):
    tag_number = serializers.CharField(max_length=100)
    cattle_status = serializers.CharField(max_length=100)