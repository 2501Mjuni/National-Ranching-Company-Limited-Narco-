from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = 'categories'

    def __str__(self):
        return self.name


class Subcategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'subcategories'
        unique_together = ('category', 'name')

    def __str__(self):
        return f"{self.category.name} - {self.name}"


class Ranch(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = 'ranches'

    def __str__(self):
        return self.name


class Cattle(models.Model):
    tag_number = models.CharField(unique=True, max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE)
    birth_date = models.DateField(blank=True, null=True)
    ranch = models.ForeignKey(Ranch, on_delete=models.CASCADE)
    entry_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'cattle'

    def __str__(self):
        return f"{self.tag_number} - {self.category.name} ({self.subcategory.name})"


class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('purchase', 'Purchase'),
        ('sale', 'Sale'),
        ('transfer', 'Transfer'),
        ('other', 'Other'),
    ]

    cattle = models.ForeignKey(Cattle, on_delete=models.CASCADE)
    transaction_date = models.DateField(blank=True, null=True)
    transaction_type = models.CharField(max_length=50, choices=TRANSACTION_TYPES)
    details = models.JSONField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'transactions'

    def __str__(self):
        return f"{self.transaction_type.capitalize()} on {self.transaction_date}"


class Account(models.Model):
    cattle = models.ForeignKey(Cattle, on_delete=models.SET_NULL, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    transaction_date = models.DateField()

    class Meta:
        db_table = 'accounts'

    def __str__(self):
        return f"Account for {self.cattle.tag_number if self.cattle else 'Unknown'}"
