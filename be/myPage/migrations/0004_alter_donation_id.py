# Generated by Django 3.2.10 on 2023-11-07 13:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myPage', '0003_auto_20231107_1631'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donation',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
