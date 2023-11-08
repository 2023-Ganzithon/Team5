from rest_framework import permissions
from rest_framework.permissions import IsAdminUser


class CustomReadOnly(permissions.BasePermission):
    ## 게시물 보기: 누구나, 생성: 로그인한 사용자, 편집: 게시물 작성자
    def has_permission(self, request, view):
        if request.method == "GET":
            return True
        return request.user.is_authenticated

    # 게시물 편집 및 삭제
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        # 사용자가 관리자인지 확인하여 삭제를 허용합니다
        return request.user.is_staff
