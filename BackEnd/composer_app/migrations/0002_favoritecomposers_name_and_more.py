# Generated by Django 5.1.3 on 2024-12-20 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('composer_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='favoritecomposers',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='favoritecomposers',
            name='portrait_url',
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
    ]
