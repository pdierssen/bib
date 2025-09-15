from django.contrib import admin
from .models import Book, Author, Publisher, Lending

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "get_authors", "publisher")  # show authors & publisher
    search_fields = ("title", "authors__name")            # search by book or author
    list_filter = ("publisher",)                         # filter sidebar
    filter_horizontal = ("authors",)                     # nicer multi-select

    def get_authors(self, obj):
        return ", ".join([a.__str__() for a in obj.authors.all()])
    get_authors.short_description = "Authors"

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name")
    search_fields = ("first_name", "last_name")

admin.site.register(Publisher)
admin.site.register(Lending)